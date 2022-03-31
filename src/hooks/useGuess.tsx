import { useState } from 'react';

const useGuess = (): [string, React.Dispatch<React.SetStateAction<string>>] => {
	const [guess, setGuess] = useState<string>('');
	return [guess, setGuess];
};

export default useGuess;
