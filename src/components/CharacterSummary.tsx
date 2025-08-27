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
				<div className="detail-value">
					{character.class 
						? `${character.class} (Level ${character.classLevel})`
						: 'unset'}
				</div>
			</div>

			<div className="detail-container">
				<div className="detail-name">Ability Scores:</div>
				<div className="ability-scores-horizontal" style={{ 
					display: 'flex', 
					gap: '12px', 
					flexWrap: 'wrap',
					marginTop: '8px'
				}}>
					{Object.entries(character.abilityScores).map(([key, baseVal]) => {
						const racialBonus = character.racialAbilityBonuses[key as keyof typeof character.racialAbilityBonuses] || 0
						const totalVal = baseVal === -1 ? (racialBonus > 0 ? racialBonus : -1) : baseVal + racialBonus
						
						return (
							<div key={key} style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								padding: '8px',
								border: '1px solid #999',
								borderRadius: '4px',
								backgroundColor: '#f5f5f5',
								minWidth: '50px'
							}}>
								<div style={{ 
									fontSize: '12px', 
									fontWeight: 'bold',
									marginBottom: '2px'
								}}>
									{key.toUpperCase()}
								</div>
								<div style={{ 
									fontSize: '16px', 
									fontWeight: 'bold'
								}}>
									{totalVal === -1 ? '—' : totalVal}
									{racialBonus > 0 && baseVal !== -1 && (
										<span style={{ fontSize: '10px', color: '#0066cc', marginLeft: '2px' }}>
											(+{racialBonus})
										</span>
									)}
								</div>
								<div style={{ 
									fontSize: '10px', 
									color: '#666'
								}}>
									{totalVal !== -1 ? `+${Math.floor((totalVal - 10) / 2)}` : ''}
								</div>
							</div>
						)
					})}
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
