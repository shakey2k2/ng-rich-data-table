'use strict';

/* Directives */


angular.module('rdt.directives', [])
    .directive('rdtTable', [ 'Items', function(Items) {
        return {
        	restrict:'A',
            scope: { },
            controller: function($scope) {
                $scope.items = Items.query();
                $scope.currentOrderByColumn = 0;
                $scope.getValue = function( data, columnDef ) {
                    return data[columnDef.key];
                };
                $scope.orderByColumn = function (columnIndex) {
                    $scope.currentOrderByColumn = columnIndex;
                    
                };
                $scope.getColumnOrder = function(){
                    return $scope.items.columns[$scope.currentOrderByColumn].key;
                };
                $scope.isActive = function ($index) {
                    if($index === $scope.currentOrderByColumn) {
                        return 'highlight';
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
    }]);
