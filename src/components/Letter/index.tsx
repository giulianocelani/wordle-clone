import { mappings } from '../../constants';
import useStore from '../../store';
import { LetterState } from '../../utils';

type IProps = {
	letter: string;
	state?: LetterState;
};

const Letter = ({ letter, state }: IProps) => {
	const { keysPressed } = useStore();

	const getWrapperStyle = () => {
		const styles: string[] = [];
		if (state) {
			styles.push(mappings.StateToColor[state]);
		} else if (keysPressed[letter] === LetterState.MISS) {
			styles.push('bg-gray-100 border-gray-100');
		}
		return styles.join(' ');
	};

	return (
		<div
			className={`border rounded-md flex items-center justify-center ${getWrapperStyle()}`}
		>
			<h2
				className={`font-semibold text-xl md:text-2xl lg:text-3xl ${
					state || keysPressed[letter] === LetterState.MISS ? 'text-white' : ''
				}`}
			>
				{letter}
			</h2>
		</div>
	);
};

Letter.defaultProps = {
	state: undefined
};

export default Letter;
