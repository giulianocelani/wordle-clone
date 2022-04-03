import { act } from 'react-dom/test-utils';

import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import useStore from '../../store';
import { LetterState } from '../../utils';

import Grid from '.';

describe('Grid', () => {
	let wrapper = mount(<Grid guess='' setGuess={jest.fn()} />);

	it('default renders correctly', () => {
		expect(toJson(wrapper, { mode: 'deep' })).toMatchSnapshot();
		expect(
			wrapper.find('div.grid-rows-6').childAt(0).props().guess.word
		).toEqual('');
	});

	it('renders only maximum 6 rows', () => {
		expect(wrapper.find('div.grid-rows-6').children().length).toBe(6);
	});

	it('renders current guess', () => {
		act(() => {
			useStore.setState({
				alreadyGuessed: [
					{
						word: 'HELLO',
						state: [
							LetterState.MISS,
							LetterState.MATCH,
							LetterState.MATCH,
							LetterState.MATCH,
							LetterState.MATCH
						]
					}
				],
				answer: 'BELLO'
			});
		});

		wrapper = mount(<Grid guess='BELL' setGuess={jest.fn()} />);
		expect(toJson(wrapper, { mode: 'deep' })).toMatchSnapshot();
		expect(
			wrapper.find('div.grid-rows-6').childAt(1).props().guess.word
		).toEqual('BELL');
	});
});
