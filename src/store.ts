import create from 'zustand';
import { persist } from 'zustand/middleware';

import { evaluateGuess, getRandomWord, LetterState } from './utils';

export type IGuess = {
	word: string;
	state?: LetterState[];
};

type IStoreState = {
	answer: string;
	alreadyGuessed: IGuess[];
	addGuess: (guess: string) => void;
};

const useStore = create<IStoreState>(
	persist(
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		(set, _get) => ({
			answer: getRandomWord(),
			alreadyGuessed: [],
			addGuess: (guess: string) =>
				set((state) => {
					const evaluatedGuess = evaluateGuess(state.answer, guess);
					return {
						alreadyGuessed: [
							...state.alreadyGuessed,
							{
								word: guess,
								state: evaluatedGuess
							}
						]
					};
				})
		}),
		{
			name: 'wordle-clone-storage'
		}
	)
);

// useStore.persist.clearStorage();

export default useStore;
