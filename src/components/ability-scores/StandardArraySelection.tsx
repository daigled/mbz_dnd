import { useState } from 'react'

/**
 * In Standard Array Selection, we begin with a set of 6 numbers. Each of those
 * numbers will be assigned to one of the character's ability scores
 */

function StandardArraySelection() {
	// true constants
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

	const resetSelectedValues = () =>
		setSelectedValues({
			str: -1,
			dex: -1,
			con: -1,
			int: -1,
			wis: -1,
			cha: -1,
		})
	const resetAvailableValues = () => setAvailableValues(STANDARD_ARRAY)
	const resetValues = () => {
		resetAvailableValues()
		resetSelectedValues()
	}
	const allAreSelected = Object.values(selectedValues)
		.sort()
		.every((element, index) => STANDARD_ARRAY[index] === parseInt(element))
	const noneAreSelected =
		availableValues.length === STANDARD_ARRAY.length &&
		Object.values(selectedValues).length === 0

	const makeSelection = (abilityKey, value) => {
		let updatedSelection = { ...selectedValues }
		let updatedAvailable = [...availableValues]
		// if the incoming value is -1, we're "unselecting" this abilityKey
		if (value === -1) {
			const valueToRestore = selectedValues[abilityKey]
			updatedSelection = { ...selectedValues, [abilityKey]: -1 }
			updatedAvailable = [...availableValues, valueToRestore]
		}

		// if the incoming value already exists in selectedValues.values(), we need to find the
		// competing key and reset that abilityKey to -1
		else if (Object.values(selectedValues).includes(value)) {
			const targetKey = Object.keys(selectedValues).find(
				k => selectedValues[k] === value
			)
			updatedSelection = {
				...selectedValues,
				[targetKey]: -1,
				[abilityKey]: value,
			}
		}

		// BAU...
		else {
			updatedSelection = { ...selectedValues, [abilityKey]: value }
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
			{ABILITIES.map(abilityKey => {
				return (
					<>
						<label htmlFor={abilityKey}>
							{abilityKey.toUpperCase()}
						</label>
						<select
							value={selectedValues[abilityKey]}
							name={abilityKey}
							key={abilityKey}
							onChange={e => {
								makeSelection(
									abilityKey,
									parseInt(e.target.value)
								)
							}}>
							<option value={-1}> - </option>
							{STANDARD_ARRAY.map(val => (
								<option
									key={`${abilityKey}_${val}`}
									value={val}>
									{val}
								</option>
							))}
							{/**NOTE: we could include a disabled prop on the options here
							 * something like Object.values(selectedValues).includes(val),
							 * but that forces users to un-select instead of being able to overwrite... */}
						</select>
					</>
				)
			})}
			<div
				className="data-summary"
				style={{
					margin: '30px 0',
					padding: '30px 0',
					border: 'solid 1px aliceblue',
				}}>
				<div className="available-values">
					<h2>Available Values</h2>
					<pre>{JSON.stringify(availableValues)}</pre>
				</div>
				<div className="selected-values">
					<h2>Selected Values</h2>
					<pre>{JSON.stringify(selectedValues)}</pre>
				</div>
			</div>
		</div>
	)
}

export default StandardArraySelection
