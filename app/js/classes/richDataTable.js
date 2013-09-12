/**
 * Rich Data Table Class
 */
var richDataTable = function ($scope, options, $templateCache, $http, $q, Items) {
    var defaults = {
        "columnDefs" : [
            {
                "field": "name",
                "displayLabel":"Name",
                "class": "highVisGreen"
            },
           {
                "field": "age",
                "displayLabel":"Age",
                "class": ""
            }
        ],
        "useSearchInput": true,
        "filterOptions": [
            { "value": "name", "displayLabel":"Name" }
        ],
        "paginationOptions": {
            "pageSize": 999,
            "enablePagination": false
        },
        "hideHeader": false,
        "displayValue": undefined,

        // default templates
        "mainTable": "mainTable",
        "rdtBody": "rdtBody",
        "rdtFooter": "rdtFooter",
        "header": "header",
        "rdtTdContent": "rdtTdContent",
        "rdtPagination": "rdtPagination",
        "rdtToolbar": "rdtToolbar",
        "rdtIcons": "rdtIcons"
    },
    self = this;

    // merge with options
    self.config = $.extend(defaults, window.richDataTable.config, options);

    // self vars



    // get templates
    self.initTemplates = function() {
        var templates = ['mainTable', 'rdtBody','rdtFooter','header','rdtPagination','rdtToolbar','rdtIcons'];
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

        if (t) {
            $http.get(uKey, {
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
            defaults = Items.query();
            $scope.data = defaults;
        });
    };

    // pagination
    self.pagination = {
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
    self.displayValue = angular.isDefined(defaults.displayValue) ? defaults.displayValue : undefined;
    self.getValue = function( data, columnDef ) {
        // if displayValue is a function overrides getValue
        if(angular.isFunction(self.displayValue)) {
            return self.displayValue(data, columnDef);
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
        var dataSetObj = $scope.data.results,
            sortingKey = $scope.settings.columnDefs[indexColumn].field;
        dataSetObj.sort(self.sortByKey(sortingKey,$scope.reverseOrder,function(a){return a}));
        $scope.reverseOrder = !$scope.reverseOrder;
        $scope.currentOrderByColumn = indexColumn;
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
            $scope.isSearchTextActive = false;
            $scope.pagination.stopPagination = false;
        } else {
            $scope.isSearchTextActive = true;
            $scope.pagination.stopPagination = true;
        }
        // display all rows
        self.showAllRows();
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
        return self.settings.columnDefs[self.currentOrderByColumn].field;
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
        if ( angular.isDefined(columnIndex)){
            return self.settings.columnDefs[columnIndex].class;
        }
    };
    // template storage object for these directives
    self.currentTemplates = {
        default: ''
    };
    self.compileTemplate = function(scope, iElement, iAttrs, templateName) {
        iElement.append($compile($templateCache.get(templateName))(scope));
        return  null;
    };

    //$scope vars
    $scope.settings = self.config;
    $scope.getValue = self.getValue;
    $scope.currentOrderByColumn = self.currentOrderByColumn;
    $scope.hiddenColumns = self.hiddenColumns;
    $scope.reverseOrder = self.reverseOrder;
    $scope.sorting = self.sorting;
    $scope.orderIsActive = self.orderIsActive;
    $scope.showRows = self.showRows;
    $scope.shoAllRows = self.showAllRows;
    $scope.searchText = self.searchText;
    $scope.isSearchTextActive = self.isSearchTextActive;
    $scope.isDropdownActive = self.isDropdownActive;
    $scope.compileTemplate = self.compileTemplate;
    $scope.hideShowColumn = self.hideShowColumn;
    $scope.isHidden = self.isHidden;
    $scope.pagination = self.pagination;
    $scope.showDropdownResults = self.showDropdownResults;
};