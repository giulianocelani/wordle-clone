import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Key from '.';

describe('Key', () => {
	let wrapper = shallow(<Key letter='A' onClick={jest.fn()} />);

	it('renders correctly with single character', () => {
		expect(toJson(wrapper, { mode: 'deep' })).toMatchSnapshot();
		expect(wrapper.find('button').length).toBe(1);

		expect(wrapper.find('svg').length).toBe(0);
	});

	it('renders correct with multiple characters', () => {
		wrapper = shallow(<Key letter='Enter' onClick={jest.fn()} />);
		expect(toJson(wrapper, { mode: 'deep' })).toMatchSnapshot();
		expect(wrapper.find('button').length).toBe(1);

		expect(wrapper.find('svg').length).toBe(0);
	});

	it('renders correct with svg', () => {
		wrapper = shallow(<Key letter='Backspace' onClick={jest.fn()} />);
		expect(toJson(wrapper, { mode: 'deep' })).toMatchSnapshot();

		expect(wrapper.find('button').length).toBe(1);

		expect(wrapper.find('svg').length).toBe(1);
	});
});
