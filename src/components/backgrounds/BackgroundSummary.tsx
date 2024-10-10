import { Background } from '../../interfaces'

export default function BackgroundSummary(props: any) {
	const background: Background = props.background

	return (
		<div className="background-summary" style={{ backgroundColor: 'red' }}>
			<div className="source">
				<span className="detail-key">Source:</span>
				{background.source}
			</div>
			<div className="skill-proficiencies">
				<span className="detail-key">Skill Proficiences:</span>
				{JSON.stringify(background.skillProficiencies)}
			</div>
			<div className="language-proficiencies">
				<span className="detail-key">Language Proficiences:</span>
				{JSON.stringify(background.languageProficiencies)}
			</div>
			<div className="starting-equipment">
				<span className="detail-key">Starting Equipment:</span>
				{JSON.stringify(background.startingEquipment)}
			</div>
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
