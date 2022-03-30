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
	const result: LetterState[] = [];

	const answerLetters = answer.split('');
	const guessLetters = guess.split('');

	guessLetters.forEach((letter, index) => {
		if (answerLetters[index] === letter) {
			result.push(LetterState.MATCH);
		} else if (answerLetters.includes(letter)) {
			result.push(LetterState.PRESENT);
		} else {
			result.push(LetterState.MISS);
		}
	});

	return result;
}

export { evaluateGuess, getRandomWord, LetterState, MAX_WORD_LENGTH };
