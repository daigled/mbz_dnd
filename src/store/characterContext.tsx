import { createContext, useReducer } from 'react'
import { Character } from '../interfaces'

const defaultCharacter: Character = {
	race: '',
	subrace: '',
	class: '',
	abilityScores: {
		str: -1,
		dex: -1,
		con: -1,
		int: -1,
		wis: -1,
		cha: -1,
	},
	background: '',
	skillProficiencies: [],
	toolProficiencies: [],
	languages: [],
}

type CharacterAction =
	| { type: 'SET_RACE'; payload: string }
	| { type: 'SET_SUBRACE'; payload: string }
	| { type: 'SET_CLASS'; payload: string }
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
			return { ...state, class: action.payload }
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
