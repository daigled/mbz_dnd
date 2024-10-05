import Tabs from './Tabs'
import ClassTab from './class/ClassTab'
import RaceTab from './race/RaceTab'
import AttributesTab from './attributes/AttributesTab'

function CharacterBuilder(props: any) {
	const { character, setCharacter } = props

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
			content: <AttributesTab />,
		},
	]

	return (
		<div className="character-builder-wrap">
			<Tabs tabs={tabList} />
		</div>
	)
}

export default CharacterBuilder
