import { useEffect, useState } from 'react';

import { MAX_WORD_LENGTH } from '../utils';

const useGuess = (): [string, React.Dispatch<React.SetStateAction<string>>] => {
	const [guess, setGuess] = useState<string>('');

	const onKeyDown = (event: KeyboardEvent) => {
		setGuess((prevGuess) => {
			if (event.key === 'Backspace') {
				return prevGuess.slice(0, -1);
			}
			if (event.key === 'Enter' && prevGuess.length === MAX_WORD_LENGTH) {
				return '';
			}
			if (
				(event.keyCode >= 65 && event.keyCode <= 90) ||
				(event.keyCode >= 97 && event.keyCode <= 122)
			) {
				const letter = event.key.toUpperCase();
				const newGuess = prevGuess + letter;
				if (newGuess.length <= MAX_WORD_LENGTH) {
					return newGuess;
				}
			}
			return prevGuess;
		});
	};

	useEffect(() => {
		window.addEventListener('keydown', onKeyDown);
		return () => {
			window.removeEventListener('keydown', onKeyDown);
		};
	}, []);

	return [guess, setGuess];
};

export default useGuess;
