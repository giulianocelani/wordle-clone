import { Fragment } from 'react';

import { Transition } from '@headlessui/react';

import { useNotification } from '../../hooks';

const InvalidNotification = () => {
	const { notification } = useNotification();

	return (
		<div
			aria-live='assertive'
			className='absolute left-1/2 -top-2 flex items-start px-4 py-6 pointer-events-none sm:p-6 -translate-x-1/2'
		>
			<div className='w-full flex flex-col items-center space-y-4 sm:items-end'>
				<Transition
					show={notification !== null}
					as={Fragment}
					enter='transform ease-out duration-300 transition'
					enterFrom='translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2'
					enterTo='translate-y-0 opacity-100 sm:translate-x-0'
					leave='transition ease-in duration-100'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<div className='bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden'>
						<div className='p-4'>
							<div className='flex items-center justify-center space-x-2'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='text-yellow-500 h-5 w-5'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
									strokeWidth='2'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
									/>
								</svg>
								<p className='text-sm'>
									{notification && notification.message}
								</p>
							</div>
						</div>
					</div>
				</Transition>
			</div>
		</div>
	);
};

export default InvalidNotification;
