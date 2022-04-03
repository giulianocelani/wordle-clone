import Keyboard from './components/Keyboard';
import { ErrorBoundary, GameOverModal, Grid } from './components';
import { useGuess } from './hooks';

const App = () => {
	const [guess, setGuess, addGuessLetter] = useGuess();

	return (
		<div className='container mx-auto overflow-hidden flex flex-col h-full'>
			<h1 className='text-5xl font-bold text-center my-4 pb-4 border-b flex-none'>
				Wordle Clone
			</h1>
			<ErrorBoundary>
				<Grid guess={guess} setGuess={setGuess} />
				<Keyboard onLetterPressed={addGuessLetter} />
			</ErrorBoundary>
			<GameOverModal />
		</div>
	);
};

export default App;
