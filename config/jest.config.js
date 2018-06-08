const path = require('path');

module.exports = {
    // https://facebook.github.io/jest/docs/en/configuration.html#rootdir-string
    rootDir: path.join(process.cwd(), 'src'),

    // https://facebook.github.io/jest/docs/en/configuration.html#roots-array-string
    roots: [
        path.join(process.cwd(), 'tests'),
        path.join(process.cwd(), 'src')
    ],

    // https://facebook.github.io/jest/docs/en/configuration.html#collectcoverage-boolean
    collectCoverage: true,

    // https://facebook.github.io/jest/docs/en/configuration.html#verbose-boolean
    verbose: true
};