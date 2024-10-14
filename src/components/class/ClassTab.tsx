import { useState, useEffect } from 'react'
const classModules = import.meta.glob('../../data/class/*.json')


const classOptions = [
	'artificier',
	'barbarian',
	'bard',
	'cleric',
	'druid',
	'fighter',
	'monk',
	// 'mystic',
	'paladin',
	'ranger',
	'rogue',
	'sorcerer',
	'warlock',
	'wizard'
]

function ClassTab() {
	for (const path in classModules) {
		classModules[path]().then(mod => {
			let myKey = path.split('class-')[1].replace('.json', '')

			// console.log(myKey, mod)
		})
	}

	const [selectedClass, setSelectedClass] = useState(null)
	const [classData, setClassData] = useState({})

	useEffect(() => {

		// (async () => {
		// 	const r = await fetch(`class/class-${selectedClass}.json`)
		// 	console.log(r.json())

		// })();

		const fetchClassData = async (selectedClass) => {
			const r = await fetch(`class/class-${selectedClass}.json`)
			console.log('hey, think we got the stuff')
			console.log(r.body)
			setClassData(r)

			const j = await r.json()
			console.log(j)
			setClassData(j)
		}

		fetchClassData(selectedClass)

	}, [selectedClass])

	// console.log('Options: ')
	// console.log(options)
	// console.log(' ')

	return (
		<div className="class-tab">
			<div className="class-selector-wrap" style={{display: 'flex', width: 300, alignItems: 'center', justifyContent: 'space-between'}}>
				<label htmlFor='class-select'>Select A Class:</label>
				<select
					name="class-select"
					value={selectedClass}
					onChange={e => setSelectedClass(e.target.value)}>
					{classOptions.map(opt => (
						<option value={opt}>{opt}</option>
					))}
				</select>
			</div>
			<div style={{margin: '30px 0'}}> ----- </div>
			<div>{JSON.stringify(classData)}</div>
		</div>
	)
}

export default ClassTab
