import { useState } from 'react'
import './App.css'
import Tabs from './components/Tabs'
import RaceTab from './components/RaceTab'
import CharacterBuilder from './components/CharacterBuilder'
import CharacterSummary from './components/CharacterSummary'

interface Character {
	race: string
	subrace: string
	class: string
}

function App() {
	const defaultCharacter: Character = {
		race: '',
		subrace: '',
		class: '',
	}

	const [character, setCharacter] = useState(defaultCharacter)

	return (
		<>
			<div className="container">
				<div className="main-flex-wrap">
					<CharacterBuilder
						character={character}
						setCharacter={setCharacter}
					/>
					<CharacterSummary character={character} />
				</div>
			</div>
		</>
	)
}

export default App
