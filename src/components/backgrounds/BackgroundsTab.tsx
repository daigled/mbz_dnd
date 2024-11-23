import { useState, useEffect, useMemo } from 'react'
import { background } from '../../data/backgrounds.json'
import Select from 'react-select'

export interface BackgroundsTabProps {
	onChange: (val: string) => void
}

export default function BackgroundsTab(props: BackgroundsTabProps) {
	const { onChange } = props

	const [skillsSelected, setSkillsSelected] = useState<any[]>([])
	const [langToolsSelected, setLangToolsSelected] = useState<any[]>([])

	// Consolidated state for equipment and features
	const [selectedPackage, setSelectedPackage] = useState<{
		equipmentType: string
		featureType: string
		selectedPremadeEquipment: any | null
		selectedPremadeFeature: any | null
	}>({
		equipmentType: 'custom',
		featureType: 'custom',
		selectedPremadeEquipment: null,
		selectedPremadeFeature: null,
	})

	const [equipmentArray, setEquipmentArray] = useState<string[]>([])
	const [featureArray, setFeatureArray] = useState<string[]>([])

	useEffect(() => {
		// Find equipment and features when component mounts
		const [equipment, features] = findEquipment(availableBackgrounds)
		setEquipmentArray(equipment)
		setFeatureArray(features)
	}, [])

	const availableBackgrounds = background.filter(
		b =>
			b.source === 'PHB' &&
			b.name !== 'Custom Background' &&
			!b.name.includes('Variant')
	)

	function findEquipment(
		obj: any,
		equipmentList: string[] = [],
		featureList: string[] = []
	): [string[], string[]] {
		for (const key in obj) {
			if (typeof obj[key] === 'object' && obj[key] !== null) {
				findEquipment(obj[key], equipmentList, featureList)
			} else if (key === 'name' && obj[key] === 'Equipment:') {
				equipmentList.push(obj.entry)
			} else if (key === 'name' && obj[key].includes('Feature:')) {
				featureList.push(obj.entries)
			}
		}
		return [equipmentList, featureList]
	}

	// Handle multi-select for skills
	function handleSkillsSelect(selected: any) {
		if (selected.length <= 2) setSkillsSelected(selected)
	}

	// Handle multi-select for languages/tools
	function handleLangToolsSelect(selected: any) {
		if (selected.length <= 2) setLangToolsSelected(selected)
	}

	// Handle package type changes (equipment or feature)
	// Handle package type changes (equipment or feature)
	function handlePackageChange(type: 'equipment' | 'feature', value: string) {
		// Reset selected premade values when switching between types
		setSelectedPackage(prev => ({
			...prev,
			[`${type}Type`]: value,
			[`selectedPremade${capitalizeFirstLetter(type)}`]: null, // Clear selected package
		}))
	}

	// Handle selecting equipment or feature from premade list
	const handleSelectPackage = (
		type: 'equipment' | 'feature',
		selectedOption: any
	) => {
		setSelectedPackage(prev => ({
			...prev,
			[`selectedPremade${capitalizeFirstLetter(type)}`]: selectedOption,
		}))
	}

	const capitalizeFirstLetter = (str: string) =>
		str.charAt(0).toUpperCase() + str.slice(1)

	// Memoized combined options to avoid unnecessary recalculations on every render
	const combinedEquipmentArray = useMemo(
		() =>
			equipmentArray.map((item, index) => ({
				value: item || 'Default Equipment',
				label:
					availableBackgrounds[index]?.name || 'Unknown Background',
			})),
		[equipmentArray, availableBackgrounds]
	)

	const combinedFeatureArray = useMemo(
		() =>
			featureArray.map((item, index) => ({
				value: item || 'Default Feature',
				label:
					availableBackgrounds[index]?.name || 'Unknown Background',
			})),
		[featureArray, availableBackgrounds]
	)

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

	return (
		<form action="" style={{ display: 'flex', flexDirection: 'column' }}>
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

			<div>
				<label htmlFor="equipment-select">
					Select Equipment Package:
				</label>
				<div>
					<input
						type="radio"
						value="custom"
						checked={selectedPackage.equipmentType === 'custom'}
						onChange={() =>
							handlePackageChange('equipment', 'custom')
						}
					/>
					Fill out custom equipment
					<input
						type="radio"
						value="premade"
						checked={selectedPackage.equipmentType === 'premade'}
						onChange={() =>
							handlePackageChange('equipment', 'premade')
						}
					/>
					Select from premade equipment packages
				</div>

				{selectedPackage.equipmentType === 'custom' && (
					<input type="text" />
				)}
				{selectedPackage.equipmentType === 'premade' && (
					<>
						<Select
							isSearchable
							options={combinedEquipmentArray}
							onChange={selectedOption =>
								handleSelectPackage('equipment', selectedOption)
							}
						/>
						{selectedPackage.selectedPremadeEquipment && (
							<div style={{ marginTop: '10px' }}>
								<strong>Selected Equipment:</strong>{' '}
								{selectedPackage.selectedPremadeEquipment.value}
							</div>
						)}
					</>
				)}
			</div>

			<div>
				<label htmlFor="feature-select">Select Feature Package:</label>
				<div>
					<input
						type="radio"
						value="custom"
						checked={selectedPackage.featureType === 'custom'}
						onChange={() =>
							handlePackageChange('feature', 'custom')
						}
					/>
					Fill out custom feature
					<input
						type="radio"
						value="premade"
						checked={selectedPackage.featureType === 'premade'}
						onChange={() =>
							handlePackageChange('feature', 'premade')
						}
					/>
					Select from premade features
				</div>

				{selectedPackage.featureType === 'custom' && (
					<input type="text" />
				)}
				{selectedPackage.featureType === 'premade' && (
					<>
						<Select
							isSearchable
							options={combinedFeatureArray}
							onChange={selectedOption =>
								handleSelectPackage('feature', selectedOption)
							}
						/>
						{selectedPackage.selectedPremadeFeature && (
							<div style={{ marginTop: '10px' }}>
								<strong>Selected Feature:</strong>{' '}
								{selectedPackage.selectedPremadeFeature.value}
							</div>
						)}
					</>
				)}
			</div>
		</form>
	)
}
