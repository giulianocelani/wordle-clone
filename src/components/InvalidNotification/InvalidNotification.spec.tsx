import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import InvalidNotification from '.';

describe('InvalidNotification', () => {
	const wrapper = shallow(<InvalidNotification />);

	it('renders correctly', () => {
		expect(toJson(wrapper, { mode: 'deep' })).toMatchSnapshot();
	});
});
