import './App.css'
import CharacterBuilder from './components/CharacterBuilder'
import CharacterSummary from './components/CharacterSummary'
import { CharacterProvider } from './store/characterContext'

function App() {
	return (
		<CharacterProvider>
			<header className="site-header">
				<div className="container">MOUNTAIN BOYZ CHARACTER CREATOR</div>
			</header>
			<main>
				<div className="container">
					<div className="main-flex-wrap">
						<CharacterBuilder />
						<CharacterSummary />
					</div>
				</div>
			</main>
			<footer>
				<p>build it. you won't.</p>
			</footer>
		</CharacterProvider>
	)
}

export default App
