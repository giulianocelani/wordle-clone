import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import { LetterStatus } from '../../utils';

import Letter from '.';

describe('Letter', () => {
	let wrapper = mount(<Letter letter='A' />);

	it('default renders correctly', () => {
		expect(toJson(wrapper, { mode: 'deep' })).toMatchSnapshot();

		expect(wrapper.exists('.bg-green-500')).toBeFalsy();
		expect(wrapper.exists('.border-green-500')).toBeFalsy();
		expect(wrapper.exists('.bg-yellow-500')).toBeFalsy();
		expect(wrapper.exists('.border-yellow-500')).toBeFalsy();
		expect(wrapper.exists('.bg-red-500')).toBeFalsy();
		expect(wrapper.exists('.border-red-500')).toBeFalsy();

		expect(wrapper.find('h2').exists('.text-white')).toBeFalsy();
	});

	it('renders letter correctly', () => {
		expect(wrapper.find('h2').text()).toEqual('A');

		wrapper.setProps({ letter: 'B' });
		expect(wrapper.find('h2').text()).toEqual('B');
	});

	it('MATCH renders correctly', () => {
		wrapper = mount(<Letter letter='A' state={LetterStatus.MATCH} />);
		expect(toJson(wrapper, { mode: 'deep' })).toMatchSnapshot();

		expect(wrapper.exists('.bg-green-500')).toBeTruthy();
		expect(wrapper.exists('.border-green-500')).toBeTruthy();

		expect(wrapper.exists('.bg-yellow-500')).toBeFalsy();
		expect(wrapper.exists('.border-yellow-500')).toBeFalsy();
		expect(wrapper.exists('.bg-red-500')).toBeFalsy();
		expect(wrapper.exists('.border-red-500')).toBeFalsy();

		expect(wrapper.find('h2').exists('.text-white')).toBeTruthy();
	});

	it('MISSING renders correctly', () => {
		wrapper = mount(<Letter letter='A' state={LetterStatus.MISS} />);
		expect(toJson(wrapper, { mode: 'deep' })).toMatchSnapshot();

		expect(wrapper.exists('.bg-red-500')).toBeTruthy();
		expect(wrapper.exists('.border-red-500')).toBeTruthy();

		expect(wrapper.exists('.bg-green-500')).toBeFalsy();
		expect(wrapper.exists('.border-green-500')).toBeFalsy();
		expect(wrapper.exists('.bg-yellow-500')).toBeFalsy();
		expect(wrapper.exists('.border-yellow-500')).toBeFalsy();

		expect(wrapper.find('h2').exists('.text-white')).toBeTruthy();
	});

	it('EXISTS renders correctly', () => {
		wrapper = mount(<Letter letter='A' state={LetterStatus.EXISTS} />);
		expect(toJson(wrapper, { mode: 'deep' })).toMatchSnapshot();

		expect(wrapper.exists('.bg-yellow-500')).toBeTruthy();
		expect(wrapper.exists('.border-yellow-500')).toBeTruthy();

		expect(wrapper.exists('.bg-green-500')).toBeFalsy();
		expect(wrapper.exists('.border-green-500')).toBeFalsy();
		expect(wrapper.exists('.bg-red-500')).toBeFalsy();
		expect(wrapper.exists('.border-red-500')).toBeFalsy();

		expect(wrapper.find('h2').exists('.text-white')).toBeTruthy();
	});

	it('renders correctly with no letter', () => {
		wrapper = mount(<Letter letter='' />);
		expect(wrapper.find('h2').text()).not.toEqual('A');
	});
});
