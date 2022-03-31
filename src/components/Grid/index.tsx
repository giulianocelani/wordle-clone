import { useEffect } from 'react';

import { useGuess } from '../../hooks';
import usePrevious from '../../hooks/usePrevious';
import useStore, { MAX_GUESSES } from '../../store';
import { MAX_WORD_LENGTH } from '../../utils';
import Guess from '../Guess';

const Grid = () => {
	const { alreadyGuessed, addGuess } = useStore();
	const guess = useGuess();
	const previousGuess = usePrevious(guess);

	useEffect(() => {
		if (guess.length === 0 && previousGuess?.length === MAX_WORD_LENGTH) {
			addGuess(previousGuess);
		}
	}, [guess]);

	let guesses = [...alreadyGuessed];

	if (guesses.length < MAX_GUESSES) {
		guesses.push({
			word: guess
		});
	}

	const numberOfGuessesRemaining = MAX_GUESSES - guesses.length;
	guesses = guesses.concat(Array(numberOfGuessesRemaining).fill(''));

	return (
		<div className='flex-1 flex flex-col items-center justify-start py-5 mx-auto'>
			<div className='grid grid-rows-6 gap-4'>
				{guesses.map((g, index) => (
					<Guess key={`guess-${index}`} guess={g} />
				))}
			</div>
		</div>
	);
};

export default Grid;
