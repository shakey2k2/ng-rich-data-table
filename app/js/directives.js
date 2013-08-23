'use strict';

/* Directives */


angular.module('rdt.directives', [])
    .directive('rdtTable', [ function($scope) {
        return {
        	restrict:'A',
            // scope: {
            //     config: "="
            // },
            controller: function($scope) {
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
                            { key: 'name', label: 'Name' },
                            { key: 'age',  label: 'Age'  }
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
                        event.preventDefault();
                        //console.log('goToPage: ' + pageNumber);
                        $scope.pagination.currentPage = pageNumber;
                    },
                    getCurrentPageItems : function() {
                        var pageItems = [];
                        pageItems = $scope.config.data.slice($scope.pagination.currentPage * $scope.config.settings.paginationOptions.pageSize, ($scope.pagination.currentPage + 1) * ($scope.config.settings.paginationOptions.pageSize));
                        return pageItems;
                    }
                };


                $scope.currentOrderByColumn = 0;
                $scope.hiddenColumns = [];
                $scope.reverseOrder = true;
                $scope.getValue = function( data, columnDef ) {
                    return data[columnDef.key];
                };
                $scope.orderByColumn = function (columnIndex) {
                    $scope.reverseOrder = !$scope.reverseOrder;
                    $scope.currentOrderByColumn = columnIndex;
                };
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
    }]).directive('rdtToolbar', [ function() {
        return {
            restrict:'A',
            templateUrl:'templates/rdtToolbar.html',
            replace: false
        };
    }]).directive('rdtPagination', [ function() {
        return {
        	restrict:'A',
        	templateUrl:'templates/rdtPagination.html',
        	replace: false
        };
    }]);
