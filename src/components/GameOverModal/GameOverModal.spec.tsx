import { act } from 'react-dom/test-utils';

import { waitFor } from '@testing-library/react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import useStore, { GameState } from '../../store';

import GameOverModal from '.';

describe('GameOverModal', () => {
	it('renders correctly with WON state', async () => {
		act(() => {
			useStore.setState({
				gameStatus: {
					gameOver: true,
					state: GameState.WON
				},
				answer: 'HELLO'
			});
		});

		const wrapper = shallow(<GameOverModal />);

		expect(toJson(wrapper, { mode: 'deep' })).toMatchSnapshot();

		expect(wrapper.props().show).toBe(true);

		expect(wrapper.find('button').text()).toBe('New Game');
		expect(wrapper.find('h1').text()).toBe('You guessed it');
	});

	it('renders correctly with LOST state', async () => {
		act(() => {
			useStore.setState({
				gameStatus: {
					gameOver: true,
					state: GameState.LOST
				},
				answer: 'HELLO'
			});
		});

		const wrapper = shallow(<GameOverModal />);

		expect(toJson(wrapper, { mode: 'deep' })).toMatchSnapshot();

		expect(wrapper.props().show).toBe(true);

		expect(wrapper.find('button').text()).toBe('New Game');
		expect(wrapper.find('h1').text()).toBe('You Lost');
		expect(wrapper.find('p').text()).toBe('The correct answer was HELLO');
	});

	it('renders correctly with IN_PROGRESS state', async () => {
		act(() => {
			useStore.setState({
				gameStatus: {
					gameOver: false,
					state: GameState.IN_PROGRESS
				},
				answer: 'HELLO'
			});
		});

		const wrapper = shallow(<GameOverModal />);

		expect(toJson(wrapper, { mode: 'deep' })).toMatchSnapshot();
		expect(wrapper.props().show).toBe(false);
	});

	it('gameOver on button click', async () => {
		act(() => {
			useStore.setState({
				gameStatus: {
					gameOver: true,
					state: GameState.WON
				},
				answer: 'HELLO'
			});
		});

		const wrapper = shallow(<GameOverModal />);

		wrapper.find('button').simulate('click');

		await waitFor(() => {
			expect(useStore.getState().gameStatus.gameOver).toBe(false);
			expect(useStore.getState().gameStatus.state).toBe(GameState.IN_PROGRESS);
			expect(useStore.getState().answer).not.toBe('HELLO');
		});
	});
});
