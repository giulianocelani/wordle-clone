import { useEffect, useState } from 'react';

import { usePrevious } from '../../hooks';
import useStore, { MAX_GUESSES } from '../../store';
import { isValidWord, MAX_WORD_LENGTH } from '../../utils';
import Guess from '../Guess';

type IState = {
	isGuessInvalid: boolean;
};

const INITIAL_STATE: IState = {
	isGuessInvalid: false
};

type IProps = {
	guess: string;
	setGuess: React.Dispatch<React.SetStateAction<string>>;
};

const Grid = ({ guess, setGuess }: IProps) => {
	const [{ isGuessInvalid }, setState] = useState(INITIAL_STATE);
	const { alreadyGuessed, addGuess } = useStore();
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
		<div className='flex-1 flex flex-col items-center justify-center py-5 px-4 mx-auto w-10/12 md:1/3 lg:w-1/2 xl:w-1/3'>
			<div className='w-full h-full max-h-[75%] md:max-h-full grid grid-rows-6 gap-2'>
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
