import { createContext, useReducer } from 'react'
import { Character, ClassLevel } from '../interfaces'

const defaultCharacter: Character = {
	race: '',
	subrace: '',
	class: '',
	classLevel: 1,
	classLevels: [],
	totalLevel: 0,
	abilityScores: {
		str: -1,
		dex: -1,
		con: -1,
		int: -1,
		wis: -1,
		cha: -1,
	},
	racialAbilityBonuses: {
		str: 0,
		dex: 0,
		con: 0,
		int: 0,
		wis: 0,
		cha: 0,
	},
	background: '',
	skillProficiencies: [],
	toolProficiencies: [],
	languages: [],
	savingThrowProficiencies: [],
	armorProficiencies: [],
	weaponProficiencies: [],
	racialChoices: {
		selectedSkills: [],
		selectedLanguages: [],
		selectedAbilityScores: {}
	}
}

type CharacterAction =
	| { type: 'SET_RACE'; payload: string }
	| { type: 'SET_SUBRACE'; payload: string }
	| { type: 'SET_CLASS'; payload: string }
	| { type: 'ADD_CLASS_LEVEL'; payload: { className: string; level: number } }
	| { type: 'UPDATE_CLASS_LEVEL'; payload: { className: string; level: number } }
	| { type: 'SET_SINGLE_CLASS'; payload: { className: string; level: number } }
	| { type: 'ADD_CLASS_SKILL'; payload: { className: string; skill: string } }
	| { type: 'REMOVE_CLASS_SKILL'; payload: { className: string; skill: string } }
	| { type: 'SET_CLASS_SUBCLASS'; payload: { className: string; subclass: string } }
	| { type: 'ADD_CLASS_PROFICIENCIES'; payload: { className: string; savingThrows: string[]; armorProficiency: string[]; weaponProficiency: string[] } }
	| { type: 'SET_BACKGROUND'; payload: string }
	| {
			type: 'SET_ABILITY_SCORE'
			payload: { stat: keyof Character['abilityScores']; value: number }
	  }
	| { type: 'ADD_SKILL_PROFICIENCY'; payload: string }
	| { type: 'REMOVE_SKILL_PROFICIENCY'; payload: string }
	| { type: 'ADD_TOOL_PROFICIENCY'; payload: string }
	| { type: 'REMOVE_TOOL_PROFICIENCY'; payload: string }
	| { type: 'ADD_LANGUAGE'; payload: string }
	| { type: 'REMOVE_LANGUAGE'; payload: string }
	| { type: 'SET_RACIAL_SKILLS'; payload: string[] }
	| { type: 'SET_RACIAL_LANGUAGES'; payload: string[] }
	| { type: 'SET_RACIAL_ABILITY_CHOICES'; payload: { [key: string]: number } }
	| { type: 'APPLY_RACIAL_ABILITY_SCORES'; payload: { race: { [key: string]: number }, subrace?: { [key: string]: number } } }
	| { type: 'RESET' }

function characterReducer(
	state: Character,
	action: CharacterAction
): Character {
	switch (action.type) {
		case 'SET_RACE':
			return { ...state, race: action.payload }
		case 'SET_SUBRACE':
			return { ...state, subrace: action.payload }
		case 'SET_CLASS':
			return { ...state, class: action.payload, classLevel: 1 }
		case 'ADD_CLASS_LEVEL':
			const existingClassIndex = state.classLevels.findIndex(cl => cl.className === action.payload.className)
			if (existingClassIndex >= 0) {
				// Class already exists, update level
				const updatedClassLevels = [...state.classLevels]
				updatedClassLevels[existingClassIndex].level = action.payload.level
				return { 
					...state, 
					classLevels: updatedClassLevels,
					totalLevel: updatedClassLevels.reduce((sum, cl) => sum + cl.level, 0)
				}
			} else {
				// New class
				const newClassLevel: ClassLevel = {
					className: action.payload.className,
					level: action.payload.level,
					selectedSkills: [],
					selectedFeatures: {}
				}
				const newClassLevels = [...state.classLevels, newClassLevel]
				return { 
					...state, 
					classLevels: newClassLevels,
					totalLevel: newClassLevels.reduce((sum, cl) => sum + cl.level, 0)
				}
			}
		case 'UPDATE_CLASS_LEVEL':
			const classIndex = state.classLevels.findIndex(cl => cl.className === action.payload.className)
			if (classIndex >= 0) {
				const updatedLevels = [...state.classLevels]
				updatedLevels[classIndex].level = action.payload.level
				// Update primary class level if it's the primary class
				const newClassLevel = state.class === action.payload.className ? action.payload.level : state.classLevel
				return { 
					...state, 
					classLevel: newClassLevel,
					classLevels: updatedLevels,
					totalLevel: updatedLevels.reduce((sum, cl) => sum + cl.level, 0)
				}
			}
			return state
		case 'SET_SINGLE_CLASS':
			// Replace all classes with a single class (for single-class characters)
			const singleClassLevel: ClassLevel = {
				className: action.payload.className,
				level: action.payload.level,
				selectedSkills: [],
				selectedFeatures: {}
			}
			return {
				...state,
				class: action.payload.className,
				classLevel: action.payload.level,
				classLevels: [singleClassLevel],
				totalLevel: action.payload.level
			}
		case 'ADD_CLASS_SKILL':
			const addSkillClassIndex = state.classLevels.findIndex(cl => cl.className === action.payload.className)
			if (addSkillClassIndex >= 0) {
				const updatedLevels = [...state.classLevels]
				updatedLevels[addSkillClassIndex].selectedSkills.push(action.payload.skill)
				
				// Also add to main character skill proficiencies if not already there
				const updatedSkillProficiencies = state.skillProficiencies.includes(action.payload.skill) 
					? state.skillProficiencies 
					: [...state.skillProficiencies, action.payload.skill]
				
				return { 
					...state, 
					classLevels: updatedLevels,
					skillProficiencies: updatedSkillProficiencies
				}
			}
			return state
		case 'REMOVE_CLASS_SKILL':
			const removeSkillClassIndex = state.classLevels.findIndex(cl => cl.className === action.payload.className)
			if (removeSkillClassIndex >= 0) {
				const updatedLevels = [...state.classLevels]
				updatedLevels[removeSkillClassIndex].selectedSkills = updatedLevels[removeSkillClassIndex].selectedSkills.filter(
					skill => skill !== action.payload.skill
				)
				
				// Check if this skill is used by any other class/background before removing from main list
				const isSkillUsedElsewhere = updatedLevels.some(cl => 
					cl.className !== action.payload.className && cl.selectedSkills.includes(action.payload.skill)
				)
				
				const updatedSkillProficiencies = isSkillUsedElsewhere 
					? state.skillProficiencies
					: state.skillProficiencies.filter(skill => skill !== action.payload.skill)
				
				return { 
					...state, 
					classLevels: updatedLevels,
					skillProficiencies: updatedSkillProficiencies
				}
			}
			return state
		case 'SET_CLASS_SUBCLASS':
			const setSubclassIndex = state.classLevels.findIndex(cl => cl.className === action.payload.className)
			if (setSubclassIndex >= 0) {
				const updatedLevels = [...state.classLevels]
				updatedLevels[setSubclassIndex].selectedSubclass = action.payload.subclass
				return { ...state, classLevels: updatedLevels }
			}
			return state
		case 'ADD_CLASS_PROFICIENCIES':
			const { savingThrows, armorProficiency, weaponProficiency } = action.payload
			
			// Add unique saving throw proficiencies
			const updatedSavingThrows = [...new Set([...state.savingThrowProficiencies, ...savingThrows])]
			
			// Add unique armor proficiencies
			const updatedArmorProf = [...new Set([...state.armorProficiencies, ...armorProficiency])]
			
			// Add unique weapon proficiencies
			const updatedWeaponProf = [...new Set([...state.weaponProficiencies, ...weaponProficiency])]
			
			return {
				...state,
				savingThrowProficiencies: updatedSavingThrows,
				armorProficiencies: updatedArmorProf,
				weaponProficiencies: updatedWeaponProf
			}
		case 'SET_BACKGROUND':
			return { ...state, background: action.payload }
		case 'SET_ABILITY_SCORE':
			return {
				...state,
				abilityScores: {
					...state.abilityScores,
					[action.payload.stat]: action.payload.value,
				},
			}
		case 'ADD_SKILL_PROFICIENCY':
			return {
				...state,
				skillProficiencies: [
					...state.skillProficiencies,
					action.payload,
				],
			}
		case 'REMOVE_SKILL_PROFICIENCY':
			return {
				...state,
				skillProficiencies: state.skillProficiencies.filter(
					skill => skill !== action.payload
				),
			}
		case 'ADD_TOOL_PROFICIENCY':
			return {
				...state,
				toolProficiencies: [...state.toolProficiencies, action.payload],
			}
		case 'REMOVE_TOOL_PROFICIENCY':
			return {
				...state,
				toolProficiencies: state.toolProficiencies.filter(
					tool => tool !== action.payload
				),
			}
		case 'ADD_LANGUAGE':
			return {
				...state,
				languages: [...state.languages, action.payload],
			}
		case 'REMOVE_LANGUAGE':
			return {
				...state,
				languages: state.languages.filter(
					lang => lang !== action.payload
				),
			}
		case 'SET_RACIAL_SKILLS':
			// Replace racial skill selections
			return {
				...state,
				skillProficiencies: [
					...state.skillProficiencies.filter(skill => !action.payload.includes(skill)),
					...action.payload
				]
			}
		case 'SET_RACIAL_LANGUAGES':
			// Replace racial language selections
			return {
				...state,
				languages: [
					...state.languages.filter(lang => !['Common', 'Elvish', 'Dwarvish', 'Halfling', 'Draconic', 'Gnomish', 'Orc', 'Infernal'].includes(lang)),
					...action.payload
				]
			}
		case 'SET_RACIAL_ABILITY_CHOICES':
			// Apply racial ability score choices (like Half-Elf +1 to two stats of choice)
			return {
				...state,
				racialAbilityBonuses: {
					...state.racialAbilityBonuses,
					...Object.entries(action.payload).reduce((acc, [key, value]) => {
						return {
							...acc,
							[key]: (state.racialAbilityBonuses[key as keyof Character['racialAbilityBonuses']] || 0) + value
						}
					}, {})
				} as Character['racialAbilityBonuses']
			}
		case 'APPLY_RACIAL_ABILITY_SCORES':
			// Apply base racial and subrace ability score increases to racial bonuses
			const { race: raceBonus, subrace: subraceBonus } = action.payload
			const newRacialBonuses = {
				str: 0,
				dex: 0,
				con: 0,
				int: 0,
				wis: 0,
				cha: 0,
			}
			
			// Apply race ability score increases
			Object.entries(raceBonus).forEach(([ability, value]) => {
				const key = ability as keyof Character['racialAbilityBonuses']
				newRacialBonuses[key] += value
			})
			
			// Apply subrace ability score increases if provided
			if (subraceBonus) {
				Object.entries(subraceBonus).forEach(([ability, value]) => {
					const key = ability as keyof Character['racialAbilityBonuses']
					newRacialBonuses[key] += value
				})
			}
			
			return {
				...state,
				racialAbilityBonuses: newRacialBonuses
			}
		case 'RESET':
			return defaultCharacter
		default:
			return state
	}
}

export const CharacterContext = createContext<{
	state: Character
	dispatch: React.Dispatch<CharacterAction>
}>({
	state: defaultCharacter,
	dispatch: () => null,
})

export function CharacterProvider({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer(characterReducer, defaultCharacter)

	return (
		<CharacterContext.Provider value={{ state, dispatch }}>
			{children}
		</CharacterContext.Provider>
	)
}
