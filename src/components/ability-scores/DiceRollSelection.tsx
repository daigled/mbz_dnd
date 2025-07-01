import { useState, useEffect } from 'react'

function DiceRollSelection({ dispatch }) {
	const ABILITIES = ['str', 'dex', 'con', 'int', 'wis', 'cha']

	const [scores, setScores] = useState({
		str: -1,
		dex: -1,
		con: -1,
		int: -1,
		wis: -1,
		cha: -1,
	})

	const [availableKeys, setAvailableKeys] = useState([
		'a',
		'b',
		'c',
		'd',
		'e',
		'f',
	])
	const [selectedKeys, setSelectedKeys] = useState([])
	const [diceValues, setDiceValues] = useState([
		{ key: 'a', value: 0 },
		{ key: 'b', value: 0 },
		{ key: 'c', value: 0 },
		{ key: 'd', value: 0 },
		{ key: 'e', value: 0 },
		{ key: 'f', value: 0 },
	])

	const rollDice = (numDice, numSides) => {
		const results = []
		for (let i = 0; i < numDice; i++) {
			results.push(Math.floor(Math.random() * numSides) + 1)
		}
		return results
	}

	useEffect(() => {
		const values = diceValues.map(v => {
			const rolls = rollDice(4, 6)
			rolls.sort((a, b) => a - b)
			rolls.shift()
			const newVal = rolls.reduce((sum, roll) => sum + roll, 0)
			return { ...v, value: newVal }
		})
		setDiceValues(values)
	}, [])

	useEffect(() => {
		const allAbilitiesAssigned = ABILITIES.every(key => scores[key] !== -1)
		if (allAbilitiesAssigned) {
			const abilityScores = {}
			for (const ability of ABILITIES) {
				const dieKey = scores[ability]
				const die = diceValues.find(d => d.key === dieKey)
				abilityScores[ability] = die?.value ?? -1
				dispatch({
					type: 'SET_ABILITY_SCORE',
					payload: { stat: ability, value: abilityScores[ability] },
				})
			}
		}
	}, [scores, diceValues])

	const makeSelection = (abilityKey, dieKey) => {
		let updatedSelectedKeys = [...selectedKeys]
		let updatedAvailableKeys = [...availableKeys]
		const updatedScores = { ...scores }

		if (dieKey === '-1') {
			const keyToRestore = scores[abilityKey]
			updatedScores[abilityKey] = -1
			updatedAvailableKeys.push(keyToRestore)
			updatedSelectedKeys = selectedKeys.filter(k => k !== keyToRestore)
		} else if (selectedKeys.includes(dieKey)) {
			const targetKey = Object.keys(scores).find(
				k => scores[k] === dieKey
			)
			updatedScores[targetKey] = -1
			updatedScores[abilityKey] = dieKey
		} else {
			updatedSelectedKeys.push(dieKey)
			updatedAvailableKeys = availableKeys.filter(k => k !== dieKey)
			updatedScores[abilityKey] = dieKey
		}

		setSelectedKeys(updatedSelectedKeys)
		setAvailableKeys(updatedAvailableKeys)
		setScores(updatedScores)
	}

	return (
		<div style={{ marginTop: '30px', borderTop: 'solid 1px pink' }}>
			<h1
				style={{
					marginBottom: '30px',
					padding: '10px 0',
					borderBottom: 'solid 1px #dedede',
				}}>
				Dice Roll Selection
			</h1>
			{ABILITIES.map(abilityKey => (
				<div key={abilityKey}>
					<label htmlFor={abilityKey}>
						{abilityKey.toUpperCase()}
					</label>
					<select
						value={scores[abilityKey]}
						name={abilityKey}
						onChange={e =>
							makeSelection(abilityKey, e.target.value)
						}>
						<option value="-1"> - </option>
						{diceValues.map(die => (
							<option
								key={`${abilityKey}_${die.key}`}
								value={die.key}>
								{die.value}:{die.key}
							</option>
						))}
					</select>
				</div>
			))}
			{/* Optional: debug info */}
			<div
				style={{
					margin: '30px 0',
					padding: '30px 0',
					border: 'solid 1px aliceblue',
				}}>
				<h2>Scores</h2>
				<ul>
					{Object.keys(scores).map(el => (
						<li key={el}>
							{el.toUpperCase()}:{' '}
							{diceValues.find(die => die.key === scores[el])
								?.value ?? '-'}
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default DiceRollSelection
