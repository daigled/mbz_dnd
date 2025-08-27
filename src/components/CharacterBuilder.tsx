import Tabs from './Tabs'
import ClassTab from './class/ClassTab'
import RaceTab from './race/RaceTab'
import AbilityScoresTab from './ability-scores/AbilityScoresTab'
import BackgroundsTab from './backgrounds/BackgroundsTab'
import { useContext } from 'react'
import { CharacterContext } from '../store/characterContext'

function CharacterBuilder() {
	const { state: character, dispatch } = useContext(CharacterContext)

	const setCharacterAttrs = (attrs: typeof character.abilityScores) => {
		// Dispatch each stat update individually
		for (const stat of Object.keys(attrs) as (keyof typeof attrs)[]) {
			dispatch({
				type: 'SET_ABILITY_SCORE',
				payload: { stat, value: attrs[stat] },
			})
		}
	}

	const tabList = [
		{
			id: 'class-selection',
			name: 'Class',
			content: <ClassTab />,
		},
		{
			id: 'race-selection',
			name: 'Race',
			content: (
				<RaceTab
					characterRaceKey={character.race}
					characterSubRaceKey={character.subrace}
					onChange={(race: string) =>
						dispatch({ type: 'SET_RACE', payload: race })
					}
				/>
			),
		},
		{
			id: 'attribute-selection',
			name: 'Attributes',
			content: <AbilityScoresTab setCharacterAttrs={setCharacterAttrs} />,
		},
		{
			id: 'background-selection',
			name: 'Background',
			content: (
				<BackgroundsTab
					onChange={(bg: string) =>
						dispatch({ type: 'SET_BACKGROUND', payload: bg })
					}
				/>
			),
		},
	]

	return (
		<div className="character-builder-wrap" style={{ width: '50%' }}>
			<Tabs tabs={tabList} />
		</div>
	)
}

export default CharacterBuilder
