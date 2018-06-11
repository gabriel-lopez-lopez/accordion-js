const path = require('path');

module.exports = {

    // https://facebook.github.io/jest/docs/en/configuration.html#rootdir-string
    rootDir: path.join(process.cwd(), ''),


    // https://facebook.github.io/jest/docs/en/configuration.html#roots-array-string
    roots: [
        "<rootDir>/test",
        "<rootDir>/src"
    ],


    // https://facebook.github.io/jest/docs/en/configuration.html#verbose-boolean
    verbose: true,


    // https://facebook.github.io/jest/docs/en/configuration.html#coveragedirectory-string
    coverageDirectory: "<rootDir>/coverage",


    //https://facebook.github.io/jest/docs/en/configuration.html#testpathignorepatterns-array-string
    testPathIgnorePatterns: [
        "<rootDir>/test/karma/"
    ],


    // https://facebook.github.io/jest/docs/en/configuration.html#testmatch-array-string
    testMatch: [
        "**/?(*.)+(spec|test).js?(x)"
    ],

    // https://facebook.github.io/jest/docs/en/configuration.html#modulenamemapper-object-string-string
    moduleNameMapper: {
        "\\.(css|scss|less)$": "<rootDir>/config/jest/__mocks__/styleMock.js",
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/config/jest/__mocks__/fileMock.js"
    }

};