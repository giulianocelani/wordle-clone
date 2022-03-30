import words from '../5-letters.json';

const MAX_WORD_LENGTH = 5;

function getRandomWord() {
	return words[Math.floor(Math.random() * words.length)];
}

export { getRandomWord, MAX_WORD_LENGTH };
