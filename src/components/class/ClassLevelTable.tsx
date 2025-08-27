import { useState } from 'react'

interface ClassData {
	name: string
	spellcaster: boolean
	spellcastingAbility?: string
	ritualCasting?: boolean
	subclassLevel?: number
	subclassName?: string
	featureDescriptions?: { [featureName: string]: string }
	subclasses?: Array<{
		name: string
		description: string
		features: { [level: string]: string[] }
		featureDescriptions?: { [featureName: string]: string }
		spellcaster?: boolean
		spellcastingAbility?: string
	}>
	levelProgression: Array<{
		level: number
		proficiencyBonus: number
		features: string[]
		cantripsKnown?: number
		spellsKnown?: number
		spellSlots?: { [key: string]: number }
	}>
}

interface ClassLevelTableProps {
	classData: ClassData
	currentLevel: number
	selectedSubclass?: string
}

function ClassLevelTable({ classData, currentLevel, selectedSubclass }: ClassLevelTableProps) {
	const [expandedFeatures, setExpandedFeatures] = useState<{ [key: string]: boolean }>({})

	const toggleFeature = (featureName: string) => {
		setExpandedFeatures(prev => ({
			...prev,
			[featureName]: !prev[featureName]
		}))
	}

	const getFeatureDescription = (featureName: string) => {
		// Check base class feature descriptions
		if (classData.featureDescriptions?.[featureName]) {
			return classData.featureDescriptions[featureName]
		}

		// Check subclass feature descriptions
		if (selectedSubclass && classData.subclasses) {
			const subclass = classData.subclasses.find(s => s.name === selectedSubclass)
			if (subclass?.featureDescriptions?.[featureName]) {
				return subclass.featureDescriptions[featureName]
			}
		}

		// Default descriptions for common features
		const defaultDescriptions: { [key: string]: string } = {
			"Fighting Style": "You adopt a particular style of fighting as your specialty. Choose one fighting style option.",
			"Second Wind": "You have a limited well of stamina that you can draw on to protect yourself from harm. On your turn, you can use a bonus action to regain hit points equal to 1d10 + your fighter level.",
			"Action Surge (one use)": "You can push yourself beyond your normal limits for a moment. On your turn, you can take one additional action on top of your regular action and a possible bonus action.",
			"Action Surge (two uses)": "You can use Action Surge twice before needing a short or long rest, but still only once per turn.",
			"Ability Score Improvement": "You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1.",
			"Extra Attack (1)": "You can attack twice, instead of once, whenever you take the Attack action on your turn.",
			"Extra Attack (2)": "You can attack three times whenever you take the Attack action on your turn.",
			"Extra Attack (3)": "You can attack four times whenever you take the Attack action on your turn.",
			"Indomitable (one use)": "You can reroll a saving throw that you fail. If you do so, you must use the new roll, and you can't use this feature again until you finish a long rest.",
			"Indomitable (two uses)": "You can use Indomitable twice before needing a long rest.",
			"Indomitable (three uses)": "You can use Indomitable three times before needing a long rest.",
			"Spellcasting": "You have learned to cast spells. See the class description for details.",
			"Arcane Recovery": "You have learned to regain some of your magical energy by studying your spellbook. Once per day when you finish a short rest, you can choose expended spell slots to recover.",
			"Arcane Tradition": "Choose an arcane tradition, which shapes the practice of your magic.",
			"Martial Archetype": "Choose a martial archetype that you emulate in your combat styles and techniques.",
			"Roguish Archetype": "Choose an archetype that you emulate in the exercise of your rogue abilities.",
			"Expertise": "Choose two of your skill proficiencies, or one skill proficiency and your proficiency with thieves' tools. Your proficiency bonus is doubled for any ability check you make that uses either of the chosen proficiencies.",
			"Sneak Attack (1d6)": "You know how to strike subtly and exploit a foe's distraction. Once per turn, you can deal an extra 1d6 damage to one creature you hit with an attack if you have advantage on the attack roll.",
			"Sneak Attack (2d6)": "Your sneak attack damage increases to 2d6.",
			"Sneak Attack (3d6)": "Your sneak attack damage increases to 3d6.",
			"Sneak Attack (4d6)": "Your sneak attack damage increases to 4d6.",
			"Sneak Attack (5d6)": "Your sneak attack damage increases to 5d6.",
			"Sneak Attack (6d6)": "Your sneak attack damage increases to 6d6.",
			"Sneak Attack (7d6)": "Your sneak attack damage increases to 7d6.",
			"Sneak Attack (8d6)": "Your sneak attack damage increases to 8d6.",
			"Sneak Attack (9d6)": "Your sneak attack damage increases to 9d6.",
			"Sneak Attack (10d6)": "Your sneak attack damage increases to 10d6.",
			"Thieves' Cant": "You have learned thieves' cant, a secret mix of dialect, jargon, and code that allows you to hide messages in seemingly normal conversation.",
			"Cunning Action": "You can take a Dash, Disengage, or Hide action as a bonus action on each of your turns.",
			"Uncanny Dodge": "When an attacker that you can see hits you with an attack, you can use your reaction to halve the attack's damage against you.",
			"Evasion": "When you are subjected to an effect that allows you to make a Dexterity saving throw to take only half damage, you instead take no damage if you succeed on the saving throw, and only half damage if you fail.",
			"Reliable Talent": "Whenever you make an ability check that lets you add your proficiency bonus, you can treat a d20 roll of 9 or lower as a 10.",
			"Blindsense": "If you are able to hear, you are aware of the location of any hidden or invisible creature within 10 feet of you.",
			"Slippery Mind": "You have acquired greater mental strength. You gain proficiency in Wisdom saving throws.",
			"Elusive": "You are so evasive that attackers rarely gain the upper hand against you. No attack roll has advantage against you while you aren't incapacitated.",
			"Stroke of Luck": "If your attack misses a target within range, you can turn the miss into a hit. Alternatively, if you fail an ability check, you can treat the d20 roll as a 20. Once you use this feature, you can't use it again until you finish a short or long rest.",
			"Bardic Inspiration": "You can inspire others through stirring words or music. To do so, you use a bonus action on your turn to choose one creature other than yourself within 60 feet of you who can hear you. That creature gains one Bardic Inspiration die, a d6.",
			"Jack of All Trades": "You can add half your proficiency bonus, rounded down, to any ability check you make that doesn't already include your proficiency bonus.",
			"Song of Rest": "If you or any friendly creatures who can hear your performance regain hit points at the end of the short rest by spending one or more Hit Dice, each of those creatures regains an extra 1d6 hit points.",
			"Divine Domain": "Choose one domain related to your deity. Your choice grants you domain spells and other features.",
			"Channel Divinity (1/rest)": "You gain the ability to channel divine energy directly from your deity, using that energy to fuel magical effects. You start with two such effects: Turn Undead and an effect determined by your domain. You can use your Channel Divinity once between rests.",
			"Channel Divinity (2/rest)": "You can use your Channel Divinity twice between rests.",
			"Channel Divinity (3/rest)": "You can use your Channel Divinity three times between rests.",
			"Destroy Undead (CR 1/2)": "When an undead fails its saving throw against your Turn Undead feature, the creature is instantly destroyed if its challenge rating is at or below 1/2.",
			"Destroy Undead (CR 1)": "Your Destroy Undead feature can now destroy undead of CR 1 or lower.",
			"Destroy Undead (CR 2)": "Your Destroy Undead feature can now destroy undead of CR 2 or lower.",
			"Destroy Undead (CR 3)": "Your Destroy Undead feature can now destroy undead of CR 3 or lower.",
			"Destroy Undead (CR 4)": "Your Destroy Undead feature can now destroy undead of CR 4 or lower.",
			"Divine Intervention": "You can call on your deity to intervene on your behalf when your need is great. Imploring your deity's aid requires you to use your action. Describe the assistance you seek, and roll percentile dice. If you roll a number equal to or lower than your cleric level, your deity intervenes.",
			"Divine Intervention Improvement": "Your Divine Intervention feature now automatically succeeds with no roll required."
		}

		return defaultDescriptions[featureName] || null
	}

	const renderFeatureCell = (levelData: any) => {
		let allFeatures: string[] = [...levelData.features]
		
		// Add subclass features if applicable
		if (selectedSubclass && classData.subclasses) {
			const subclass = classData.subclasses.find(s => s.name === selectedSubclass)
			if (subclass && subclass.features[levelData.level.toString()]) {
				allFeatures.push(...subclass.features[levelData.level.toString()])
			}
		}

		if (allFeatures.length === 0) {
			return <div>—</div>
		}

		return (
			<div>
				{allFeatures.map((feature, index) => {
					const description = getFeatureDescription(feature)
					const isExpanded = expandedFeatures[`${levelData.level}-${feature}`]
					
					return (
						<div key={index} style={{ marginBottom: index < allFeatures.length - 1 ? '4px' : '0' }}>
							<span
								onClick={() => description && toggleFeature(`${levelData.level}-${feature}`)}
								style={{
									cursor: description ? 'pointer' : 'default',
									color: description ? '#0066cc' : 'inherit',
									textDecoration: description ? 'underline' : 'none',
									fontSize: '12px'
								}}
								title={description ? 'Click for description' : undefined}
							>
								{feature}
							</span>
							{isExpanded && description && (
								<div style={{
									marginTop: '4px',
									padding: '6px',
									backgroundColor: '#f0f8ff',
									border: '1px solid #ccc',
									borderRadius: '4px',
									fontSize: '11px',
									lineHeight: '1.3',
									maxWidth: '300px'
								}}>
									{description}
								</div>
							)}
						</div>
					)
				})}
			</div>
		)
	}
	const renderSpellSlotColumns = () => {
		if (!classData.spellcaster) return null

		// Find all spell levels used by this class
		const spellLevels = new Set<string>()
		classData.levelProgression.forEach(level => {
			if (level.spellSlots) {
				Object.keys(level.spellSlots).forEach(slot => spellLevels.add(slot))
			}
		})

		const sortedSpellLevels = Array.from(spellLevels).sort((a, b) => {
			const aNum = a === '1st' ? 1 : a === '2nd' ? 2 : a === '3rd' ? 3 : parseInt(a.replace(/\D/g, ''))
			const bNum = b === '1st' ? 1 : b === '2nd' ? 2 : b === '3rd' ? 3 : parseInt(b.replace(/\D/g, ''))
			return aNum - bNum
		})

		return sortedSpellLevels.map(spellLevel => (
			<th key={spellLevel} style={{ padding: '8px', fontSize: '12px', minWidth: '40px' }}>
				{spellLevel}
			</th>
		))
	}

	const renderSpellSlotCells = (levelData: any) => {
		if (!classData.spellcaster) return null

		const spellLevels = new Set<string>()
		classData.levelProgression.forEach(level => {
			if (level.spellSlots) {
				Object.keys(level.spellSlots).forEach(slot => spellLevels.add(slot))
			}
		})

		const sortedSpellLevels = Array.from(spellLevels).sort((a, b) => {
			const aNum = a === '1st' ? 1 : a === '2nd' ? 2 : a === '3rd' ? 3 : parseInt(a.replace(/\D/g, ''))
			const bNum = b === '1st' ? 1 : b === '2nd' ? 2 : b === '3rd' ? 3 : parseInt(b.replace(/\D/g, ''))
			return aNum - bNum
		})

		return sortedSpellLevels.map(spellLevel => (
			<td key={spellLevel} style={{ padding: '6px', textAlign: 'center', fontSize: '12px' }}>
				{levelData.spellSlots?.[spellLevel] || '—'}
			</td>
		))
	}

	const getRowStyle = (level: number) => ({
		backgroundColor: level === currentLevel ? '#e3f2fd' : level <= currentLevel ? '#f5f5f5' : 'white',
		opacity: level > currentLevel ? 0.6 : 1,
		fontWeight: level === currentLevel ? 'bold' : 'normal'
	})

	return (
		<div style={{ marginTop: '20px', overflowX: 'auto' }}>
			<h4>Level Progression Table</h4>
			<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', minWidth: '800px' }}>
				<thead>
					<tr style={{ backgroundColor: '#e0e0e0' }}>
						<th style={{ padding: '10px', border: '1px solid #ccc' }}>Level</th>
						<th style={{ padding: '10px', border: '1px solid #ccc' }}>Prof. Bonus</th>
						{classData.spellcaster && (
							<>
								<th style={{ padding: '8px', border: '1px solid #ccc', fontSize: '12px' }}>Cantrips</th>
								{classData.name === 'Wizard' && <th style={{ padding: '8px', border: '1px solid #ccc', fontSize: '12px' }}>Spells Known</th>}
								{renderSpellSlotColumns()}
							</>
						)}
						<th style={{ padding: '10px', border: '1px solid #ccc', minWidth: '300px' }}>Features</th>
					</tr>
				</thead>
				<tbody>
					{classData.levelProgression.map((levelData) => (
						<tr key={levelData.level} style={getRowStyle(levelData.level)}>
							<td style={{ padding: '8px', border: '1px solid #ccc', textAlign: 'center' }}>
								{levelData.level}
							</td>
							<td style={{ padding: '8px', border: '1px solid #ccc', textAlign: 'center' }}>
								+{levelData.proficiencyBonus}
							</td>
							{classData.spellcaster && (
								<>
									<td style={{ padding: '6px', border: '1px solid #ccc', textAlign: 'center', fontSize: '12px' }}>
										{levelData.cantripsKnown || '—'}
									</td>
									{classData.name === 'Wizard' && (
										<td style={{ padding: '6px', border: '1px solid #ccc', textAlign: 'center', fontSize: '12px' }}>
											{levelData.spellsKnown || '—'}
										</td>
									)}
									{renderSpellSlotCells(levelData)}
								</>
							)}
							<td style={{ padding: '8px', border: '1px solid #ccc', fontSize: '12px' }}>
								{renderFeatureCell(levelData)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
			
			{classData.spellcaster && (
				<div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#f0f8ff', borderRadius: '5px' }}>
					<strong>Spellcasting Info:</strong>
					<ul style={{ marginTop: '5px', marginBottom: '0' }}>
						<li><strong>Spellcasting Ability:</strong> {classData.spellcastingAbility}</li>
						{classData.ritualCasting && <li><strong>Ritual Casting:</strong> Can cast spells as rituals if they have the ritual tag</li>}
						{classData.name === 'Wizard' && <li><strong>Spellbook:</strong> Can learn additional spells by copying them into spellbook</li>}
						{classData.name === 'Cleric' && <li><strong>Spell Preparation:</strong> Can prepare a number of spells = Wisdom modifier + Cleric level</li>}
					</ul>
				</div>
			)}

			<div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
				<strong>Legend:</strong> Current level highlighted in blue, available levels in gray, future levels dimmed
			</div>
		</div>
	)
}

export default ClassLevelTable