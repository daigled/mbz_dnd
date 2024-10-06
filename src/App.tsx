import { useState } from 'react'
import './App.css'
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
		<header className='site-header'>
			<div className="container">
				MOUNTAIN BOYZ CHARACTER CREATOR
			</div>
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
