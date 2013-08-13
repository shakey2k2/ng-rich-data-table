'use strict';

/* Directives */


angular.module('rdt.directives', [])
    .directive('rdtTable', [ function() {
        return {
        	restrict:'E',
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
    }])
    // workaround for AngularJS bug: https://github.com/angular/angular.js/issues/1459
	.directive("wsReplaceTag", function() {
	  return function(scope, element, attrs) {
	      var newTag = attrs.wsReplaceTag;
	      var nodeAttributes = {};

	      $.each(element[0].attributes, function(idx, attr) {
	          nodeAttributes[attr.nodeName] = attr.nodeValue;
	      });

	      element.replaceWith(function () {
	          return $("<" + newTag + "/>", nodeAttributes).append(element.contents());
	      });
	  };
	});
    
