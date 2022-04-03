import { LetterState } from '../utils';

const StateToColor: Record<LetterState, string> = {
	[LetterState.PRESENT]: 'bg-yellow-500 border-yellow-500',
	[LetterState.MATCH]: 'bg-green-500 border-green-500',
	[LetterState.MISS]: 'bg-gray-500 border-gray-500'
};

export default {
	StateToColor
};
