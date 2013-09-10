'use strict';

/* Directives */


angular.module('rdt.directives', [])
    .directive('rdtTable', ['$compile','$templateCache','$http', '$q','Items', function($compile, $templateCache, $http, $q, Items ) {
        return {
        	restrict:'A',
            // TODO change to isolate scope
            scope: true,
            //templateUrl:'templates/mainTable.html',
            compile: function() {
                return {
                    pre: function($scope, iElement, iAttrs) {
                        var $element = $(iElement);
                        var options = {};
                        var table = new richDataTable($scope, options, $templateCache, $http, $q, Items);
                        return table.init().then(function() {
//                            console.log('iElement: ' + iElement[0] );
//                            console.log('template: ' + $templateCache.get('templates/mainTable.html') );
//                            console.log('scope in directive/compile: ' + JSON.stringify($scope.data.results));
                            iElement.append($compile($templateCache.get('templates/mainTable.html'))($scope));
                            return null;
                        });
                    }
                }
            },
        	replace: false
        };
    }])
    .directive('rdtHeader', ['$compile','$templateCache', function($compile, $templateCache) {
        return {
        	restrict:'A',
            compile: function() {
                return {
                    pre: function($scope, iElement, iAttrs) {
                        iElement.append($compile($templateCache.get('templates/header.html'))($scope));
                        return  null;
                    }
                }
            },
        	replace: false
        };
    }])
    .directive('rdtBody', ['$compile','$templateCache', function($compile, $templateCache) {
        return {
        	restrict:'A',
            compile: function() {
                return {
                    pre: function($scope, iElement, iAttrs) {
                        iElement.append($compile($templateCache.get('templates/rdtBody.html'))($scope));
                        return  null;
                    }
                }
            },
        	replace: false
        };
    }])
    .directive('rdtFooter', ['$compile','$templateCache', function($compile, $templateCache) {
        return {
            restrict:'A',
            compile: function() {
                return {
                    pre: function($scope, iElement, iAttrs) {
                        iElement.append($compile($templateCache.get('templates/rdtFooter.html'))($scope));
                        return  null;
                    }
                }
            },
            replace: false
        };
    }])
    .directive('rdtToolbar', ['$compile','$templateCache', function($compile, $templateCache) {
        return {
            restrict:'A',
            compile: function() {
                return {
                    pre: function($scope, iElement, iAttrs) {
                        iElement.append($compile($templateCache.get('templates/rdtToolbar.html'))($scope));
                        return  null;
                    }
                }
            },
            replace: false
        };
    }])
    .directive('rdtPagination', ['$compile','$templateCache', function($compile, $templateCache) {
        return {
        	restrict:'A',
            compile: function() {
                return {
                    pre: function($scope, iElement, iAttrs) {
                        iElement.append($compile($templateCache.get('templates/rdtPagination.html'))($scope));
                        return  null;
                    }
                }
            },
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
