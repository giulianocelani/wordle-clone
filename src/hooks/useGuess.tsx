import { useEffect, useState } from 'react';

import { MAX_WORD_LENGTH } from '../utils';

const useGuess = (): [
	string,
	React.Dispatch<React.SetStateAction<string>>,
	(letter: string) => void
] => {
	const [guess, setGuess] = useState<string>('');

	const addGuessLetter = (letter: string): void => {
		setGuess((prevGuess) => {
			if (letter === 'Backspace') {
				return prevGuess.slice(0, -1);
			}
			if (letter === 'Enter' && prevGuess.length === MAX_WORD_LENGTH) {
				return '';
			}
			const newGuess = prevGuess + letter.toUpperCase();
			if (newGuess.length <= MAX_WORD_LENGTH) {
				return newGuess;
			}
			return prevGuess;
		});
	};

	const onKeyDown = (event: KeyboardEvent) => {
		if (
			event.key === 'Backspace' ||
			event.key === 'Enter' ||
			(event.keyCode >= 65 && event.keyCode <= 90) ||
			(event.keyCode >= 97 && event.keyCode <= 122)
		) {
			addGuessLetter(event.key);
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', onKeyDown);
		return () => {
			window.removeEventListener('keydown', onKeyDown);
		};
	}, []);

	console.log(guess);

	return [guess, setGuess, addGuessLetter];
};

export default useGuess;
