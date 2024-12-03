import { useState } from 'react'
import './App.css'
import CharacterBuilder from './components/CharacterBuilder'
import CharacterSummary from './components/CharacterSummary'
import { Character } from './interfaces'
import { CharacterContext } from './store/character-context'

function App() {
	const defaultCharacter: Character = {
		race: '',
		subrace: '',
		class: '',
		abilityScores: {
			str: -1,
			dex: -1,
			con: -1,
			int: -1,
			wis: -1,
			cha: -1,
		},
		background: '',
		skillProficiencies: [],
		toolProficiencies: [],
		languages: [],
	}

	const [character, setCharacter] = useState(defaultCharacter)

	return (
		<>
			<header className="site-header">
				<div className="container">MOUNTAIN BOYZ CHARACTER CREATOR</div>
			</header>
			<main>
				<div className="container">
					<div className="main-flex-wrap">
						<CharacterBuilder
							character={character}
							setCharacter={setCharacter}
						/>
						<CharacterSummary character={character} />
					</div>
				</div>
			</main>
			<footer>
				<p>build it. you won't.</p>
			</footer>
		</>
	)
}

export default App
