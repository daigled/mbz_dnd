import './CharacterSummary.css'

function CharacterSummary(props: any) {
	const { character } = props

	return (
		<div className="character-summary-wrap" style={{ background: '#ccc' }}>
			<h1 className="section-header">Character Summary</h1>
			<div className="detail-container">
				<div className="detail-name">Race:</div>
				<div className="detail-value">{character.race ?? 'unset'}</div>
			</div>
			{character.subrace && (
				<div className="detail-container">
					<div className="detail-name">Subrace:</div>
					<div className="detail-value">
						{character.subrace ?? 'unset'}
					</div>
				</div>
			)}
			<div className="detail-container">
				<div className="detail-name">Class:</div>
				<div className="detail-value">{character.class ?? 'unset'}</div>
			</div>
		</div>
	)
}

export default CharacterSummary
