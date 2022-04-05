import { Fragment } from 'react';

import { Dialog, Transition } from '@headlessui/react';

import useStore, { GameState } from '../../store';

const GameOverModal = () => {
	const { gameStatus, newGame, answer } = useStore();

	return (
		<Transition
			appear
			show={gameStatus.gameOver}
			as={gameStatus.state !== GameState.IN_PROGRESS ? Fragment : undefined}
		>
			<Dialog
				as='div'
				className='fixed inset-0 z-10 overflow-y-auto'
				onClose={() => undefined}
			>
				<div className='min-h-screen px-4 text-center'>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-500'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-500'
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
						enter='ease-out duration-1000'
						enterFrom='opacity-0 scale-95'
						enterTo='opacity-100 scale-100'
						leave='ease-in duration-1000'
						leaveFrom='opacity-100 scale-100'
						leaveTo='opacity-0 scale-95'
					>
						<div className='p-4 space-y-5 inline-block w-full max-w-md my-8 overflow-hidden rounded-lg text-left align-middle transition-all transform bg-white shadow-2xl'>
							<Dialog.Title
								as='div'
								className='flex justify-center items-center'
							>
								{gameStatus.state === GameState.WON && (
									<div className='rounded-full p-3 bg-green-100'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											className='text-green-600 h-8 w-8'
											fill='none'
											viewBox='0 0 24 24'
											stroke='currentColor'
											strokeWidth='2'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
											/>
										</svg>
									</div>
								)}
								{gameStatus.state === GameState.LOST && (
									<div className='rounded-full p-3 bg-red-100'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											className='text-red-600 h-8 w-8'
											fill='none'
											viewBox='0 0 24 24'
											stroke='currentColor'
											strokeWidth='2'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
											/>
										</svg>
									</div>
								)}
							</Dialog.Title>
							<div className='flex justify-center items-center flex-col space-y-3'>
								<h1 className='text-2xl font-semibold text-gray-900 lg:text-2xl'>
									{`You ${
										gameStatus.state === GameState.WON ? 'guessed it' : 'Lost'
									}`}
								</h1>
								{gameStatus.state === GameState.LOST && (
									<p className='text-sm leading-relaxed text-gray-500'>
										The correct answer was
										<span className='font-bold'>{` ${answer}`}</span>
									</p>
								)}
							</div>
							<div className='flex items-center justify-center space-x-2'>
								<button
									type='button'
									className='w-full inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500'
									onClick={newGame}
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
