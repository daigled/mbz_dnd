import { createContext } from 'react'

export const CharacterContext = createContext({
	race: '',
	class: '',
	background: '',
	skillProficiencies: [],
	toolProficiencies: [],
	languages: [],
})
