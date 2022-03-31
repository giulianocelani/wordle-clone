import create from 'zustand';
import { persist } from 'zustand/middleware';

import { evaluateGuess, getRandomWord, LetterState } from './utils';

export const MAX_GUESSES = 6;

export type IGuess = {
	word: string;
	state?: LetterState[];
};

export type IStoreState = {
	answer: string;
	alreadyGuessed: IGuess[];
	addGuess: (guess: string) => void;
	gameOver: boolean;
	newGame: () => void;
};

const useStore = create<IStoreState>(
	persist(
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		(set, _get) => ({
			answer: getRandomWord(),
			alreadyGuessed: [],
			gameOver: false,
			addGuess: (guess: string) =>
				set((state) => {
					const evaluatedGuess = evaluateGuess(state.answer, guess);
					return {
						gameOver:
							state.alreadyGuessed.length + 1 === MAX_GUESSES ||
							evaluatedGuess.every((s) => s === LetterState.MATCH),
						alreadyGuessed: [
							...state.alreadyGuessed,
							{
								word: guess,
								state: evaluatedGuess
							}
						]
					};
				}),
			newGame: () =>
				set(() => ({
					answer: getRandomWord(),
					alreadyGuessed: [],
					gameOver: false
				}))
		}),
		{
			name: 'wordle-clone-storage'
		}
	)
);

// useStore.persist.clearStorage();

export default useStore;
