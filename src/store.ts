import CryptoJS from 'crypto-js';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import { evaluateGuess, getRandomWord, LetterState } from './utils';

const secret = CryptoJS.enc.Utf8.parse(process.env.REACT_APP_SECRET || '');

export const MAX_GUESSES = 6;

export type IGuess = {
	word: string;
	state?: LetterState[];
};

export type IStoreState = {
	answer: string;
	alreadyGuessed: IGuess[];
	keysPressed: Record<string, LetterState>;
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
			keysPressed: {},
			addGuess: (guess: string) =>
				set((state) => {
					const evaluatedGuess = evaluateGuess(state.answer, guess);

					const _keysPressed = { ...state.keysPressed };
					evaluatedGuess.forEach((letterState, index) => {
						_keysPressed[guess[index]] = letterState;
					});

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
						],
						keysPressed: _keysPressed
					};
				}),
			newGame: () =>
				set(() => ({
					answer: getRandomWord(),
					alreadyGuessed: [],
					gameOver: false,
					keysPressed: {}
				}))
		}),
		{
			name: 'wordle-clone-storage',
			serialize: (state) => {
				return CryptoJS.AES.encrypt(JSON.stringify(state), secret, {
					keySize: 128 / 8,
					iv: secret,
					mode: CryptoJS.mode.CBC,
					padding: CryptoJS.pad.Pkcs7
				}).toString();
			},
			deserialize: (state) => {
				return JSON.parse(
					CryptoJS.enc.Utf8.stringify(
						CryptoJS.AES.decrypt(state, secret, {
							keySize: 128 / 8,
							iv: secret,
							mode: CryptoJS.mode.CBC,
							padding: CryptoJS.pad.Pkcs7
						})
					)
				);
			}
		}
	)
);

// useStore.persist.clearStorage();

export default useStore;
