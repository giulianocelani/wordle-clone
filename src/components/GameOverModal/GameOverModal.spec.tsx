import { act } from 'react-dom/test-utils';

import { waitFor } from '@testing-library/react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import useStore from '../../store';

import GameOverModal from '.';

describe('GameOverModal', () => {
	it('default renders correctly', async () => {
		act(() => {
			useStore.setState({ gameOver: true, answer: 'HELLO' });
		});

		const wrapper = shallow(<GameOverModal />);

		expect(toJson(wrapper, { mode: 'deep' })).toMatchSnapshot();
		expect(wrapper.find('button').text()).toBe('New Game');
		expect(wrapper.find('p').text()).toBe('Answer: HELLO');
	});

	it('gameOver on button click', async () => {
		act(() => {
			useStore.setState({ gameOver: true, answer: 'HELLO' });
		});

		const wrapper = shallow(<GameOverModal />);

		wrapper.find('button').simulate('click');

		await waitFor(() => {
			expect(useStore.getState().gameOver).toBe(false);
		});
	});
});
