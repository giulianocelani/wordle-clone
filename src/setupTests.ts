import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme from 'enzyme';

import '@testing-library/jest-dom';

Enzyme.configure({ adapter: new Adapter() });

class IntersectionObserver {
	observe = jest.fn();

	disconnect = jest.fn();

	unobserve = jest.fn();
}

Object.defineProperty(window, 'IntersectionObserver', {
	writable: true,
	configurable: true,
	value: IntersectionObserver
});

Object.defineProperty(global, 'IntersectionObserver', {
	writable: true,
	configurable: true,
	value: IntersectionObserver
});
