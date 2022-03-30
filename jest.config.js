module.exports = {
	testURL: 'http://localhost/',
	testEnvironment: 'jsdom',
	transform: {
		'\\.(ts|tsx|js|jsx)$': 'ts-jest'
	},
	moduleNameMapper: {
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'<rootDir>/mocks/fileMock.js',
		'\\.(css|less|sass|scss)$': 'identity-obj-proxy'
	},
	moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
	moduleDirectories: ['node_modules']
};
