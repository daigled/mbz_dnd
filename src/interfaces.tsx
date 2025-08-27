export interface Race {
	name: string
	source: string
	page: number
	srd: string | boolean
	size: string | any[]
	speed: number | { [key: string]: number }
	age: string | object
	soundClip: string | object
	entries: string | any[]
	hasFluff: string | boolean
	hasFluffImages: string | boolean

	// optional fields
	ability?: string | any[]
	heightAndWeight?: string | object
	traitTags?: string | any[]
	resist?: string | any[]
	basicRules?: string | boolean
	darkvision?: string | number
	lanuguageProficiencies?: any[]
	skillProficiencies?: any[]
	toolProficiencies?: any[]
	weaponProficiencies?: any[]
	additionalSpells?: any[]
	subraces?: any[]
}

export interface Background {
	name: string
	source: string
	skillProficiencies: string
	languageProficiencies?: string | any[]
	startingEquipment: string | any[]
	toolProficiencies?: string | any[]
	entries: any[]
}

export interface CharacterAbilityScores {
	str: number
	dex: number
	con: number
	int: number
	wis: number
	cha: number
}

export interface ClassLevel {
	className: string
	level: number
	selectedSkills: Array<string>
	selectedFeatures: { [featureName: string]: any }
	selectedSubclass?: string
}

export interface Character {
	race: string
	subrace: string
	class: string // Primary class name
	classLevel: number // Primary class level
	classLevels: Array<ClassLevel>
	totalLevel: number
	abilityScores: CharacterAbilityScores // Base ability scores from rolling/point buy
	racialAbilityBonuses: CharacterAbilityScores // Bonuses from race/subrace
	background: string
	skillProficiencies: Array<string>
	toolProficiencies: Array<string>
	languages: Array<string>
	savingThrowProficiencies: Array<string>
	armorProficiencies: Array<string>
	weaponProficiencies: Array<string>
	racialChoices?: {
		selectedSkills?: Array<string>
		selectedLanguages?: Array<string>
		selectedAbilityScores?: { [key: string]: number }
	}
}
