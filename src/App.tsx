import { useState } from 'react'
import './App.css'
import CharacterBuilder from './components/CharacterBuilder'
import CharacterSummary from './components/CharacterSummary'
import { Character } from './interfaces'

function App() {
	const defaultCharacter: Character = {
		race: '',
		subrace: '',
		class: '',
		attributes: {
			str: -1,
			dex: -1,
			con: -1,
			int: -1,
			wis: -1,
			cha: -1,
		},
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
