module.exports = function( config ) {
    config.set({
        basePath: '../app/',
        frameworks: ['jasmine'],
        files: [
            'lib/jquery-1.7.1.min.js',
            'lib/angular/angular.js',
            'lib/angular/angular-*.js',
            '../test/lib/angular/angular-mocks.js',
            'js/**/*.js',

            'templates/**/*.html',
            '../test/e2e/*.js'
        ],
        autoWatch: false,
        browsers: ['Chrome'],
        singleRun: true,
        proxies: {
            '/': 'http://localhost:8000/'
        },
        junitReporter: {
            outputFile: 'test_out/e2e.xml',
            suite: 'e2e'
        }
    });
}
