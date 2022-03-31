import { Fragment, useState } from 'react';

import { Dialog, Transition } from '@headlessui/react';

import useStore from '../../store';

const GameOverModal = () => {
	const { gameOver, newGame, answer } = useStore();
	const [showAnswer, setShowAnswer] = useState(true);

	const onNewGame = () => {
		setShowAnswer(false);

		setTimeout(() => {
			setShowAnswer(true);
		}, 1000);

		newGame();
	};

	return (
		<Transition appear show={gameOver} as={Fragment}>
			<Dialog
				as='div'
				className='fixed inset-0 z-10 overflow-y-auto'
				onClose={() => undefined}
			>
				<div className='min-h-screen px-4 text-center'>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<Dialog.Overlay className='fixed inset-0 backdrop-blur-md' />
					</Transition.Child>
					<span
						className='inline-block h-screen align-middle'
						aria-hidden='true'
					>
						&#8203;
					</span>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0 scale-95'
						enterTo='opacity-100 scale-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100 scale-100'
						leaveTo='opacity-0 scale-95'
					>
						<div className='inline-block w-full max-w-md my-8 overflow-hidden rounded-lg text-left align-middle transition-all transform bg-white shadow-2xl'>
							<Dialog.Title
								as='div'
								className='flex justify-between items-start p-5 border-b'
							>
								<h2 className='text-xl font-semibold text-gray-900 lg:text-2xl'>
									Game Over
								</h2>
							</Dialog.Title>
							<div className='p-5 space-y-6'>
								{showAnswer && (
									<p className='text-base leading-relaxed text-gray-500'>
										{`Answer: ${answer}`}
									</p>
								)}
							</div>
							<div className='flex items-center justify-center p-5 space-x-2'>
								<button
									type='button'
									className='inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
									onClick={onNewGame}
								>
									New Game
								</button>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	);
};

export default GameOverModal;
