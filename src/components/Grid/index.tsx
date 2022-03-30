import { useState } from 'react';

import { evaluateGuess } from '../../utils';
import Guess from '../Guess';

const MAX_GUESSES = 6;

type IProps = {
	answer: string;
};

type IState = {
	guesses: string[];
};

const INITIAL_STATE: IState = {
	guesses: []
};

const Grid = ({ answer }: IProps) => {
	const [{ guesses }, setState] = useState<IState>(INITIAL_STATE);
	const evaluation = evaluateGuess(answer, guesses);

	return (
		<div className='flex-1 flex items-start justify-center py-10'>
			<div className='grid grid-rows-6 gap-4'>
				{[...guesses, ...Array(MAX_GUESSES - guesses.length).fill('')].map(
					(guess, index) => (
						<Guess
							key={`guess-${index}`}
							guess={guess}
							states={evaluation[index] || []}
						/>
					)
				)}
			</div>
		</div>
	);
};

export default Grid;
