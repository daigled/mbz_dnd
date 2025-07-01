import { useState, useEffect } from 'react'

function StandardArraySelection({ dispatch }) {
	const STANDARD_ARRAY = [8, 10, 12, 13, 14, 15]
	const ABILITIES = ['str', 'dex', 'con', 'int', 'wis', 'cha']

	const [selectedValues, setSelectedValues] = useState({
		str: -1,
		dex: -1,
		con: -1,
		int: -1,
		wis: -1,
		cha: -1,
	})

	const [availableValues, setAvailableValues] = useState(STANDARD_ARRAY)

	useEffect(() => {
		const allAssigned = Object.values(selectedValues).every(v =>
			STANDARD_ARRAY.includes(v)
		)
		if (allAssigned) {
			for (const stat in selectedValues) {
				dispatch({
					type: 'SET_ABILITY_SCORE',
					payload: { stat: stat, value: selectedValues[stat] },
				})
			}
		}
	}, [selectedValues])

	const makeSelection = (abilityKey, value) => {
		const updatedSelection = { ...selectedValues }
		let updatedAvailable = [...availableValues]

		if (value === -1) {
			const valueToRestore = selectedValues[abilityKey]
			updatedSelection[abilityKey] = -1
			updatedAvailable.push(valueToRestore)
		} else if (Object.values(selectedValues).includes(value)) {
			const targetKey = Object.keys(selectedValues).find(
				k => selectedValues[k] === value
			)
			updatedSelection[targetKey] = -1
			updatedSelection[abilityKey] = value
		} else {
			updatedSelection[abilityKey] = value
			updatedAvailable = updatedAvailable.filter(v => v !== value)
		}

		setSelectedValues(updatedSelection)
		setAvailableValues(updatedAvailable)
	}

	return (
		<div style={{ marginTop: '30px', borderTop: 'solid 1px blue' }}>
			<h1
				style={{
					marginBottom: '30px',
					padding: '10px 0',
					borderBottom: 'solid 1px #dedede',
				}}>
				Standard Array Selection
			</h1>
			{ABILITIES.map(abilityKey => (
				<div key={abilityKey}>
					<label htmlFor={abilityKey}>
						{abilityKey.toUpperCase()}
					</label>
					<select
						value={selectedValues[abilityKey]}
						name={abilityKey}
						onChange={e => {
							makeSelection(abilityKey, parseInt(e.target.value))
						}}>
						<option value={-1}> - </option>
						{STANDARD_ARRAY.map(val => (
							<option key={`${abilityKey}_${val}`} value={val}>
								{val}
							</option>
						))}
					</select>
				</div>
			))}
			<div
				style={{
					margin: '30px 0',
					padding: '30px 0',
					border: 'solid 1px aliceblue',
				}}>
				<h2>Selected Values</h2>
				<pre>{JSON.stringify(selectedValues, null, 2)}</pre>
			</div>
		</div>
	)
}

export default StandardArraySelection
