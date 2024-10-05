import { useState } from 'react'

export default function AttributesTab() {
	const [inputVisibility, setInputVisibility] = useState(false)
	const [bottomVisibility, setBottomVisibility] = useState(false)
	const [buttonVisibility, setButtonVisibility] = useState(false)
	const [numbersArray, setNumbersArray] = useState([0, 0, 0, 0, 0, 0])
	const [selectedAttributes, setSelectedAttributes] = useState([
		'non',
		'non',
		'non',
		'non',
		'non',
		'non',
	])

	const standardArray = [15, 14, 13, 12, 10, 8]
	const attributeNames = [
		'-',
		'Strength',
		'Dexterity',
		'Constitution',
		'Intelligence',
		'Wisdom',
		'Charisma',
	]

	const radioButtons: { value: string; label: string }[] = [
		{ value: 'standardArray', label: 'Standard Array' },
		{ value: 'rolled', label: 'Rolled' },
		{ value: 'fillIn', label: 'Fill In' },
	]

	function handleAttributeTypeAssign(e) {
		if (e === 'standardArray') {
			setNumbersArray(standardArray)
			setButtonVisibility(false)
			setSelectedAttributes(['non', 'non', 'non', 'non', 'non', 'non'])
			setBottomVisibility(true)
			setInputVisibility(false)
		} else if (e === 'rolled') {
			setNumbersArray([0, 0, 0, 0, 0, 0])
			setButtonVisibility(true)
			setSelectedAttributes(['non', 'non', 'non', 'non', 'non', 'non'])
			setBottomVisibility(true)
			setInputVisibility(false)
		} else {
			setNumbersArray(['n', 'n', 'n', 'n', 'n', 'n'])
			setButtonVisibility(false)
			setSelectedAttributes(['non', 'non', 'non', 'non', 'non', 'non'])
			setBottomVisibility(true)
			setInputVisibility(true)
		}
	}

	function handleAssign(val, index) {
		const newStateArray = selectedAttributes.map((v, i) => {
			if (i === index) {
				return val
			} else {
				return v
			}
		})
		setSelectedAttributes(newStateArray)
	}

	function rollDice(numDice, numSides) {
		const results = []
		for (let i = 0; i < numDice; i++) {
			results.push(Math.floor(Math.random() * numSides) + 1)
		}
		return results
	}

	function handleRoll(index) {
		const newNumbersArray = numbersArray.map((v, i) => {
			if (i === index) {
				const rolls = rollDice(4, 6)
				rolls.sort((a, b) => a - b)
				rolls.shift()
				return rolls.reduce((sum, roll) => sum + roll, 0)
			} else {
				return v
			}
		})
		setNumbersArray(newNumbersArray)
	}

	return (
		<>
			<div>
				<p>How would you like to calculate stats?</p>
				{radioButtons.map(item => (
					<div key={item.value}>
						<input
							type="radio"
							name="attrType"
							value={item.value}
							id={item.value}
							onChange={e =>
								handleAttributeTypeAssign(e.target.value)
							}
						/>{' '}
						<label htmlFor={item.value}>{item.value}</label>
					</div>
				))}
			</div>
			{/* <div>{selectedAttributes}</div>
			<div>{numbersArray}</div> */}
			{bottomVisibility &&
				numbersArray.map((num, index) => (
					<div>
						{buttonVisibility && (
							<button onClick={e => handleRoll(index)}>
								Roll
							</button>
						)}
						{inputVisibility ? (
							<input type="number" min="3" max="18" />
						) : (
							<label htmlFor={num}>{num}</label>
						)}
						<select
							name={num}
							id={num}
							value={selectedAttributes[index]}
							defaultValue="-"
							onChange={e => handleAssign(e.target.value, index)}>
							{attributeNames.map(opt => (
								<option
									key={opt}
									disabled={
										selectedAttributes.includes(opt)
											? true
											: null
									}>
									{opt}
								</option>
							))}
						</select>
					</div>
				))}
		</>
	)
}
