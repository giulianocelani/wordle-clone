import words from '../5-letters.json';

const MAX_WORD_LENGTH = 5;

enum LetterStatus {
	MISS = 'MISS',
	MATCH = 'MATCH',
	EXISTS = 'EXISTS'
}

function getRandomWord() {
	return words[Math.floor(Math.random() * words.length)];
}

function evaluateGuess(answer: string, guesses: string[]): LetterStatus[][] {
	const results: LetterStatus[][] = [];

	const answerLetters = answer.split('');

	guesses.forEach((guess) => {
		const guessLetters = guess.split('');

		const guessResult: LetterStatus[] = [];
		guessLetters.forEach((letter, index) => {
			if (answerLetters[index] === letter) {
				guessResult.push(LetterStatus.MATCH);
			} else if (answerLetters.includes(letter)) {
				guessResult.push(LetterStatus.EXISTS);
			} else {
				guessResult.push(LetterStatus.MISS);
			}
		});

		results.push(guessResult);
	});

	return results;
}

export { evaluateGuess, getRandomWord, LetterStatus, MAX_WORD_LENGTH };
