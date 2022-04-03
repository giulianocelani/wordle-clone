import Key from '../Key';

const KEYBOARD_KEYS = [
	['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
	['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
	['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace', 'Enter']
];

type IProps = {
	onLetterPressed: (letter: string) => void;
};

const Keyboard = ({ onLetterPressed }: IProps) => {
	return (
		<div className='flex-0 flex flex-col items-center py-5 mx-auto justify-end'>
			<div className='flex flex-col space-y-2 items-center'>
				{KEYBOARD_KEYS.map((row, rowIndex) => (
					<div
						key={rowIndex}
						className={`row-${
							rowIndex + 1
						} flex space-x-2 w-full items-center justify-center`}
					>
						{row.map((key, keyIndex) => (
							<Key
								key={`${rowIndex}-key-${keyIndex}`}
								letter={key}
								onClick={onLetterPressed}
							/>
						))}
					</div>
				))}
			</div>
		</div>
	);
};

export default Keyboard;
