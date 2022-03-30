import { LetterStatus, MAX_WORD_LENGTH } from '../../utils';
import Letter from '../Letter';

type IProps = {
	guess: string;
	states: LetterStatus[];
};

const Guess = ({ guess, states }: IProps) => {
	const letters = guess ? guess.split('') : [];

	return (
		<div className='grid grid-cols-5 gap-4'>
			{[...letters, ...Array(MAX_WORD_LENGTH - letters.length).fill(null)].map(
				(letter, index) => (
					<Letter
						key={`guess-${index}`}
						letter={letter}
						state={states[index] || []}
					/>
				)
			)}
		</div>
	);
};

export default Guess;
