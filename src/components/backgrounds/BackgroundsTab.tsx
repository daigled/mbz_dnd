import { useState } from 'react'
import { background } from '../../data/backgrounds.json'
import BackgroundSummary from './BackgroundSummary'

export interface BackgroundsTabProps {
	onChange: any
}

export default function BackgroundsTab(props: BackgroundsTabProps) {
	const { onChange } = props
	const [openSummary, setopenSummary] = useState('')

	const availableBackgrounds = background.filter(
		b =>
			b.source === 'PHB' &&
			b.name !== 'Custom Background' &&
			!b.name.includes('Variant')
	)

	function handleChange(val) {
		if (openSummary === val) {
			setopenSummary('')
			onChange('')
		} else {
			setopenSummary(val)
			onChange(val)
		}
	}

	return (
		<div
			className="character-background-tab-wrap"
			style={{ display: 'flex', flexDirection: 'column' }}>
			{availableBackgrounds.map(b => {
				return (
					<>
						<div
							style={{
								backgroundColor: 'grey',
								cursor: 'pointer',
								border: '5px solid',
							}}
							onClick={e => handleChange(b.name)}
							key={b.name}>
							{b.name}
							{openSummary === b.name && (
								<BackgroundSummary background={b} />
							)}
						</div>
					</>
				)
			})}
		</div>
	)
}
