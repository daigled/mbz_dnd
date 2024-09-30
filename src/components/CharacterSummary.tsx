function CharacterSummary(props: any) {
	const { character } = props

	return (
		<div className="character-summary-wrap">
			<h1>This is the summary for the character</h1>
			<div className="detail-container">
				<div className="detail-name">Race:</div>
				<div className="detail-value">{character.race}</div>
			</div>
		</div>
	)
}

export default CharacterSummary
