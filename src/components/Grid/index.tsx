import { useState } from 'react';

import useStore from '../../store';
import { MAX_WORD_LENGTH } from '../../utils';
import Guess from '../Guess';

const MAX_GUESSES = 6;

type IState = {
	currentGuess: string;
};

const INITIAL_STATE: IState = {
	currentGuess: ''
};

const Grid = () => {
	const [{ currentGuess }, setState] = useState<IState>(INITIAL_STATE);
	const { alreadyGuessed, addGuess } = useStore();

	const onGuessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		const value = e.target.value.toUpperCase();
		setState((prevState) => ({
			...prevState,
			currentGuess: value
		}));
	};

	const onGuess = () => {
		addGuess(currentGuess);
		setState((prevState) => ({
			...prevState,
			currentGuess: ''
		}));
	};

	let guesses = [...alreadyGuessed];

	if (guesses.length < MAX_GUESSES) {
		guesses.push({
			word: currentGuess
		});
	}

	const numberOfGuessesRemaining = MAX_GUESSES - guesses.length;
	guesses = guesses.concat(Array(numberOfGuessesRemaining).fill(''));

	return (
		<div className='flex-1 flex flex-col items-center justify-start py-10 mx-auto'>
			<div className='mb-6 w-full flex space-x-2'>
				<input
					type='text'
					id='guess'
					className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
					required
					value={currentGuess}
					onChange={onGuessChange}
					autoComplete='off'
					maxLength={MAX_WORD_LENGTH}
					disabled={numberOfGuessesRemaining === 0}
				/>
				<button
					type='button'
					className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center disabled:bg-gray-300'
					onClick={onGuess}
					disabled={currentGuess.length < MAX_WORD_LENGTH}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-5 w-5'
						viewBox='0 0 20 20'
						fill='currentColor'
					>
						<path
							fillRule='evenodd'
							d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
							clipRule='evenodd'
						/>
					</svg>
				</button>
			</div>
			<div className='grid grid-rows-6 gap-4'>
				{guesses.map((guess, index) => (
					<Guess key={`guess-${index}`} guess={guess} />
				))}
			</div>
		</div>
	);
};

export default Grid;
