'use strict';

/* Directives */


angular.module('rdt.directives', [])
    .directive('rdtTable', [ 'Items', function(Items) {
        return {
        	restrict:'E',
            scope: { },
            controller: function($scope) {
                $scope.items = Items.query();
                $scope.getValue = function( data, columnDef ) {
                    return data[columnDef.key];
                };
            },
        	templateUrl:'templates/mainTable.html',
        	replace: true
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
