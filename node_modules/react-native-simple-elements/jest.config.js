module.exports = {
    setupFiles: [
        "<rootDir>/jest.setup.js",
        // './node_modules/react-native-gesture-handler/jestSetup.js',
    ],
    // setupFilesAfterEnv: ['<rootDir>/jest.setup.afterenv.js'],
    coveragePathIgnorePatterns: ["index.js", "<rootDir>/src/images"],
    testPathIgnorePatterns: ["<rootDir>/node_modules/"],
    // snapshotSerializers: ['enzyme-to-json/serializer'],
    modulePaths: ["<rootDir>/node_modules"],
    preset: "react-native",
    moduleNameMapper: {
        "^@app(.*)$": "<rootDir>/components$1",
    },
    transformIgnorePatterns: [
        "node_modules/(?!(jest-)?react-native|@ptomasroos/react-native-multi-slider|@react-native-community/datetimepicker|@yourapp-common/(libraries|react-native)|@yourapp-snap/core)",
    ],
    roots: ["<rootDir>/components/"],
};
