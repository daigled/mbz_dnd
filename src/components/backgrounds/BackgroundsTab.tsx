import { useState, useEffect } from 'react'
import { background } from '../../data/backgrounds.json'
import BackgroundSummary from './BackgroundSummary'
import Select from 'react-select'

export interface BackgroundsTabProps {
	onChange: (val: string) => void
}

export default function BackgroundsTab(props: BackgroundsTabProps) {
	const { onChange } = props
	const [openSummary, setOpenSummary] = useState<string>('')
	const [skillsSelected, setSkillsSelected] = useState<any[]>([]) // Changed to an array
	const [langToolsSelected, setLangToolsSelected] = useState<any[]>([]) // Changed to an array
	const [equipmentArray, setEquipmentArray] = useState<string[]>([])
	const [equipmentType, setEquipmentType] = useState<string>('custom')
	const [selectedPremadeEquipment, setSelectedPremadeEquipment] =
		useState<any>(null) // Track the selected equipment

	useEffect(() => {
		// Find equipment when component mounts and update state
		const equipment = findEquipment(availableBackgrounds)

		setEquipmentArray(equipment) // Update the state with the found equipment
	}, [])

	const availableBackgrounds = background.filter(
		b =>
			b.source === 'PHB' &&
			b.name !== 'Custom Background' &&
			!b.name.includes('Variant')
	)

	function handleChange(val: string) {
		if (openSummary === val) {
			setOpenSummary('')
			onChange('')
		} else {
			setOpenSummary(val)
			onChange(val)
		}
	}

	//find all equipment packages
	function findEquipment(obj: any, equipmentList: string[] = []): string[] {
		for (const key in obj) {
			if (typeof obj[key] === 'object' && obj[key] !== null) {
				findEquipment(obj[key], equipmentList)
			} else if (key === 'name' && obj[key] === 'Equipment:') {
				const item = JSON.stringify(obj.entry)
				equipmentList.push(item)
			}
		}
		return equipmentList
	}

	// Handle multi-select for skills
	function handleSkillsSelect(selected: any) {
		if (selected.length <= 2) {
			setSkillsSelected(selected)
		}
	}

	// Handle multi-select for languages/tools
	function handleLangToolsSelect(selected: any) {
		if (selected.length <= 2) {
			setLangToolsSelected(selected)
		}
	}

	//handle custom starting equipment or from preexisting background
	function handleEquipmentPackageChange(e) {
		setEquipmentType(e.target.value)
	}

	// Handle equipment selection from premade list
	const handleEquipmentSelect = (selectedOption: any) => {
		setSelectedPremadeEquipment(selectedOption) // Update the selected equipment state
	}

	const availableSkills = [
		{ value: 'acrobatics', label: 'Acrobatics' },
		{ value: 'animal_handling', label: 'Animal Handling' },
		{ value: 'arcana', label: 'Arcana' },
		{ value: 'athletics', label: 'Athletics' },
		{ value: 'deception', label: 'Deception' },
		{ value: 'history', label: 'History' },
		{ value: 'insight', label: 'Insight' },
		{ value: 'intimidation', label: 'Intimidation' },
		{ value: 'medicine', label: 'Medicine' },
		{ value: 'nature', label: 'Nature' },
		{ value: 'perception', label: 'Perception' },
		{ value: 'performance', label: 'Performance' },
		{ value: 'persuasion', label: 'Persuasion' },
		{ value: 'religion', label: 'Religion' },
		{ value: 'sleight_of_hand', label: 'Sleight of Hand' },
		{ value: 'stealth', label: 'Stealth' },
		{ value: 'survival', label: 'Survival' },
	]

	const availableLangTools = [
		{ value: 'abyssal', label: 'Abyssal' },
		{ value: 'celestial', label: 'Celestial' },
		{ value: 'common', label: 'Common' },
		{ value: 'draconic', label: 'Draconic' },
		{ value: 'dwarvish', label: 'Dwarvish' },
		{ value: 'elvish', label: 'Elvish' },
		{ value: 'giant', label: 'Giant' },
		{ value: 'gnomish', label: 'Gnomish' },
		{ value: 'goblin', label: 'Goblin' },
		{ value: 'halfling', label: 'Halfling' },
		{ value: 'infernal', label: 'Infernal' },
		{ value: 'orc', label: 'Orc' },
		{ value: 'sylvan', label: 'Sylvan' },
		{ value: 'terran', label: 'Terran' },
		{ value: 'undercommon', label: 'Undercommon' },
		{ value: 'alchemist_supplies', label: 'Alchemist’s Supplies' },
		{ value: 'brewers_supplies', label: 'Brewer’s Supplies' },
		{ value: 'calligrapher_supplies', label: 'Calligrapher’s Supplies' },
		{ value: 'carpenter_tools', label: 'Carpenter’s Tools' },
		{ value: 'cartographer_tools', label: 'Cartographer’s Tools' },
		{ value: 'cobbler_tools', label: 'Cobbler’s Tools' },
		{ value: 'cook_tools', label: 'Cook’s Tools' },
		{ value: 'glassblower_tools', label: 'Glassblower’s Tools' },
		{ value: 'jewelers_tools', label: 'Jeweler’s Tools' },
		{ value: 'leatherworker_tools', label: 'Leatherworker’s Tools' },
		{ value: 'mason_tools', label: 'Mason’s Tools' },
		{ value: 'musical_instruments', label: 'Musical Instruments' },
		{ value: 'painters_supplies', label: 'Painter’s Supplies' },
		{ value: 'potters_tools', label: 'Potter’s Tools' },
		{ value: 'smith_tools', label: 'Smith’s Tools' },
		{ value: 'tinker_tools', label: 'Tinker’s Tools' },
		{ value: 'weavers_tools', label: 'Weaver’s Tools' },
		{ value: 'woodcarvers_tools', label: 'Woodcarver’s Tools' },
	]

	const combinedEquipmentArray =
		equipmentArray.length > 0
			? availableBackgrounds.map((bg, index) => {
					return {
						value: equipmentArray[index] || 'Default Equipment',
						label: bg.name,
					}
				})
			: []
	return (
		<>
			<form
				action=""
				style={{
					display: 'flex',
					flexDirection: 'column',
				}}>
				<label htmlFor="background-name">Name:</label>
				<input type="text" name="background-name" />

				<label htmlFor="skill-prof">Select 2 skill proficiencies</label>
				<Select
					isMulti
					value={skillsSelected}
					onChange={handleSkillsSelect}
					options={availableSkills}
					isSearchable
				/>

				<label htmlFor="lang-tools">
					Select 2 languages or tool proficiencies
				</label>
				<Select
					isMulti
					value={langToolsSelected}
					onChange={handleLangToolsSelect}
					options={availableLangTools}
					isSearchable
				/>

				<label htmlFor="custom-equipment-select">
					<input
						type="radio"
						value="custom"
						checked={equipmentType === 'custom'}
						onChange={handleEquipmentPackageChange}
					/>
					Fill out custom equipment
				</label>
				<label htmlFor="premade-equipment-select">
					<input
						type="radio"
						value="premade"
						checked={equipmentType === 'premade'}
						onChange={handleEquipmentPackageChange}
					/>
					Select from premade equipment packages
				</label>

				{equipmentType === 'custom' && <input type="text"></input>}
				{equipmentType === 'premade' && (
					<>
						<Select
							isSearchable
							options={combinedEquipmentArray}
							onChange={handleEquipmentSelect}></Select>
						{selectedPremadeEquipment && (
							<div style={{ marginTop: '10px' }}>
								<strong>Selected Equipment:</strong>{' '}
								{selectedPremadeEquipment.value}
							</div>
						)}
					</>
				)}

				{/* <label htmlFor="equipment">
					Select starting equipment from other premade backgrounds
				</label>
				<select name="equipment" id="" style={{ overflow: 'visible' }}>
					{equipmentArray.map((item, index) => (
						<option
							key={index}
							value={index}
							style={{ whiteSpace: 'normal', height: '6rem' }}>
							{item}
						</option>
					))}
				</select> */}
			</form>

			{/* <div
				className="character-background-tab-wrap"
				style={{ display: 'flex', flexDirection: 'column' }}>
				{availableBackgrounds.map(b => (
					<div
						key={b.name}
						style={{
							backgroundColor: 'grey',
							cursor: 'pointer',
							border: '3px solid',
							padding: '5px',
						}}
						onClick={() => handleChange(b.name)}>
						{b.name}
						{openSummary === b.name && (
							<BackgroundSummary background={b} />
						)}
					</div>
				))}
			</div> */}
		</>
	)
}
