import { ErrorBoundary, Grid } from './components';
import { getRandomWord } from './utils';

const answer = getRandomWord();

const App = () => {
	return (
		<div className='container mx-auto overflow-hidden flex flex-col h-full'>
			<h1 className='text-5xl font-bold text-center my-4 pb-4 border-b flex-none'>
				Wordle Clone
			</h1>
			<ErrorBoundary>
				<p className='text-sm font-medium flex-none text-center'>
					Answer:
					<span className='ml-1 font-light'>{answer}</span>
				</p>
				<Grid answer={answer} />
			</ErrorBoundary>
		</div>
	);
};

export default App;
