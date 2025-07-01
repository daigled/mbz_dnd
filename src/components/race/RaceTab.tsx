import { useState, useEffect, useContext } from 'react'
import { race, subrace } from '../../data/races.json'
import RaceSummary from './RaceSummary'
import { CharacterContext } from '../../store/characterContext'

function RaceTab() {
	const { state: character, dispatch } = useContext(CharacterContext)

	const [selectedRace, setSelectedRace] = useState<any>({})

	const availableRaces = race.filter(r => r.source === 'PHB')
	const availableSubraces = subrace.filter(s => s.source === 'PHB')

	const raceOptions = availableRaces.map(aR => {
		const assocSubRaces = availableSubraces.filter(
			aS => aS.raceName === aR.name
		)
		return { ...aR, subraces: assocSubRaces }
	})

	useEffect(() => {
		const found = raceOptions.find(r => r.name === character.race)
		setSelectedRace(found || {})
	}, [character.race])

	const handleRaceChange = (newRace: string) => {
		dispatch({ type: 'SET_RACE', payload: newRace })
		// Optional: reset subrace on race change if needed
		dispatch({ type: 'SET_SUBRACE', payload: '' })
	}

	return (
		<div className="character-race-tab-wrap">
			<label htmlFor="character-race-select">Select A Race:</label>
			<select
				name="character-race-select"
				value={character.race}
				onChange={e => handleRaceChange(e.target.value)}>
				<option value="">-- Choose a race --</option>
				{availableRaces.map(r => (
					<option key={r.name} value={r.name}>
						{r.name}
					</option>
				))}
			</select>

			{selectedRace && <RaceSummary race={selectedRace} />}
		</div>
	)
}

export default RaceTab
