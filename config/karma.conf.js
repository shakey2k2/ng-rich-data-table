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
            '../test/unit/**/*.js',

            'templates/**/*.html'
        ],

        autoWatch: true,

        browsers: ['Chrome'],

        preprocessors: {
            'templates/**/*.html': 'ng-html2js'
        },

        /*
        ngHtml2JsPreprocessor: {
            prependPrefix: 'app/'
        },
        */

        junitReporter: {
            outputFile: '../test_out/unit.xml',
            suite: 'unit'
        }
    });
}
