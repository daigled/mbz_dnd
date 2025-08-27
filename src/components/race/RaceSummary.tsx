import { useState, useEffect, useContext } from 'react'
import { CharacterContext } from '../../store/characterContext'
import Select from 'react-select'
import './RaceSummary.css'

interface SimpleRace {
	name: string
	description?: string
	abilityScoreIncrease?: { [key: string]: number }
	abilityScoreChoice?: number
	size?: string
	speed?: number
	languages?: string[]
	extraLanguage?: number
	skills?: number
	traits?: string[]
	subraces?: SimpleSubrace[]
}

interface SimpleSubrace {
	name: string
	abilityScoreIncrease?: { [key: string]: number }
	traits?: string[]
	speed?: number
	extraLanguage?: number
}

function RaceSummary({ race }: { race: SimpleRace }) {
	const { state: character, dispatch } = useContext(CharacterContext)
	const [selectedRacialSkills, setSelectedRacialSkills] = useState<string[]>([])
	const [selectedRacialLanguages, setSelectedRacialLanguages] = useState<string[]>([])
	const [selectedAbilityChoices, setSelectedAbilityChoices] = useState<{ [key: string]: number }>({})
	
	useEffect(() => {
		// Reset selections when race changes
		setSelectedRacialSkills([])
		setSelectedRacialLanguages([])
		setSelectedAbilityChoices({})
		
		// Set base languages for the race
		if (race.languages) {
			dispatch({ type: 'SET_RACIAL_LANGUAGES', payload: race.languages })
		}
		
		// Apply racial ability score increases
		if (race.abilityScoreIncrease) {
			const subraceBonus = character.subrace && race.subraces 
				? race.subraces.find(s => s.name === character.subrace)?.abilityScoreIncrease 
				: undefined
			
			dispatch({ 
				type: 'APPLY_RACIAL_ABILITY_SCORES', 
				payload: { 
					race: race.abilityScoreIncrease,
					subrace: subraceBonus
				} 
			})
		}
	}, [race.name, character.subrace])
	
	// Early return after all hooks
	if (!race.name) return null

	// Available languages for selection (excluding those the race already gives)
	const availableLanguages = [
		'Abyssal', 'Celestial', 'Draconic', 'Deep Speech', 'Dwarvish', 
		'Elvish', 'Giant', 'Gnomish', 'Goblin', 'Halfling', 
		'Infernal', 'Orc', 'Primordial', 'Sylvan', 'Undercommon'
	].filter(lang => !race.languages?.includes(lang))

	// Available skills for selection
	const availableSkills = [
		{ value: 'acrobatics', label: 'Acrobatics' },
		{ value: 'animal_handling', label: 'Animal Handling' },
		{ value: 'arcana', label: 'Arcana' },
		{ value: 'athletics', label: 'Athletics' },
		{ value: 'deception', label: 'Deception' },
		{ value: 'history', label: 'History' },
		{ value: 'insight', label: 'Insight' },
		{ value: 'intimidation', label: 'Intimidation' },
		{ value: 'investigation', label: 'Investigation' },
		{ value: 'medicine', label: 'Medicine' },
		{ value: 'nature', label: 'Nature' },
		{ value: 'perception', label: 'Perception' },
		{ value: 'performance', label: 'Performance' },
		{ value: 'persuasion', label: 'Persuasion' },
		{ value: 'religion', label: 'Religion' },
		{ value: 'sleight_of_hand', label: 'Sleight of Hand' },
		{ value: 'stealth', label: 'Stealth' },
		{ value: 'survival', label: 'Survival' }
	]

	// Ability scores for Half-Elf choice
	const abilityOptions = [
		{ value: 'str', label: 'Strength' },
		{ value: 'dex', label: 'Dexterity' },
		{ value: 'con', label: 'Constitution' },
		{ value: 'int', label: 'Intelligence' },
		{ value: 'wis', label: 'Wisdom' }
	]

	const handleSubraceChange = (subraceName: string) => {
		dispatch({ type: 'SET_SUBRACE', payload: subraceName })
		
		// Apply subrace ability score increases
		if (subraceName && race.subraces) {
			const selectedSubrace = race.subraces.find(s => s.name === subraceName)
			if (selectedSubrace?.abilityScoreIncrease) {
				dispatch({ 
					type: 'APPLY_RACIAL_ABILITY_SCORES', 
					payload: { 
						race: race.abilityScoreIncrease || {},
						subrace: selectedSubrace.abilityScoreIncrease
					} 
				})
			}
		}
	}

	const handleSkillSelection = (selectedOptions: any) => {
		const skills = selectedOptions ? selectedOptions.map((opt: any) => opt.value) : []
		setSelectedRacialSkills(skills)
		dispatch({ type: 'SET_RACIAL_SKILLS', payload: skills })
	}

	const handleLanguageSelection = (selectedOptions: any) => {
		const langs = selectedOptions ? selectedOptions.map((opt: any) => opt.value) : []
		setSelectedRacialLanguages(langs)
		// Combine base race languages with selected extra languages
		const allLanguages = [...(race.languages || []), ...langs]
		dispatch({ type: 'SET_RACIAL_LANGUAGES', payload: allLanguages })
	}

	const handleAbilitySelection = (selectedOptions: any) => {
		const choices: { [key: string]: number } = {}
		if (selectedOptions) {
			selectedOptions.forEach((opt: any) => {
				choices[opt.value] = 1
			})
		}
		setSelectedAbilityChoices(choices)
		dispatch({ type: 'SET_RACIAL_ABILITY_CHOICES', payload: choices })
	}

	const formatAbilityScores = (scores: { [key: string]: number }) => {
		return Object.entries(scores)
			.map(([ability, value]) => `${ability.toUpperCase()} +${value}`)
			.join(', ')
	}

	// Get total extra languages including subrace
	const getTotalExtraLanguages = () => {
		let total = race.extraLanguage || 0
		if (character.subrace && race.subraces) {
			const subrace = race.subraces.find(s => s.name === character.subrace)
			if (subrace?.extraLanguage) {
				total += subrace.extraLanguage
			}
		}
		return total
	}

	return (
		<div className="race-summary">
			<h2 className="name">{race.name}</h2>
			
			{race.description && (
				<p className="description">{race.description}</p>
			)}

			<div className="race-details" style={{ marginTop: '15px' }}>
				{race.abilityScoreIncrease && (
					<div className="ability-scores">
						<strong>Ability Score Increase:</strong> {formatAbilityScores(race.abilityScoreIncrease)}
						{race.abilityScoreChoice && ` + Choose ${race.abilityScoreChoice} other scores to increase by 1`}
					</div>
				)}

				{/* Half-Elf ability score choices */}
				{race.abilityScoreChoice && race.abilityScoreChoice > 0 && (
					<div style={{ marginTop: '10px' }}>
						<label>Choose {race.abilityScoreChoice} ability scores to increase by 1:</label>
						<Select
							isMulti
							value={abilityOptions.filter(opt => selectedAbilityChoices[opt.value])}
							onChange={handleAbilitySelection}
							options={abilityOptions}
							isOptionDisabled={() => Object.keys(selectedAbilityChoices).length >= (race.abilityScoreChoice || 0)}
							placeholder={`Select ${race.abilityScoreChoice} ability scores...`}
						/>
					</div>
				)}

				{race.size && (
					<div className="size">
						<strong>Size:</strong> {race.size}
					</div>
				)}

				{race.speed && (
					<div className="speed">
						<strong>Speed:</strong> {race.speed} feet
					</div>
				)}

				{race.languages && race.languages.length > 0 && (
					<div className="languages">
						<strong>Languages:</strong> {race.languages.join(', ')}
						{getTotalExtraLanguages() > 0 && ` + ${getTotalExtraLanguages()} language(s) of your choice`}
					</div>
				)}

				{/* Language selection */}
				{getTotalExtraLanguages() > 0 && (
					<div style={{ marginTop: '10px' }}>
						<label>Choose {getTotalExtraLanguages()} additional language(s):</label>
						<Select
							isMulti
							value={availableLanguages
								.filter(lang => selectedRacialLanguages.includes(lang))
								.map(lang => ({ value: lang, label: lang }))}
							onChange={handleLanguageSelection}
							options={availableLanguages.map(lang => ({ value: lang, label: lang }))}
							isOptionDisabled={() => selectedRacialLanguages.length >= getTotalExtraLanguages()}
							placeholder={`Select ${getTotalExtraLanguages()} language(s)...`}
						/>
					</div>
				)}

				{race.skills && (
					<div className="skills">
						<strong>Skill Versatility:</strong> Choose {race.skills} skill(s) of your choice
					</div>
				)}

				{/* Skill selection for races like Human and Half-Elf */}
				{race.skills && race.skills > 0 && (
					<div style={{ marginTop: '10px' }}>
						<label>Choose {race.skills} skill(s):</label>
						<Select
							isMulti
							value={availableSkills.filter(skill => selectedRacialSkills.includes(skill.value))}
							onChange={handleSkillSelection}
							options={availableSkills}
							isOptionDisabled={() => selectedRacialSkills.length >= (race.skills || 0)}
							placeholder={`Select ${race.skills} skill(s)...`}
						/>
					</div>
				)}

				{race.traits && race.traits.length > 0 && (
					<div className="traits" style={{ marginTop: '10px' }}>
						<strong>Racial Traits:</strong>
						<ul style={{ marginTop: '5px' }}>
							{race.traits.map((trait, index) => (
								<li key={index}>{trait}</li>
							))}
						</ul>
					</div>
				)}

				{race.subraces && race.subraces.length > 0 && (
					<div className="subraces" style={{ marginTop: '15px' }}>
						<strong>Choose a Subrace:</strong>
						<select
							value={character.subrace}
							onChange={e => handleSubraceChange(e.target.value)}
							style={{ marginLeft: '10px' }}
						>
							<option value="">-- Select a subrace --</option>
							{race.subraces.map(subrace => (
								<option key={subrace.name} value={subrace.name}>
									{subrace.name}
								</option>
							))}
						</select>

						{character.subrace && race.subraces.find(s => s.name === character.subrace) && (
							<div className="subrace-details" style={{ marginTop: '10px', paddingLeft: '15px', borderLeft: '3px solid #ccc' }}>
								<h3>{character.subrace}</h3>
								{(() => {
									const selectedSubrace = race.subraces.find(s => s.name === character.subrace)
									if (!selectedSubrace) return null
									
									return (
										<>
											{selectedSubrace.abilityScoreIncrease && (
												<div className="subrace-ability">
													<strong>Additional Ability Score Increase:</strong> {formatAbilityScores(selectedSubrace.abilityScoreIncrease)}
												</div>
											)}
											{selectedSubrace.speed && (
												<div className="subrace-speed">
													<strong>Speed:</strong> {selectedSubrace.speed} feet
												</div>
											)}
											{selectedSubrace.traits && selectedSubrace.traits.length > 0 && (
												<div className="subrace-traits">
													<strong>Subrace Traits:</strong>
													<ul style={{ marginTop: '5px' }}>
														{selectedSubrace.traits.map((trait, index) => (
															<li key={index}>{trait}</li>
														))}
													</ul>
												</div>
											)}
										</>
									)
								})()}
							</div>
						)}
					</div>
				)}

				{/* Dragonborn special ancestry choice */}
				{race.name === 'Dragonborn' && (
					<div style={{ marginTop: '15px' }}>
						<strong>Draconic Ancestry:</strong>
						<select style={{ marginLeft: '10px' }}>
							<option value="">-- Choose Dragon Type --</option>
							<option value="black">Black (Acid)</option>
							<option value="blue">Blue (Lightning)</option>
							<option value="brass">Brass (Fire)</option>
							<option value="bronze">Bronze (Lightning)</option>
							<option value="copper">Copper (Acid)</option>
							<option value="gold">Gold (Fire)</option>
							<option value="green">Green (Poison)</option>
							<option value="red">Red (Fire)</option>
							<option value="silver">Silver (Cold)</option>
							<option value="white">White (Cold)</option>
						</select>
					</div>
				)}
			</div>
		</div>
	)
}

export default RaceSummary