import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import { MAX_WORD_LENGTH } from '../../utils';

import Guess from '.';

describe('Guess', () => {
	const wrapper = mount(<Guess guess={{ word: 'HELLO' }} isInvalid={false} />);

	it('default renders correctly', () => {
		expect(toJson(wrapper, { mode: 'deep' })).toMatchSnapshot();
	});

	it('renders only maximum number of letters', () => {
		expect(
			wrapper.find(`div.grid-cols-${MAX_WORD_LENGTH}`).children().length
		).toBe(MAX_WORD_LENGTH);
	});

	it('renders letters in the correct order', () => {
		expect(
			wrapper
				.find(`div.grid-cols-${MAX_WORD_LENGTH}`)
				.children()
				.map((child) => child.props().letter)
		).toEqual(['H', 'E', 'L', 'L', 'O']);
	});
});
