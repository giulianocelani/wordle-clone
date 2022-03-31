import words from '../5-letters.json';

const MAX_WORD_LENGTH = 5;

enum LetterState {
	MISS = 'MISS',
	MATCH = 'MATCH',
	PRESENT = 'PRESENT'
}

function getRandomWord() {
	return words[Math.floor(Math.random() * words.length)].toUpperCase();
}

function evaluateGuess(answer: string, guess: string): LetterState[] {
	if (answer.length !== guess.length && guess.length !== MAX_WORD_LENGTH) {
		return [];
	}

	const result: LetterState[] = Array(MAX_WORD_LENGTH).fill(LetterState.MISS);

	const lettersToCheck = answer.split('');
	const guessLetters = guess.split('');

	guessLetters.forEach((_letter, i) => {
		if (answer[i] === guessLetters[i]) {
			result[i] = LetterState.MATCH;
			lettersToCheck.splice(i, 1);
		}
	});
	guessLetters.forEach((letter, i) => {
		if (lettersToCheck.includes(letter) && result[i] !== LetterState.MATCH) {
			result[i] = LetterState.PRESENT;
			lettersToCheck.splice(lettersToCheck.indexOf(letter), 1);
		}
	});

	return result;
}

export { evaluateGuess, getRandomWord, LetterState, MAX_WORD_LENGTH };
