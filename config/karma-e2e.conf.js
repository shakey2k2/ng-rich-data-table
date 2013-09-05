module.exports = function( config ) {
    config.set({
        basePath: '../',
        /* alternative basepath */
        //basePath: '../app/',
        /* alternative basepath */
        plugins: ['karma-ng-scenario', 'karma-jasmine', 'karma-chrome-launcher','karma-html2js-preprocessor'],
        frameworks: ['ng-scenario'],
        files: [

//            'lib/jquery-1.7.1.min.js',
//            'lib/angular/angular.js',
//            'lib/angular/angular-*.js',
//            '../test/lib/angular/angular-mocks.js',
////            '../test/lib/angular/angular-scenario.js',
//            'js/**/*.js',
//
//            'templates/**/*.html',
//            '../test/e2e/*.js'
/* alternative basepath */
            'app/lib/jquery-1.7.1.min.js',
            'app/lib/angular/angular.js',
            'app/lib/angular/angular-*.js',
            'app/../test/lib/angular/angular-mocks.js',
//            '../test/lib/angular/angular-scenario.js',
            'app/js/**/*.js',

            'app/templates/**/*.html',
            'app/../test/e2e/*.js'

/* alternative basepath */

        ],

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: LOG_INFO,
        urlRoot: '/_karma_/',
        autoWatch: true,
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
