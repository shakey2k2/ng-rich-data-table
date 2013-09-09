'use strict';

/* Directives */


angular.module('rdt.directives', [])
    .directive('rdtTable', ['$templateCache','$http', '$q', function($templateCache, $http, $q ) {
        return {
        	restrict:'A',
            // TODO change to isolate scope
            scope: true,
            templateUrl:'templates/mainTable.html',
            compile: function() {
                return {
                    pre: function($scope, iElement, iAttrs) {
                        var $element = $(iElement);
                        var options = {};
                        var table = new richDataTable($scope, options, $templateCache, $http, $q);
                        return table.init().then(function() {

                            return null;
                        });
                    }
                }
            },
        	replace: false
        };
    }])
    .directive('rdtHeader', [ function() {
        return {
        	restrict:'A',
        	templateUrl:'templates/header.html',
        	replace: false
        };
    }])
    .directive('rdtBody', [ function() {
        return {
        	restrict:'A',
        	templateUrl:'templates/rdtBody.html',
        	replace: false
        };
    }])
    .directive('rdtFooter', [ function() {
        return {
            restrict:'A',
            templateUrl:'templates/rdtFooter.html',
            replace: false
        };
    }])
    .directive('rdtToolbar', [ function() {
        return {
            restrict:'A',
            templateUrl:'templates/rdtToolbar.html',
            replace: false
        };
    }])
    .directive('rdtPagination', [ function() {
        return {
        	restrict:'A',
        	templateUrl:'templates/rdtPagination.html',
        	replace: false
        };
    }])
    .directive('rdtTdContent', ['$compile', '$templateCache','$http', function($compile,$templateCache,$http) {
        var simpleDataTmpl = '{{ getValue(row, column) }}',
            columnIndex,
            columnTmplDefinition;
        var tmplBaseDir = 'templates/';
        var templateMap = {};
        var templateLoader;


        var getTemplate = function(columnTmplDefinition) {
            var contentTmpl = '';

            // check if there is a corresponding template in column definition
           // TODO replace with angular functions
            if (typeof columnTmplDefinition !== 'undefined') {
                contentTmpl = columnTmplDefinition;
                //contentTmpl = $templateCache.get(columnTmplDefinition);
            }else {
                contentTmpl = simpleDataTmpl;
            }
            return contentTmpl;
        };

        var linker = function(scope, element, attrs) {
            columnIndex = scope.$index;
            // TODO: replace customTmpl
            columnTmplDefinition = scope.settings.columnDefs[columnIndex].customTmpl;
            var tmplBaseDir = 'templates/';
            // check column defs
            // TODO replace with angular functions
            if (typeof columnTmplDefinition !== 'undefined') {
                // needs a template according to column definition so checks if that template was set before in templateMap
                if (typeof templateMap[columnTmplDefinition] !== "undefined") {
                    // get template content from templateMap object if wasn't stored
                    element.html(getTemplate(templateMap[columnTmplDefinition])).show();
                    $compile(element.contents())(scope);
                } else {
                    // get template from separate file using $http and compile
                    $http.get(tmplBaseDir+columnTmplDefinition,{cache:$templateCache}).then(function(result) {
                        templateMap[ result.url ] = result.data;
                        element.html(getTemplate(result.data)).show();
                        $compile(element.contents())(scope);
                    });
                }
            } else {
                // uses no template
                element.html(getTemplate(columnTmplDefinition)).show();
                $compile(element.contents())(scope);
            }
        };
        return {
        	restrict:'A',
            link: linker,
        	replace: true
        };
    }]);
