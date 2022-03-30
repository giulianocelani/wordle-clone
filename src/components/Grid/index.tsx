import { evaluateGuess, getRandomWord } from '../../utils';
import Guess from '../Guess';

const MAX_GUESSES = 6;

type IProps = {
	answer: string;
};

const Grid = ({ answer }: IProps) => {
	const guesses = [getRandomWord()];
	const evaluation = evaluateGuess(answer, guesses);

	return (
		<div className='flex-1 flex items-start justify-center py-10'>
			<div className='grid grid-rows-6 gap-4'>
				{[...guesses, ...Array(MAX_GUESSES - guesses.length).fill(null)].map(
					(guess, index) => (
						<Guess
							key={`guess-${index}`}
							guess={guess}
							states={evaluation[index] || []}
						/>
					)
				)}
			</div>
		</div>
	);
};

export default Grid;
