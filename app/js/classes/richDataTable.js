/**
 * Rich Data Table Class
 */
var richDataTable = function ($scope, options, $templateCache, $http, $q) {
    var defaults = {
        data: [],
        "columnDefs" : [],
        "useSearchInput": false,
        "filterOptions": undefined,
        "paginationOptions": {
            "pageSize": 1,
            "enablePagination": false
        },
        "hideHeader": false // Todo: This option will hide the header of the table. Can be done with an ng-hide on the thead. Should be false be default
    },
    self = this;

    // merge with options
    self.config = $.extend(defaults, window.richDataTable.config, options);

    // self vars



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
        var tmplBaseDir = 'templates/';
        var uKey = tmplBaseDir + key + ".html";
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


self.init = function() {
    return self.initTemplates().then(function(){
        console.log('self.initTemplates().then');
        console.log('scope: ' + self.settings.paginationOptions.pageSize);
        console.log($templateCache.get('templates/mainTable.html'));
    });
};


    self.settings = {
        "columnDefs" : [
            {
                "field": "name",
                "displayLabel":"Name",
                "class": "highVisGreen"
            }
        ],
        "useSearchInput": true,
        "filterOptions": [
            { "value": "name", "displayLabel":"Name" }
        ],
        "paginationOptions": {
            "pageSize": 5,
            "enablePagination": true
        },
        "hideHeader": false // Todo: This option will hide the header of the table. Can be done with an ng-hide on the thead. Should be false be default
    };

    // pagination
    self.pagination = {
        currentPage : 0,
        totalPages : function() {
            // create total pages number array to use in rdtPagination directive ng-repeat
            return new Array( Math.ceil($scope.data.results.length / $scope.settings.paginationOptions.pageSize) );
        },
        goToPage : function(pageNumber) {
            self.pagination.currentPage = pageNumber;
        },
        getCurrentPageItems : function() {
            var pageItems = [];
            pageItems = $scope.data.results.slice(self.pagination.currentPage * $scope.settings.paginationOptions.pageSize, (self.pagination.currentPage + 1) * (self.settings.paginationOptions.pageSize));
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
    $scope.$watch('searchText', function() {
        if ($scope.searchText === '') {
            self.isSearchTextActive = false;
            self.pagination.stopPagination = false;
        } else {
            self.isSearchTextActive = true;
            self.pagination.stopPagination = true;
        }
        // display all rows
        self.showAllRows();
    });
    self.showDropdownResults = function() {
        if (self.searchDropdown === '') {
            self.isDropdownActive = false;
            self.pagination.stopPagination = false;
        } else {
            self.pagination.stopPagination = true;
            self.isDropdownActive = true;
        }
    };
    self.getColumnOrder = function(){
        return self.settings.columnDefs[self.currentOrderByColumn].field;
    };
    self.orderIsActive = function($index) {
        if($index === self.currentOrderByColumn) {
            if(self.reverseOrder){
                return 'order-active-reverse';
            }else {
                return 'order-active';
            }
        }
    };
    self.hideShowColumn = function(columnIndex) {
        var hideArray, tempHidden = 0;
        // check if the column is hidden. if it is remove from array of hidden columns, if not hidden add it to the array
        tempHidden = self.hiddenColumns.indexOf(columnIndex);
        if ( tempHidden !== -1 ) {
            self.hiddenColumns.splice(tempHidden, 1);
        }else {
            self.hiddenColumns.push(columnIndex);
        }
    };
    self.isHidden = function(columnIndex) {
        if ( self.hiddenColumns.indexOf(columnIndex) !== -1 ) {
            return true
        }else {
            return false;
        }
    };
    self.getCustomColClass = function(columnIndex) {
        // get column class from config according to column index
        // Todo: use angular functions
        if (columnIndex !== undefined){
            return self.settings.columnDefs[columnIndex].class;
        }
    };
    // template storage object for these directives
    self.currentTemplates = {
        default: ''
    };

};