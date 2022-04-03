type IProps = {
	letter: string;
	onClick: (letter: string) => void;
};

const Key = ({ letter, onClick }: IProps) => {
	const handleOnClick = () => {
		if (typeof letter === 'string') {
			onClick(letter);
		} else {
			onClick('Backspace');
		}
	};

	return (
		<button
			type='button'
			onClick={handleOnClick}
			className={`flex items-center justify-center p-2 border rounded-md text-xl font-semibold hover:cursor-pointer hover:border-gray-400 transition-colors ${
				(typeof letter === 'string' && letter.length === 1) ||
				letter === 'Backspace'
					? 'w-12 h-12'
					: ''
			}`}
		>
			{letter === 'Backspace' ? (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='h-6'
					viewBox='0 0 20 20'
					fill='currentColor'
				>
					<path
						fillRule='evenodd'
						d='M6.707 4.879A3 3 0 018.828 4H15a3 3 0 013 3v6a3 3 0 01-3 3H8.828a3 3 0 01-2.12-.879l-4.415-4.414a1 1 0 010-1.414l4.414-4.414zm4 2.414a1 1 0 00-1.414 1.414L10.586 10l-1.293 1.293a1 1 0 101.414 1.414L12 11.414l1.293 1.293a1 1 0 001.414-1.414L13.414 10l1.293-1.293a1 1 0 00-1.414-1.414L12 8.586l-1.293-1.293z'
						clipRule='evenodd'
					/>
				</svg>
			) : (
				letter
			)}
		</button>
	);
};

export default Key;
