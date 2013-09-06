/**
 * Rich Data Table Class
 */
var richDataTable = function () {
    var defaults = {
        data: [],
        "columnDefs" : [
            {
                "field": "name",
                "displayLabel":"Name",
                "class": ""
            }
        ],
        "useSearchInput": true,
        "filterOptions": [
            { "value": "name", "displayLabel":"Name" }
        ],
        "paginationOptions": {
            "pageSize": 2,
            "enablePagination": true
        },
        "hideHeader": false // Todo: This option will hide the header of the table. Can be done with an ng-hide on the thead. Should be false be default
    },
        self = this;
    // self methods

    // get templates
    self.initTemplates = function() {
        var templates = ['mainTable', 'rdtBody','rdtFooter','header','rdtTdContent','rdtPagination','rdtToolbar','rdtIcons'];

        var promises = [];
        angular.forEach(templates, function(template) {
            promises.push( self.getTemplate(template) );
        });

        return $q.all(promises);
    };

    self.getTemplate = function (key) {
        var t = self.config[key];
        var uKey = self.gridId + key + ".html";
        var p = $q.defer();
        if (t && !TEMPLATE_REGEXP.test(t)) {
            $http.get(t, {
                cache: $templateCache
            })
                .success(function(data){
                    $templateCache.put(uKey, data);
                    p.resolve();
                })
                .error(function(err){
                    p.reject("Could not load template: " + t);
                });
        } else if (t) {
            $templateCache.put(uKey, t);
            p.resolve();
        } else {
            var dKey = key + ".html";
            $templateCache.put(uKey, $templateCache.get(dKey));
            p.resolve();
        }

        return p.promise;
    };


    // pagination
    $scope.pagination = {
        currentPage : 0,
        totalPages : function() {
            // create total pages number array to use in rdtPagination directive ng-repeat
            return new Array( Math.ceil($scope.data.results.length / $scope.settings.paginationOptions.pageSize) );
        },
        goToPage : function(pageNumber) {
            $scope.pagination.currentPage = pageNumber;
        },
        getCurrentPageItems : function() {
            var pageItems = [];
            pageItems = $scope.data.results.slice($scope.pagination.currentPage * $scope.settings.paginationOptions.pageSize, ($scope.pagination.currentPage + 1) * ($scope.settings.paginationOptions.pageSize));
            return pageItems;
        },
        stopPagination : false,
        paginate : function(rowItems, currentPageArr, itemsPerPage, currentRow, rowIndex) {
            var currentPageRows = [];
            if (itemsPerPage && !$scope.pagination.stopPagination) {
                for (var i=0; i < currentPageArr.length; i++ ) {
                    currentPageRows.push(currentPageArr[i].$$hashKey);
                }
                // if the current row is not in this page array (-1) return true to hide
                if ($.inArray(currentRow.$$hashKey, currentPageRows) === -1) {
                    return true;
                }

            } else {  // this condition is set when there is no itemsPerPage parameter set up, so it will return the whole model
                return false;
            }
        }
    };

    self.currentOrderByColumn = 0;
    self.hiddenColumns = [];
    self.reverseOrder = true;
    self.showRows = false;
    self.searchText = '';
    self.isSearchTextActive = false;
    self.isDropdownActive = false;
    self.getValue = function( data, columnDef ) {
        // if displayValue exists overrides getValue
        if(angular.isFunction(self.displayValue)) {
            return displayValue(data, columnDef);
        }else {
            return data[columnDef.field];
        }

    };
    self.getValueFromRow = function(row, itemKey){
        return row[itemKey];
    };
    self.sortByKey = function(field, reverse, primer){
        var key = function (x) {return primer ? primer(x[field]) : x[field]};

        return function (a,b) {
            var A = key(a), B = key(b);
            return ( (A < B) ? -1 : ((A > B) ? 1 : 0) ) * [-1,1][+!!reverse];
        }
    };
    self.sorting = function(indexColumn) {
        var dataSetObj = self.data.results,
            sortingKey = self.settings.columnDefs[indexColumn].field;
        dataSetObj.sort(self.sortByKey(sortingKey,self.reverseOrder,function(a){return a}));
        self.reverseOrder = !self.reverseOrder;
        self.currentOrderByColumn = indexColumn;
    };
    self.showAllRows = function (){
        if (self.searchText !== '') {
            self.showRows = true;
        } else {
            self.showRows = false;
        }
    };
    self.showRows = function (){
        self.showRows = true;
    };
    self.filterResults = function(elem) {
        if(! self.searchText) {
            return true;
        } else {
            return elem.name.toLowerCase().indexOf( scope.searchText.toLowerCase()) == 0;
        }
    };
    self.$watch('searchText', function() {
        if ($scope.searchText === '') {
            $scope.isSearchTextActive = false;
            $scope.pagination.stopPagination = false;
        } else {
            $scope.isSearchTextActive = true;
            $scope.pagination.stopPagination = true;
        }
        // display all rows
        $scope.showAllRows();
    });
    self.showDropdownResults = function() {
        if ($scope.searchDropdown === '') {
            $scope.isDropdownActive = false;
            $scope.pagination.stopPagination = false;
        } else {
            $scope.pagination.stopPagination = true;
            $scope.isDropdownActive = true;
        }
    };
    self.getColumnOrder = function(){
        return $scope.settings.columnDefs[$scope.currentOrderByColumn].field;
    };
    self.orderIsActive = function($index) {
        if($index === $scope.currentOrderByColumn) {
            if($scope.reverseOrder){
                return 'order-active-reverse';
            }else {
                return 'order-active';
            }
        }
    };
    self.hideShowColumn = function(columnIndex) {
        var hideArray, tempHidden = 0;
        // check if the column is hidden. if it is remove from array of hidden columns, if not hidden add it to the array
        tempHidden = $scope.hiddenColumns.indexOf(columnIndex);
        if ( tempHidden !== -1 ) {
            $scope.hiddenColumns.splice(tempHidden, 1);
        }else {
            $scope.hiddenColumns.push(columnIndex);
        }
    };
    self.isHidden = function(columnIndex) {
        if ( $scope.hiddenColumns.indexOf(columnIndex) !== -1 ) {
            return true
        }else {
            return false;
        }
    };
    self.getCustomColClass = function(columnIndex) {
        // get column class from config according to column index
        // Todo: use angular functions
        if (columnIndex !== undefined){
            return $scope.settings.columnDefs[columnIndex].class;
        }
    };
    // template storage object for these directives
    self.currentTemplates = {
        default: ''
    };








    //$scope vars


    //scope functions

};