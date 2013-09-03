'use strict';

/* Filters */

angular.module('myApp.filters', [])
  .filter('paginationFilter', [function() {
    return function(rowItems, currentPageArr, itemsPerPage) {
        var currentPageRows = [];
        if (!rowItems) {
            return rowItems;
        }
        if (itemsPerPage) {
            for (var i=0; i < itemsPerPage; i++ ) {
                currentPageRows.push(rowItems[i]);
            }
            return currentPageArr;
        } else {  // this condition is set when there is no itemsPerPage parameter set up, so it will return the whole model
            return rowItems;
        }


    }
  }]);
