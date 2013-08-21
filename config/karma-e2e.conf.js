module.exports = function( config ) {
    config.set({
        basePath: '../app/',
        plugins: ['karma-ng-scenario', 'karma-jasmine', 'karma-chrome-launcher','karma-html2js-preprocessor'],
        frameworks: ['ng-scenario'],
        files: [
            'lib/jquery-1.7.1.min.js',
            'lib/angular/angular.js',
            'lib/angular/angular-*.js',
            '../test/lib/angular/angular-mocks.js',
            '../test/lib/angular/angular-scenario.js',
            'js/**/*.js',

            'templates/**/*.html',
            '../test/e2e/*.js'
        ],
        urlRoot: '/_karma_/',
        autoWatch: false,
        browsers: ['Chrome'],

        singleRun: false,
        proxies: {
            '/': 'http://localhost:8000/'
        },
        junitReporter: {
            outputFile: 'test_out/e2e.xml',
            suite: 'e2e'
        }
    });
}
