import { getRandomWord } from '../../utils';
import Guess from '../Guess';

const MAX_GUESSES = 6;

const Grid = () => {
	const guesses = [getRandomWord()];

	return (
		<div className='flex-1 flex items-start justify-center py-10'>
			<div className='grid grid-rows-6 gap-4'>
				{[...guesses, ...Array(MAX_GUESSES - guesses.length)].map(
					(guess, index) => (
						// eslint-disable-next-line react/no-array-index-key
						<Guess key={`guess-${index}`} guess={guess} />
					)
				)}
			</div>
		</div>
	);
};

export default Grid;
