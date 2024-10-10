import { Background } from '../../interfaces'

export default function BackgroundSummary(props: any) {
	const background: Background = props.background

	const equipment = background.startingEquipment[0]._ // Access the first item in the array

	const formattedEquipment = equipment.map(item => {
		if (typeof item === 'string') {
			return item.split('|')[0] // Split to get only the name part
		} else if (item.item) {
			return item.displayName || item.item.split('|')[0] // Use displayName or fallback to item name
		} else if (item.special) {
			return item.quantity
				? `${item.quantity} ${item.special}`
				: item.special // Handle special cases
		}
		return ''
	})

	const lastItem = formattedEquipment.pop() // Remove the last item for formatting

	return (
		<div className="background-summary" style={{ backgroundColor: 'red' }}>
			<div className="source">
				<span className="detail-key">Source:</span>
				{background.source}
			</div>
			<div className="skill-proficiencies">
				<span className="detail-key">Skill Proficiences:</span>
				<div>
					{Object.keys(background.skillProficiencies[0]).map(key => (
						<div key={key} style={{ textTransform: 'capitalize' }}>
							{key}
						</div>
					))}
				</div>
			</div>
			{background.languageProficiencies && (
				<div className="language-proficiencies">
					<span className="detail-key">Language Proficiences: </span>
					<div style={{ textTransform: 'capitalize' }}>
						{background.languageProficiencies[0].anyStandard} of any
						standard language
					</div>
				</div>
			)}
			{background.toolProficiencies && (
				<div className="language-proficiencies">
					<span className="detail-key">Tool Proficiences: </span>
					<div style={{ textTransform: 'capitalize' }}>
						{Object.keys(background.toolProficiencies[0]).map(
							key => (
								<div key={key}>{key}</div>
							)
						)}
					</div>
				</div>
			)}
			{background.startingEquipment && (
				<div className="starting-equipment">
					<span className="detail-key">Starting Equipment:</span>
					{formattedEquipment.join(', ')}
					{lastItem && `, and ${lastItem}`}
				</div>
			)}

			<div className="entries">
				<span className="detail-key">Entries:</span>
				<ul className="entries-list">
					{Array.isArray(background.entries)
						? background.entries.map(entry => (
								<li>
									<span className="entry-name">
										{entry.name}
									</span>
									{JSON.stringify(entry.entries)}
								</li>
							))
						: JSON.stringify(background.entries)}
				</ul>
				{JSON.stringify(background.startingEquipment)}
			</div>
		</div>
	)
}
