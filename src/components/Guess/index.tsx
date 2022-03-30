import Letter from '../Letter';

const MAX_GUESS_LENGTH = 5;

type IProps = {
	guess: string;
};

const Guess = ({ guess }: IProps) => {
	const letters = guess ? guess.split('') : [];

	return (
		<div className='grid grid-cols-5 gap-4'>
			{[...letters, ...Array(MAX_GUESS_LENGTH - letters.length).fill('')].map(
				(letter, index) => (
					// eslint-disable-next-line react/no-array-index-key
					<Letter key={`guess-${index}`} letter={letter} />
				)
			)}
		</div>
	);
};

export default Guess;
