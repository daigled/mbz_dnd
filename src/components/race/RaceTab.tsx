import { useState, useEffect } from 'react'
import { race, subrace } from '../../data/races.json'
import RaceSummary from './RaceSummary'

export interface RaceTabProps {
	characterRaceKey: string
	characterSubRaceKey: string
	onChange: any
}

function RaceTab(props: RaceTabProps) {
	const { characterRaceKey, characterSubRaceKey, onChange } = props

	const [selectedRace, setSelectedRace] = useState({})
	const [selectedSubRace, setSelectedSubRace] = useState({})

	const availableRaces = race.filter(r => r.source === 'PHB')
	const availableSubraces = subrace.filter(s => s.source === 'PHB')

	const raceOptions = availableRaces.map(aR => {
		const assocSubRaces = availableSubraces.filter(
			aS => aS.raceName === aR.name
		)
		let mapped = { ...aR }
		mapped['subraces'] = assocSubRaces

		return mapped
	})

	useEffect(() => {
		const found = raceOptions.find(r => r.name === characterRaceKey)
		if (!!found) setSelectedRace(found)
	}, [])

	useEffect(() => {
		const found = raceOptions.find(r => r.name === characterRaceKey)
		if (!!found) setSelectedRace(found)
		else setSelectedRace({})
	}, [characterRaceKey])

	return (
		<div className={'character-race-tab-wrap'}>
			<label htmlFor="character-race-select">Select A Race:</label>
			<select
				name="character-race-select"
				value={characterRaceKey}
				onChange={e => {
					onChange(e.target.value)
				}}>
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
