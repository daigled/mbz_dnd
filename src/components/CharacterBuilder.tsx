import Tabs from './Tabs'
import ClassTab from './class/ClassTab'
import RaceTab from './race/RaceTab'
import AbilityScoresTab from './ability-scores/AbilityScoresTab'
import { CharacterAttributes } from '../interfaces'
import BackgroundsTab from './backgrounds/BackgroundsTab'

function CharacterBuilder(props: any) {
	const { character, setCharacter } = props

	const setCharacterAttrs = (attrs: CharacterAttributes) => {
		setCharacter({ ...character, attributes: attrs })
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
					onChange={(v: any) =>
						setCharacter({ ...character, race: v })
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
					onChange={(v: any) => {
						setCharacter({ ...character, background: v })
					}}
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
