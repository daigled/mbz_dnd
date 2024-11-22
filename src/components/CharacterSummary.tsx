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
			<div className="detail-container">
				<div className="detail-name">Class:</div>
				<div className="detail-value">{character.class ?? 'unset'}</div>
			</div>
			<div className="detail-container">
				<div className="detail-name">Abilty Scores:</div>
				<div className="detail-value">
					{/* {character.abilityScores ?? 'unset'} */}
				</div>
			</div>
			<div className="detail-container">
				<div className="detail-name">Background:</div>
				<div className="detail-value">{character.background ?? ''}</div>
			</div>
			<div className="detail-container">
				<div className="detail-name">Skill Proficiencies:</div>
				<div className="detail-value">
					{character.skillProficiencies ?? ''}
				</div>
			</div>
			<div className="detail-container">
				<div className="detail-name">Tool Proficiencies:</div>
				<div className="detail-value">
					{character.toolProficiencies ?? ''}
				</div>
			</div>
			<div className="detail-container">
				<div className="detail-name">Languages:</div>
				<div className="detail-value">{character.languages ?? ''}</div>
			</div>
		</div>
	)
}

export default CharacterSummary
