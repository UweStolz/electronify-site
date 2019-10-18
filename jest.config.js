module.exports = {
    preset: 'ts-jest',
    globals: {
        'ts-jest': {
            pathRegex: /\.(test)\.ts$/,
        },
    },
    notify: true,
    notifyMode: 'change',
    testEnvironment: 'node',
    clearMocks: true,
    restoreMocks: true,
    testRegex: '(/__tests__/.*|(\\.|/)(test))\\.tsx?$',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleFileExtensions: [
        'js',
        'ts',
        'json',
        'node',
    ],
    testPathIgnorePatterns: [
        '/node_modules/',
    ],
};