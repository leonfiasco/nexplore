export {};
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	preset: 'ts-jest',
	moduleNameMapper: {
		'@components/(.*)$': '<rootDir>/src/components/$1',
		'@/(.*)$': '<rootDir>/src/$1',

		'^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'<rootDir>/src/__tests__/__mocks__/fileMock.ts',
		'^.+\\.(css|less|scss|sass)$':
			'<rootDir>/src/__tests__/__mocks__/styleMock.ts',

		'(assets|models|services)': '<rootDir>/src/__tests__/__mocks__/fileMock.ts',
	},

	setupFilesAfterEnv: ['<rootDir>/src/__tests__/setupTests.ts'],

	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	modulePaths: ['<rootDir>'],
	testEnvironment: 'jsdom',
};
