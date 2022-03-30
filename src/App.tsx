import { Grid } from './components';

const App = () => {
	return (
		<div className='container mx-auto overflow-hidden flex flex-col h-full'>
			<h1 className='text-5xl font-bold text-center my-4 pb-4 border-b flex-none'>
				Wordle Clone
			</h1>
			<Grid />
		</div>
	);
};

export default App;
