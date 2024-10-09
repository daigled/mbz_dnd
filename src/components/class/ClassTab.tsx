import { useState, useEffect } from 'react'
const classModules = import.meta.glob('../../data/class/*.json')

function ClassTab() {
	for (const path in classModules) {
		classModules[path]().then(mod => {
			let myKey = path.split('class-')[1].replace('.json', '')

			// console.log(myKey, mod)
		})
	}
	const classOptions = Object.keys(classModules).reduce((acc, curr) => {
		// console.log(classModules[curr])

		const targetData = classModules[curr]().then(data => {
			// console.log(data.default.class)
			return data.default.class
		})

		return [...acc, targetData]
	}, [])

	// console.log(classOptions)

	const [options, setOptions] = useState([])
	const [selectedClass, setSelectedClass] = useState({})

	useEffect(() => {
		let classes = []

		// for (const path in classModules) {
		// 	classModules[path]().then(mod => {
		// 		if (mod.default.class[0].source === 'PHB')
		// 			classes.push(mod.default.class)
		// 	})
		// }

		Object.values(classModules).forEach(module => {
			module().then(d => {
				console.log('pushing the following into classes: ')
				console.log(d)
				setOptions([...options, d])
			})
		})

		// console.log('setting options to the following:')
		// console.log(classes)
		// console.log(' ')



		// setOptions(classes)
	}, [])

	console.log('Options: ')
	console.log(options)
	console.log(' ')

	return (
		<div className="class-tab">
			<div className="class-selector-wrap" style={{display: 'flex', width: 300, alignItems: 'center', justifyContent: 'space-between'}}>
				<label htmlFor='class-select'>Select A Class:</label>
				<select
					name="class-select"
					value={selectedClass}
					onChange={e => setSelectedClass(e.target.value)}>
					{options.map(opt => (
						<option value={opt.default.class[0].name}>{opt.default.class[0].name}</option>
					))}
				</select>
			</div>
		</div>
	)
}

export default ClassTab
