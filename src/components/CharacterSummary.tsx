import './CharacterSummary.css'
import { useContext } from 'react'
import { CharacterContext } from '../store/characterContext'

function CharacterSummary() {
	const { state: character } = useContext(CharacterContext)

	return (
		<div className="character-summary-wrap" style={{ background: '#ccc' }}>
			<h1 className="section-header">Character Summary</h1>

			<div className="detail-container">
				<div className="detail-name">Race:</div>
				<div className="detail-value">{character.race || 'unset'}</div>
			</div>

			<div className="detail-container">
				<div className="detail-name">Class:</div>
				<div className="detail-value">{character.class || 'unset'}</div>
			</div>

			<div className="detail-container">
				<div className="detail-name">Ability Scores:</div>
				<div className="detail-value">
					{Object.entries(character.abilityScores)
						.map(([key, val]) => `${key.toUpperCase()}: ${val}`)
						.join(', ')}
				</div>
			</div>

			<div className="detail-container">
				<div className="detail-name">Background:</div>
				<div className="detail-value">
					{character.background || 'unset'}
				</div>
			</div>

			<div className="detail-container">
				<div className="detail-name">Skill Proficiencies:</div>
				<div className="detail-value">
					{character.skillProficiencies.length
						? character.skillProficiencies.join(', ')
						: 'unset'}
				</div>
			</div>

			<div className="detail-container">
				<div className="detail-name">Tool Proficiencies:</div>
				<div className="detail-value">
					{character.toolProficiencies.length
						? character.toolProficiencies.join(', ')
						: 'unset'}
				</div>
			</div>

			<div className="detail-container">
				<div className="detail-name">Languages:</div>
				<div className="detail-value">
					{character.languages.length
						? character.languages.join(', ')
						: 'unset'}
				</div>
			</div>
		</div>
	)
}

export default CharacterSummary
