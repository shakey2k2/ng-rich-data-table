'use strict';

/* jasmine specs for directives go here */

describe('directives', function() {
    var $scope;

    beforeEach(module('rdt.directives'));
    beforeEach(module('templates/mainTable.html'));
    beforeEach(module('templates/header.html'));
    beforeEach(module('templates/rdtBody.html'));
    beforeEach(module('templates/rdtFooter.html'));

    describe('rdt-table', function() {
        describe('make sure the table got rendered', function() {
            var sampleData = {
                data : [
                    {name: "Moroni",  age: 50},
                    {name: "Tiancum", age: 43},
                    {name: "Jacob",   age: 27},
                    {name: "Nephi",   age: 29},
                    {name: "Enos",    age: 34}
                ],
                columns : [
                    { key: 'name', label: 'Name' },
                    { key: 'age',  label: 'Age'  }
                ]
            };

            describe('test that the header is rendered correctly', function() {
                var rdtTable;

                beforeEach(inject(function($rootScope, $compile) {
                    // Setup scope with data
                    $rootScope.settings = sampleData;

                    // Create the actual table element and compile it
                    rdtTable = angular.element( '<table rdt-table settings="settings" cellpadding="0" cellspacing="0" border="1"></table>' );
                    $compile(rdtTable)($rootScope);

                    // Render it
                    $rootScope.$digest();
                }));

                it('should have the correct number of columns in the header', function() {
                    // Test number of column headers
                    var theadCols = rdtTable.find('thead tr th');
                    //console.log('theadCols is:'+ theadCols.length);
                    expect(theadCols.length).toBe(2);
                });

                it('should be in the correct order', function() {
                    var theadCols = rdtTable.find('thead tr th' );

                    // TODO: Find a better solution for this then having to
                    // put this inside of a jQuery object. There has to be an
                    // angular way to do this
                    expect($(theadCols[0]).html()).toBe('Name');
                    expect($(theadCols[1]).html()).toBe('Age');
                })
            });
        });
    });

});

