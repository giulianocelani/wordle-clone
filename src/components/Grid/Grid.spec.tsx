import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import useGuess from '../../hooks/useGuess';

import Grid from '.';

jest.mock('../../hooks/useGuess');
const mockUseGuess = useGuess as jest.MockedFunction<typeof useGuess>;

describe('Grid', () => {
	mockUseGuess.mockReturnValue(['', jest.fn()]);
	let wrapper = mount(<Grid />);

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
		mockUseGuess.mockReturnValue(['HELL', jest.fn()]);
		wrapper = mount(<Grid />);
		expect(
			wrapper.find('div.grid-rows-6').childAt(0).props().guess.word
		).toEqual('HELL');
	});
});
