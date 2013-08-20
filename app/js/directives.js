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
                        {name: "Enos",    age: 34}
                    ],
                    settings: {
                        columns : [
                            { key: 'name', label: 'Name' },
                            { key: 'age',  label: 'Age'  }
                        ],
                        useSearchInput: 1,  // display rdt toolbar
                        filteringOptions: [
                            {value: 'name', label: 'Name'}
                        ]
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
                $scope.orderIsActive = function ($index) {
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
    }]);
