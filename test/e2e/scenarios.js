'use strict';

/* jasmine specs for directives go here */

describe('directives', function() {
    var $scope;
/*
    beforeEach(angular.module('rdt.directives'));
    beforeEach(angular.module('templates/mainTable.html'));
    beforeEach(angular.module('templates/header.html'));
    beforeEach(angular.module('templates/rdtBody.html'));
    beforeEach(angular.module('templates/rdtFooter.html'));
    beforeEach(angular.module('templates/rdtToolbar.html'));
*/

        describe('make sure the table got rendered', function() {
            var sampleData = {
                    data : [
                        {name: "Moroni",  age: 50},
                        {name: "Tiancum", age: 43},
                        {name: "Jacob",   age: 27},
                        {name: "Nephi",   age: 29},
                        {name: "Enos",    age: 34}
                    ],
                    settings: {
                        columns : [
                            { key: 'name', label: 'Name' },
                            { key: 'age',  label: 'Age'  }
                        ],
                        useSearchInput: 1,  // display rdt toolbar
                        filteringOptions: [
                            {value: 'name', label: 'Name'}
                        ]
                    }
                };

            describe('test that the table is rendered correctly', function() {
                var rdtTable;
/*
                beforeEach(inject(function($rootScope, $compile) {
                    // Setup scope with data
                    $rootScope.config = sampleData;

                    // Create the actual table element and compile it
                    rdtTable = angular.element( '<table rdt-table config="config" cellpadding="0" cellspacing="0" border="1"></table>' );
                    $compile(rdtTable)($rootScope);

                    // Render it
                    $rootScope.$digest();
                }));
*/
/**************** tests  *****************/
                describe('rich data table', function() {

                  beforeEach(function() {
                    browser().navigateTo('../../app/index.html');
                  });


                  it('should automatically redirect to /view1 when location hash/fragment is empty', function() {
                    expect(browser().location().url()).toBe("/index.html");
                  });

                  describe('index', function() {

                    beforeEach(function() {
                      browser().navigateTo('../../app/index.html');
                    });


                    it('should render index when user navigates to /index', function() {
                      expect(browser().location().url()).toBe("/");
                    });
                    
                    it('should render input', function() {
                      expect(element('[ng-model="searchText"]').html()).
                        toMatch(/partial for view 1/);
                       console.log('input: ' + element('[ng-model="searchText"]') ) ;
                    }); 

                  });

                  describe('view1', function() {

                    beforeEach(function() {
                      browser().navigateTo('#/view1');
                    });


                    it('should render view1 when user navigates to /view1', function() {
                      expect(element('[ng-view] p:first').text()).
                        toMatch(/partial for view 1/);
                    });

                  });


                  describe('view2', function() {

                    beforeEach(function() {
                      browser().navigateTo('#/view2');
                    });


                    it('should render view2 when user navigates to /view2', function() {
                      expect(element('[ng-view] p:first').text()).
                        toMatch(/partial for view 2/);
                    });

                  });

                });



/**************** tests *****************/
            });

        });


});

