import { useEffect, useState } from 'react';

import { useGuess } from '../../hooks';
import usePrevious from '../../hooks/usePrevious';
import useStore, { MAX_GUESSES } from '../../store';
import { isValidWord, MAX_WORD_LENGTH } from '../../utils';
import Guess from '../Guess';

type IState = {
	isGuessInvalid: boolean;
};

const INITIAL_STATE: IState = {
	isGuessInvalid: false
};

const Grid = () => {
	const [{ isGuessInvalid }, setState] = useState(INITIAL_STATE);
	const { alreadyGuessed, addGuess } = useStore();
	const [guess, setGuess] = useGuess();
	const previousGuess = usePrevious(guess);

	useEffect(() => {
		if (guess.length === 0 && previousGuess?.length === MAX_WORD_LENGTH) {
			if (isValidWord(previousGuess)) {
				setState({ isGuessInvalid: false });
				addGuess(previousGuess);
			} else {
				setState({ isGuessInvalid: true });
				setGuess(previousGuess);
			}
		}
	}, [guess]);

	useEffect(() => {
		let timeout: NodeJS.Timeout;
		if (isGuessInvalid) {
			timeout = setTimeout(() => {
				setState({ isGuessInvalid: false });
			}, 1000);
		}
		return () => {
			clearTimeout(timeout);
		};
	}, [isGuessInvalid]);

	let guesses = [...alreadyGuessed];
	let currentRow = 0;

	if (guesses.length < MAX_GUESSES) {
		currentRow =
			guesses.push({
				word: guess
			}) - 1;
	}

	const numberOfGuessesRemaining = MAX_GUESSES - guesses.length;
	guesses = guesses.concat(Array(numberOfGuessesRemaining).fill(''));

	return (
		<div className='flex-1 flex flex-col items-center justify-start py-5 mx-auto'>
			<div className='grid grid-rows-6 gap-4'>
				{guesses.map((g, index) => (
					<Guess
						key={`guess-${index}`}
						guess={g}
						isInvalid={isGuessInvalid && index === currentRow}
					/>
				))}
			</div>
		</div>
	);
};

export default Grid;
