import { evaluateGuess, getRandomWord, LetterStatus } from '../word.utils';

describe('word-utils', () => {
	describe('getRandomWord', () => {
		it('returns word with 5 letters', () => {
			const word = getRandomWord();
			expect(word.length).toBe(5);
		});
	});
	describe('evaluateGuess', () => {
		it('return all misses', () => {
			const result = evaluateGuess('HELLO', ['FIRST']);
			expect(result).toEqual([Array(5).fill(LetterStatus.MISS)]);
		});
		it('return all matches', () => {
			const result = evaluateGuess('HELLO', ['HELLO']);
			expect(result).toEqual([Array(5).fill(LetterStatus.MATCH)]);
		});
		it('return some matches, misses and exists', () => {
			const result = evaluateGuess('FIRST', ['FLOOR']);
			expect(result).toEqual([
				[
					LetterStatus.MATCH,
					LetterStatus.MISS,
					LetterStatus.MISS,
					LetterStatus.MISS,
					LetterStatus.EXISTS
				]
			]);
		});
		it('return some matches, misses and exists for multiple guesses', () => {
			const result = evaluateGuess('FIRST', ['FLOOR', 'FREAK']);
			expect(result).toEqual([
				[
					LetterStatus.MATCH,
					LetterStatus.MISS,
					LetterStatus.MISS,
					LetterStatus.MISS,
					LetterStatus.EXISTS
				],
				[
					LetterStatus.MATCH,
					LetterStatus.EXISTS,
					LetterStatus.MISS,
					LetterStatus.MISS,
					LetterStatus.MISS
				]
			]);
		});
	});
});
