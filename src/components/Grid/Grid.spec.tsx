import React from 'react';

import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import Grid from '.';

describe('Grid', () => {
	let wrapper = mount(<Grid answer='' />);

	it('default renders correctly', () => {
		expect(toJson(wrapper, { mode: 'deep' })).toMatchSnapshot();
		expect(wrapper.find('div.grid-rows-6').childAt(0).props().guess).toEqual(
			''
		);
	});

	it('renders only maximum 6 rows', () => {
		expect(wrapper.find('div.grid-rows-6').children().length).toBe(6);
	});

	it('renders guesses in the correct order', () => {
		React.useState = jest.fn().mockReturnValue([{ guesses: ['HELLO'] }, {}]);
		wrapper = mount(<Grid answer='' />);
		expect(wrapper.find('div.grid-rows-6').childAt(0).props().guess).toEqual(
			'HELLO'
		);
	});
});
