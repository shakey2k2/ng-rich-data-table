'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('RdtTable', ['$scope','Items', function($scope, Items) {
  	console.log('rdtable controller');
  	
  	$scope.items = Items.query();

  	console.log(JSON.stringify($scope.items));
  	console.log(JSON.stringify($scope.items[0].data[0].name));
  }])
  .controller('RdtTableHeader', [function() {

  }])
  .controller('RdtTableBody', [function() {

  }])
  .controller('RdtTableFooter', [function() {

  }]);
