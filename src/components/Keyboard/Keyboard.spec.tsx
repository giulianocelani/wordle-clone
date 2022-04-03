import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Keyboard from '.';

describe('Keyboard', () => {
	const wrapper = shallow(<Keyboard onLetterPressed={jest.fn()} />);

	it('renders correctly', () => {
		expect(toJson(wrapper, { mode: 'deep' })).toMatchSnapshot();

		expect(wrapper.find('div.row-1').children().length).toBe(10);
		expect(wrapper.find('div.row-2').children().length).toBe(9);
		expect(wrapper.find('div.row-3').children().length).toBe(9);

		['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].forEach(
			(letter, index) => {
				expect(wrapper.find('div.row-1').childAt(index).props().letter).toBe(
					letter
				);
			}
		);

		['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].forEach((letter, index) => {
			expect(wrapper.find('div.row-2').childAt(index).props().letter).toBe(
				letter
			);
		});

		['Z', 'X', 'C', 'V', 'B', 'N', 'M'].forEach((letter, index) => {
			expect(wrapper.find('div.row-3').childAt(index).props().letter).toBe(
				letter
			);
		});

		expect(wrapper.find('div.row-3').childAt(7).props().letter).toBe(
			'Backspace'
		);
		expect(wrapper.find('div.row-3').childAt(8).props().letter).toBe('Enter');
	});
});
