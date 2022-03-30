import { IGuess } from '../../store';
import { MAX_WORD_LENGTH } from '../../utils';
import Letter from '../Letter';

type IProps = {
	guess: IGuess;
};

const Guess = ({ guess }: IProps) => {
	const letters = guess.word ? guess.word.split('') : [];

	const letterList = [
		...letters,
		...Array(MAX_WORD_LENGTH - letters.length).fill('')
	];

	return (
		<div className='grid grid-cols-5 gap-4'>
			{letterList.map((letter, index) => (
				<Letter
					key={`letter-${index}`}
					letter={letter}
					state={guess.state && guess.state[index]}
				/>
			))}
		</div>
	);
};

export default Guess;
