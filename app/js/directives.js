'use strict';

/* Directives */


angular.module('rdt.directives', [])
    .directive('rdtTable', [ function($scope) {
        return {
        	restrict:'A',
            // scope: {
            //     config: "="
            // },
            controller: function($scope,$http,$templateCache) {
                /*adding scope.config to feed the directive*/
                $scope.config = {
                    data : [
                        {name: "Moroni",  age: 50},
                        {name: "Tiancum", age: 43},
                        {name: "Jacob",   age: 27},
                        {name: "Nephi",   age: 29},
                        {name: "Enos",    age: 10}
                        ,{"name":"Sheppard","age":68},{"name":"Rosella","age":13},{"name":"Tessa","age":87},{"name":"Emilia","age":25},{"name":"Vera","age":74},{"name":"Hallie","age":76},{"name":"Mullen","age":99},{"name":"Celeste","age":23},{"name":"Lorna","age":15},{"name":"Suzanne","age":75},{"name":"Lillie","age":34},{"name":"Crane","age":62},{"name":"Maryann","age":45},{"name":"Amalia","age":57},{"name":"Cooper","age":46},{"name":"Christine","age":70},{"name":"Ware","age":50},{"name":"Mary","age":87},{"name":"Dennis","age":31},{"name":"Kerri","age":81},{"name":"Ballard","age":27},{"name":"Bobbie","age":43},{"name":"Willis","age":73},{"name":"Larsen","age":69}
                    ],
                    settings: {
                        columns : [
                            { key: 'name', label: 'Name', columnClass:'highVisGreen' },
                            { key: 'age',  label: 'Age', columnClass:'', customTmpl:'rdtActionButtons.html'  },
                            { key: 'extracol',  label: 'ExtraColumn', columnClass:'', customTmpl:'rdtIcons.html'  }
                        ],
                        useSearchInput: true,  // display rdt toolbar
                        filteringOptions: [
                            {value: 'name', label: 'Name'}
                        ],
                        paginationOptions:{
                            pageSize: 5,
                            enablePagination: true
                        }
                    }
                };
                // pagination
                $scope.pagination = {
                    currentPage : 0,
                    totalPages : function() {
                        // create total pages number array to use in rdtPagination directive ng-repeat
                        return new Array( Math.ceil($scope.config.data.length / $scope.config.settings.paginationOptions.pageSize) );
                    },
                    goToPage : function(pageNumber) {
                        $scope.pagination.currentPage = pageNumber;
                    },
                    getCurrentPageItems : function() {
                        var pageItems = [];
                        pageItems = $scope.config.data.slice($scope.pagination.currentPage * $scope.config.settings.paginationOptions.pageSize, ($scope.pagination.currentPage + 1) * ($scope.config.settings.paginationOptions.pageSize));
                        return pageItems;
                    },
                    paginate : function(rowItems, currentPageArr, itemsPerPage, currentRow, rowIndex) {
                        console.log('currentPageArr is: ' + JSON.stringify(currentPageArr));
                        //console.log('TOTAL rowItems is: ' + JSON.stringify(rowItems));
                        console.log('$scope.pagination.currentPage is: ' + $scope.pagination.currentPage);
                        console.log('itemsPerPage is: ' + itemsPerPage);
                        console.log('current row is: ' + JSON.stringify(currentRow));
                        console.log('current row $$hashKey is: ' + JSON.stringify(currentRow.$$hashKey));
                        console.log('current row $index is: ' + rowIndex);

                        var currentPageRows = [];
//                        if (!rowItems) {
//                            return rowItems;
//                        }
                        if (itemsPerPage) {
                            for (var i=0; i < currentPageArr.length; i++ ) {
                                currentPageRows.push(currentPageArr[i].$$hashKey);
                            }
                            //return currentPageArr;
                            console.log('IN ARRAY: ' + angular.element.inArray(currentRow.$$hashKey, currentPageRows));
                            console.log('COMPLETE IN ARRAY: ' + currentPageRows);
                            // if the item is in the current page return false, if not return true
                            // create a hashkey array ^^
                            // if the current row is not in this page array (-1) return true to hide
                            // TODO pagination should display items grouped by index position, not by hashes
                            if (angular.element.inArray(currentRow.$$hashKey, currentPageRows) === -1) {
                                return true;
                            }

                        } else {  // this condition is set when there is no itemsPerPage parameter set up, so it will return the whole model
                            return false;
                        }
                    }
                };

                $scope.currentOrderByColumn = 0;
                $scope.hiddenColumns = [];
                $scope.reverseOrder = true;
                $scope.showRows = false;
                $scope.getValue = function( data, columnDef ) {
                    return data[columnDef.key];
                };
                $scope.getValueFromRow = function(row, itemKey){
                    return row[itemKey];
                };
                $scope.sortByKey = function(field, reverse, primer){
                    var key = function (x) {return primer ? primer(x[field]) : x[field]};

                    return function (a,b) {
                        var A = key(a), B = key(b);
                        return ( (A < B) ? -1 : ((A > B) ? 1 : 0) ) * [-1,1][+!!reverse];
                    }
                };
                $scope.sorting = function(indexColumn) {
                    var dataSetObj = $scope.config.data,
                        sortingKey = $scope.config.settings.columns[indexColumn].key;

                    console.log('SORTING KEY IS: ' + sortingKey);
                    console.log('DATASETOBJ BEFORE SORTING IS: ' + dataSetObj);
                    dataSetObj.sort($scope.sortByKey(sortingKey,$scope.reverseOrder,function(a){return a}));
                    $scope.reverseOrder = !$scope.reverseOrder;
                    $scope.currentOrderByColumn = indexColumn;
                    console.log('DATASETOBJ NOW IS: ' + dataSetObj);
                };
                $scope.showAllRows = function (){
                    if ($scope.searchText !== '') {
                        $scope.showRows = true;
                        console.log('SEARCH TEXT IS NOT EMPTY');
                    } else {
                        $scope.showRows = false;
                        console.log('SEARCH TEXT IS EMPTY');
                    }

                };
                $scope.filterResults = function(elem) {
                    console.log('ELEM IS: ' + elem);
                    if(! $scope.searchText) {
                        return true;
                    } else {
                        return elem.name.toLowerCase().indexOf( scope.searchText.toLowerCase()) == 0;
                    }
                };
                $scope.$watch('searchText', function() {
                    console.log('WATCHING SEARCHTEXT');
                    // display all rows
                    $scope.showAllRows();
                });
                $scope.getColumnOrder = function(){
                    return $scope.config.settings.columns[$scope.currentOrderByColumn].key;
                };
                $scope.orderIsActive = function($index) {
                    if($index === $scope.currentOrderByColumn) {
                        if($scope.reverseOrder){
                           return 'order-active-reverse';
                        }else {
                           return 'order-active'; 
                        }
                    }
                };
                $scope.hideShowColumn = function(columnIndex) {
                    var hideArray, tempHidden = 0;
                    // check if the column is hidden. if it is remove from array of hidden columns, if not hidden add it to the array
                    tempHidden = $scope.hiddenColumns.indexOf(columnIndex);
                    if ( tempHidden !== -1 ) {
                        $scope.hiddenColumns.splice(tempHidden, 1);
                    }else {
                        $scope.hiddenColumns.push(columnIndex);
                    }
                };
                $scope.isHidden = function(columnIndex) {
                    if ( $scope.hiddenColumns.indexOf(columnIndex) !== -1 ) {
                        return true
                    }else {
                        return false;
                    }
                };
                $scope.getCustomColClass = function(columnIndex) {
                   // get column class from config according to column index
                   if (columnIndex !== undefined){
                        return $scope.config.settings.columns[columnIndex].columnClass;
                   }
                };
                // template storage object for these directives
                $scope.currentTemplates = {
                   default: ''
                };
            },
        	templateUrl:'templates/mainTable.html',
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
            columnTmplDefinition = scope.config.settings.columns[columnIndex].customTmpl;
            var tmplBaseDir = 'templates/';
            // check column defs
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
