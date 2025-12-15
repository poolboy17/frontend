module.exports = {
	testEnvironment: 'jsdom',
	setupFiles: ['<rootDir>/src/components/__tests__/react-shim.ts'],
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js', '<rootDir>/src/test-shim.ts'],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
	},
	transform: {
		'^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
	},
	testPathIgnorePatterns: ['/node_modules/', '/.next/'],
	collectCoverageFrom: [
		'src/**/*.{js,jsx,ts,tsx}',
		'!src/**/*.d.ts',
		'!src/**/__tests__/*',
	],
	transformIgnorePatterns: [
		'/node_modules/',
		'^.+\\.module\\.(css|sass|scss)$',
	],
}
