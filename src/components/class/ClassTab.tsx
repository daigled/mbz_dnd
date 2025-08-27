import { useState, useContext, useEffect } from 'react'
import { classes } from '../../data/classes.json'
import { CharacterContext } from '../../store/characterContext'
import Select from 'react-select'
import ClassLevelTable from './ClassLevelTable'

function ClassTab() {
	const { state: character, dispatch } = useContext(CharacterContext)
	const [selectedClass, setSelectedClass] = useState('')
	const [selectedLevel, setSelectedLevel] = useState(1)
	const [selectedSkills, setSelectedSkills] = useState<string[]>([])
	const [selectedSubclass, setSelectedSubclass] = useState('')

	// Get the currently selected class data
	const currentClassData = classes.find(cls => cls.name === selectedClass)
	const currentClassLevel = character.classLevels.find(cl => cl.className === selectedClass)

	useEffect(() => {
		if (currentClassLevel) {
			setSelectedLevel(currentClassLevel.level)
			setSelectedSkills(currentClassLevel.selectedSkills)
			setSelectedSubclass(currentClassLevel.selectedSubclass || '')
		}
	}, [currentClassLevel])

	const handleClassChange = (className: string) => {
		setSelectedClass(className)
		setSelectedLevel(1) // Reset level to 1
		setSelectedSkills([]) // Clear skills
		setSelectedSubclass('') // Clear subclass
		
		if (className) {
			dispatch({ type: 'SET_SINGLE_CLASS', payload: { className, level: 1 } })
			
			// Add class proficiencies automatically
			const classData = classes.find(cls => cls.name === className)
			if (classData) {
				dispatch({ 
					type: 'ADD_CLASS_PROFICIENCIES', 
					payload: { 
						className,
						savingThrows: classData.savingThrows,
						armorProficiency: classData.armorProficiency,
						weaponProficiency: classData.weaponProficiency
					}
				})
			}
		} else {
			// If no class selected, reset everything
			setSelectedLevel(1)
			setSelectedSkills([])
			setSelectedSubclass('')
		}
	}

	const handleLevelChange = (level: number) => {
		setSelectedLevel(level)
		if (selectedClass) {
			dispatch({ type: 'UPDATE_CLASS_LEVEL', payload: { className: selectedClass, level } })
		}
	}

	const handleSubclassChange = (subclass: string) => {
		setSelectedSubclass(subclass)
		if (selectedClass) {
			dispatch({ type: 'SET_CLASS_SUBCLASS', payload: { className: selectedClass, subclass } })
		}
	}

	const handleSkillSelection = (selectedOptions: any) => {
		const skillValues = selectedOptions ? selectedOptions.map((opt: any) => opt.value) : []
		
		// Remove skills that are no longer selected
		selectedSkills.forEach(skill => {
			if (!skillValues.includes(skill)) {
				dispatch({ type: 'REMOVE_CLASS_SKILL', payload: { className: selectedClass, skill } })
			}
		})
		
		// Add newly selected skills
		skillValues.forEach((skill: string) => {
			if (!selectedSkills.includes(skill)) {
				dispatch({ type: 'ADD_CLASS_SKILL', payload: { className: selectedClass, skill } })
			}
		})
		
		setSelectedSkills(skillValues)
	}

	// Convert available skills to react-select format
	const getSkillOptions = (availableSkills: string[]) => {
		const skillNames: { [key: string]: string } = {
			'acrobatics': 'Acrobatics',
			'animal_handling': 'Animal Handling',
			'arcana': 'Arcana',
			'athletics': 'Athletics',
			'deception': 'Deception',
			'history': 'History',
			'insight': 'Insight',
			'intimidation': 'Intimidation',
			'investigation': 'Investigation',
			'medicine': 'Medicine',
			'nature': 'Nature',
			'perception': 'Perception',
			'performance': 'Performance',
			'persuasion': 'Persuasion',
			'religion': 'Religion',
			'sleight_of_hand': 'Sleight of Hand',
			'stealth': 'Stealth',
			'survival': 'Survival'
		}

		return availableSkills.map(skill => ({
			value: skill,
			label: skillNames[skill] || skill
		}))
	}

	const selectedSkillOptions = selectedSkills.map(skill => ({
		value: skill,
		label: skill.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
	}))

	return (
		<div className="class-tab">
			<div className="class-selector-wrap" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
				
				{/* Class Selection */}
				<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
					<label htmlFor='class-select'>Select A Class:</label>
					<select
						name="class-select"
						value={character.class || selectedClass}
						onChange={e => handleClassChange(e.target.value)}
						style={{ minWidth: '150px' }}>
						<option value="">-- Choose a class --</option>
						{classes.map(cls => (
							<option key={cls.name} value={cls.name}>{cls.name}</option>
						))}
					</select>
				</div>

				{/* Level Selection */}
				{selectedClass && (
					<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
						<label htmlFor='level-select'>Level:</label>
						<select
							name="level-select"
							value={selectedLevel}
							onChange={e => handleLevelChange(Number(e.target.value))}
							style={{ minWidth: '100px' }}>
							{Array.from({ length: 20 }, (_, i) => i + 1).map(level => (
								<option key={level} value={level}>{level}</option>
							))}
						</select>
					</div>
				)}

				{/* Subclass Selection */}
				{currentClassData && currentClassData.subclasses && selectedLevel >= (currentClassData.subclassLevel || 3) && (
					<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
						<label htmlFor='subclass-select'>{currentClassData.subclassName || 'Subclass'}:</label>
						<select
							name="subclass-select"
							value={selectedSubclass}
							onChange={e => handleSubclassChange(e.target.value)}
							style={{ minWidth: '150px' }}>
							<option value="">-- Choose a {currentClassData.subclassName?.toLowerCase() || 'subclass'} --</option>
							{currentClassData.subclasses.map(subclass => (
								<option key={subclass.name} value={subclass.name}>{subclass.name}</option>
							))}
						</select>
					</div>
				)}

				{/* Selected Subclass Info */}
				{currentClassData && selectedSubclass && (
					<div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
						<strong>{selectedSubclass}</strong>
						<p style={{ margin: '5px 0', fontSize: '14px' }}>
							{currentClassData.subclasses?.find(s => s.name === selectedSubclass)?.description}
						</p>
					</div>
				)}

				{/* Class Features Display */}
				{currentClassData && (
					<div className="class-details" style={{ marginTop: '20px' }}>
						<h3>{currentClassData.name}</h3>
						<p>{currentClassData.description}</p>
						
						<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
							<div>
								<strong>Hit Die:</strong> d{currentClassData.hitDie}
							</div>
							<div>
								<strong>Primary Abilities:</strong> {currentClassData.primaryAbility.join(', ')}
							</div>
							<div>
								<strong>Saving Throws:</strong> {currentClassData.savingThrows.join(', ')}
							</div>
							<div>
								<strong>Armor:</strong> {currentClassData.armorProficiency.join(', ') || 'None'}
							</div>
						</div>

						{/* Skill Selection */}
						{currentClassData.skillChoices > 0 && (
							<div style={{ marginTop: '20px' }}>
								<label>Choose {currentClassData.skillChoices} skills:</label>
								<Select
									isMulti
									value={selectedSkillOptions}
									onChange={handleSkillSelection}
									options={getSkillOptions(currentClassData.availableSkills)}
									isOptionDisabled={() => selectedSkills.length >= currentClassData.skillChoices}
									placeholder={`Select up to ${currentClassData.skillChoices} skills...`}
								/>
								{selectedSkills.length > currentClassData.skillChoices && (
									<p style={{ color: 'red', fontSize: '12px' }}>
										You can only select {currentClassData.skillChoices} skills for this class.
									</p>
								)}
							</div>
						)}

						{/* Class Features */}
						<div style={{ marginTop: '20px' }}>
							<strong>Class Features:</strong>
							<ul style={{ marginTop: '5px' }}>
								{currentClassData.features.map((feature, index) => (
									<li key={index}>{feature}</li>
								))}
							</ul>
						</div>

						{/* Weapon Proficiencies */}
						{currentClassData.weaponProficiency.length > 0 && (
							<div style={{ marginTop: '15px' }}>
								<strong>Weapon Proficiencies:</strong> {currentClassData.weaponProficiency.join(', ')}
							</div>
						)}
					</div>
				)}

				{/* Current Class Levels Summary */}
				{character.classLevels.length > 0 && (
					<div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
						<strong>Current Classes:</strong>
						{character.classLevels.map((classLevel, index) => (
							<div key={index} style={{ marginTop: '5px' }}>
								{classLevel.className} (Level {classLevel.level})
								{classLevel.selectedSubclass && (
									<div style={{ fontSize: '12px', marginLeft: '10px', fontStyle: 'italic' }}>
										{classLevel.selectedSubclass}
									</div>
								)}
								{classLevel.selectedSkills.length > 0 && (
									<div style={{ fontSize: '12px', marginLeft: '10px' }}>
										Skills: {classLevel.selectedSkills.join(', ')}
									</div>
								)}
							</div>
						))}
						<div style={{ marginTop: '10px', fontWeight: 'bold' }}>
							Total Level: {character.totalLevel}
						</div>
					</div>
				)}

				{/* Level Progression Table */}
				{currentClassData && (
					<ClassLevelTable 
						classData={currentClassData} 
						currentLevel={selectedLevel}
						selectedSubclass={selectedSubclass}
					/>
				)}
			</div>
		</div>
	)
}

export default ClassTab