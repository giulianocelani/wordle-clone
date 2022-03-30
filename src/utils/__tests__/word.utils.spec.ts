import { evaluateGuess, getRandomWord, LetterState } from '../word.utils';

describe('word-utils', () => {
	describe('getRandomWord', () => {
		it('returns word with 5 letters', () => {
			const word = getRandomWord();
			expect(word.length).toBe(5);
		});
	});
	describe('evaluateGuess', () => {
		it('return all misses', () => {
			const result = evaluateGuess('HELLO', 'FIRST');
			expect(result).toEqual(Array(5).fill(LetterState.MISS));
		});
		it('return all matches', () => {
			const result = evaluateGuess('HELLO', 'HELLO');
			expect(result).toEqual(Array(5).fill(LetterState.MATCH));
		});
		it('return some matches, misses and exists', () => {
			const result = evaluateGuess('FIRST', 'FLOOR');
			expect(result).toEqual([
				LetterState.MATCH,
				LetterState.MISS,
				LetterState.MISS,
				LetterState.MISS,
				LetterState.PRESENT
			]);
		});
	});
});
