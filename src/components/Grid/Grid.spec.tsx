import React from 'react';

import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import Grid from '.';

describe('Grid', () => {
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
		React.useState = jest.fn().mockReturnValue([{ currentGuess: 'HELL' }, {}]);
		wrapper = mount(<Grid />);
		expect(
			wrapper.find('div.grid-rows-6').childAt(0).props().guess.word
		).toEqual('HELL');
	});
});
