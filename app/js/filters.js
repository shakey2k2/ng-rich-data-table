'use strict';

/* Filters */

angular.module('myApp.filters', [])
  .filter('paginationFilter', [function() {
    return function(rowItems, currentPageArr, itemsPerPage) {
//        console.log('currentPageArr is: ' + JSON.stringify(currentPageArr));
//        console.log('rowItem is: ' + JSON.stringify(rowItems));
//        console.log('itemsPerPage is: ' + itemsPerPage);
        var currentPageRows = [];
        if (!rowItems) {
            return rowItems;
        }
        if (itemsPerPage) {
            for (var i=0; i < itemsPerPage; i++ ) {
                currentPageRows.push(rowItems[i]);
            }
            return currentPageArr;
        } else {
            return rowItems;
        }


    }
  }]);
