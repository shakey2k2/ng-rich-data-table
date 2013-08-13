'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['rdt.directives','myApp.filters', 'myApp.services', 'myApp.controllers'])
    
    .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'templates/mainView.html', controller: 'RdtTable'});
    //$routeProvider.when('/view1', {templateUrl: 'templates/mainTable.html', controller: 'MyCtrl1'});
    //$routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
    $routeProvider.otherwise({redirectTo: '/'});
  }]);
     
