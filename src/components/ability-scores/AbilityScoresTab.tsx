import { useState, useContext } from 'react'
import StandardArraySelection from './StandardArraySelection'
import DiceRollSelection from './DiceRollSelection'
import { CharacterContext } from '../../store/characterContext'

function AbilityScoresTab() {
	const { dispatch } = useContext(CharacterContext)
	const [mode, setMode] = useState('')

	const noModeSet = mode === ''

	const selectionModes = ['standard_array', 'dice_roll', 'point_buy']

	return (
		<div className="attributes-tab-wrap">
			<div className="mode-selection-wrap">
				{noModeSet && <p>Please Select a Mode</p>}
				{selectionModes.map(sM => (
					<div key={sM} className="selection-mode-option-wrap">
						<label htmlFor={sM}>{sM}</label>
						<input
							id={sM}
							type="radio"
							checked={mode === sM}
							value={sM}
							onChange={() => setMode(sM)}
						/>
					</div>
				))}
			</div>

			{!noModeSet && <>Selected mode: {mode}</>}

			{mode === 'standard_array' && (
				<StandardArraySelection dispatch={dispatch} />
			)}
			{mode === 'dice_roll' && <DiceRollSelection dispatch={dispatch} />}
		</div>
	)
}

export default AbilityScoresTab
