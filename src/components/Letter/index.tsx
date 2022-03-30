import { LetterState } from '../../utils';

type IProps = {
	letter: string;
	state?: LetterState;
};

const StateToColorMapping: Record<LetterState, string> = {
	[LetterState.PRESENT]: 'bg-yellow-500 border-yellow-500',
	[LetterState.MATCH]: 'bg-green-500 border-green-500',
	[LetterState.MISS]: 'bg-red-500 border-red-500'
};

const Letter = ({ letter, state }: IProps) => {
	return (
		<div
			className={`border rounded-md flex items-center justify-center w-16 h-16 ${
				state ? StateToColorMapping[state] : ''
			}`}
		>
			<h2 className={`font-semibold text-3xl ${state ? 'text-white' : ''}`}>
				{letter}
			</h2>
		</div>
	);
};

Letter.defaultProps = {
	state: undefined
};

export default Letter;
