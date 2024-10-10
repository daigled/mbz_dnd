import { useState, useEffect } from 'react'

function DiceRollSelection() {
	const ABILITIES = ['str', 'dex', 'con', 'int', 'wis', 'cha']
	// scores do not have explicit values; they "point" to a value in diceValues
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
	// const [ diceValues, setDiceValues ] = useState([])
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
	// hacky, but an empty deps array on an effect ensures it only happens when the component mounts
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

	const makeSelection = (abilityKey, dieKey) => {
		let updatedSelectedKeys = [...selectedKeys]
		let updatedAvailableKeys = [...availableKeys]
		let updatedScores = { ...scores }

		// we are "unsetting" this ability
		if (dieKey === -1) {
			// console.log('not handled yet!')
			const keyToRestore = scores[abilityKey]
			updatedScores = { ...scores, [abilityKey]: -1 }
			updatedAvailableKeys = [...availableKeys, keyToRestore]
			updatedSelectedKeys = selectedKeys.filter(k => k !== keyToRestore)
		} else if (selectedKeys.includes(dieKey)) {
			console.log('not handled yet')

			// first, find the score currently using this dieKey
			const targetKey = Object.keys(scores).find(
				k => scores[k] === dieKey
			)
			updatedScores = {
				...scores,
				[targetKey]: -1,
				[abilityKey]: dieKey,
			}
			// updatedAvailableKeys = [...availableKeys, dieKey]
			// updatedSelectedKeys = selectedKeys.filter(k => k === targetKey)
		} else {
			updatedSelectedKeys = [...selectedKeys, dieKey]
			updatedAvailableKeys = availableKeys.filter(k => k !== dieKey)
			updatedScores = { ...updatedScores, [abilityKey]: dieKey }
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
			{ABILITIES.map(abilityKey => {
				return (
					<>
						<label htmlFor={abilityKey}>
							{abilityKey.toUpperCase()}
						</label>
						<select
							value={scores[abilityKey]}
							name={abilityKey}
							key={abilityKey}
							onChange={e => {
								const dieKey = e.target.value
								makeSelection(abilityKey, dieKey)
							}}>
							<option value={-1}> - </option>
							{diceValues.map((die, i) => (
								<option
									key={`${abilityKey}_${die.key}`}
									value={die.key}>
									{die.value}:{die.key}
								</option>
							))}
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
					<h2>Available Keys</h2>
					<pre>{JSON.stringify(availableKeys)}</pre>
				</div>
				<div className="selected-values">
					<h2>Selected Keys</h2>
					<pre>{JSON.stringify(selectedKeys)}</pre>
				</div>
				<div className="dice-values">
					<h2>Dice Values</h2>
					<pre>{JSON.stringify(diceValues)}</pre>
				</div>
				<div className="scores-summary">
					<h2>Scores</h2>
					<ul>
						{Object.keys(scores).map(el => (
							<li>
								<span>{el}:</span>{' '}
								<span>
									{
										diceValues.find(
											die => die.key === scores[el]
										)?.value
									}
								</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default DiceRollSelection
