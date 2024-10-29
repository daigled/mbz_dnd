import { useState } from 'react'
import StandardArraySelection from './StandardArraySelection'
import DiceRollSelection from './DiceRollSelection'

function AbilityScoresTab({ setCharacterAttrs }) {
	const [mode, setMode] = useState('')

	const noModeSet = mode === ''

	const selectionModes = ['standard_array', 'dice_roll', 'point_buy']

	return (
		<div className="attributes-tab-wrap">
			<div className="mode-selection-wrap">
				{noModeSet && <p>Please Select a Mode</p>}
				{selectionModes.map(sM => (
					<div className="selection-mode-option-wrap">
						<label htmlFor="">{sM}</label>
						<input
							type="radio"
							checked={mode === sM}
							value={sM}
							onChange={e => setMode(sM)}
						/>
					</div>
				))}
			</div>
			{!noModeSet && <>selected mode: {mode}</>}
			{mode === 'standard_array' && <StandardArraySelection />}
			{mode === 'dice_roll' && <DiceRollSelection />}
		</div>
	)
}

export default AbilityScoresTab
