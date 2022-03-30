type IProps = {
	letter: string;
};

const Letter = ({ letter }: IProps) => {
	return (
		<div className='border rounded-md flex items-center justify-center w-16 h-16'>
			<h2 className='font-semibold text-3xl'>{letter}</h2>
		</div>
	);
};

export default Letter;
