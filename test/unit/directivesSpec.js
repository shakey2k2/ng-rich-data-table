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
                settings: {
                    columns : [
                        { key: 'name', label: 'Name' },
                        { key: 'age',  label: 'Age'  }
                    ]
                }
            };

            describe('test that the table is rendered correctly', function() {
                var rdtTable;

                beforeEach(inject(function($rootScope, $compile) {
                    // Setup scope with data
                    $rootScope.config = sampleData;

                    // Create the actual table element and compile it
                    rdtTable = angular.element( '<table rdt-table config="config" cellpadding="0" cellspacing="0" border="1"></table>' );
                    $compile(rdtTable)($rootScope);

                    // Render it
                    $rootScope.$digest();
                }));

                describe('should render the header', function() {

                    it('should have the correct number of columns in the header', function() {
                        // Test number of column headers
                        var theadCols = rdtTable.find('thead tr th');
                        //console.log('theadCols is:'+ theadCols.length);
                        expect(theadCols.length).toBe(2);
                    });

                    it('header titles should be in the correct order', function() {
                        var theadCols = rdtTable.find('thead tr th' );

                        // TODO: Find a better solution for this then having to
                        // put this inside of a jQuery object. There has to be an
                        // angular way to do this
                        // -> like using angular.element or you mean something else?
                        expect(angular.element(theadCols[0]).html()).toBe('Name');
                        expect(angular.element(theadCols[1]).html()).toBe('Age');
                    })
                });

                describe('should render the body', function() {

                    it('should render all the rows in main table body according to data', function() {
                        var tRows = rdtTable.find('tbody tr' );
                        // total rows should be sampleData.data + header + footer
                        expect(tRows.length).toBe(sampleData.data.length);
                    })

                    it('should render the corresponding content in each column of main table body', function() {
                        var tBodyRows = rdtTable.find('tbody tr' ),
                        tBodyTd1, tBodyTd2,
                        firstColumnArray = [],
                        secondColumnArray = [];
                        // create array for testing with the columns in sample data
                        for (var i = 0; i <= sampleData.data.length - 1; i++) {
                            firstColumnArray.push(sampleData.data[i].name);
                            secondColumnArray.push(sampleData.data[i].age);
                        };
                        // test if the array contains the corresponding td column data
                        for (var i = 0; i <= tBodyRows.length - 1; i++) {
                            tBodyTd1 = angular.element(tBodyRows[i]).find('td')[0];
                            tBodyTd2 = angular.element(tBodyRows[i]).find('td')[1];
                            expect(firstColumnArray).toContain( angular.element(tBodyTd1).html() );
                            expect(secondColumnArray).toContain( parseInt( angular.element(tBodyTd2).html()) );
                        };

                    })

                    it('should order the rows by age after clicking', function() {
                        var theadCols = rdtTable.find('thead tr th' ),
                        tBodyRows,
                        ageFirstRow,
                        ageLastRow;

                        // click second column to order by age
                        angular.element(theadCols[1]).click();

                        // lowest age should be in the first row
                        tBodyRows = rdtTable.find('tbody tr' );
                        ageFirstRow = angular.element(tBodyRows[0]).find('td')[1];
                        ageLastRow = angular.element(tBodyRows[4]).find('td')[1];

                        // test first and last rows after clicking
                        expect( parseInt(angular.element(ageFirstRow).html()) ).toBe(27);
                        expect( parseInt(angular.element(ageLastRow).html()) ).toBe(50);
                        //console.log('full table after click: ' + angular.element(rdtTable).html());

                    })

                    it('should order the rows by name after clicking', function() {
                        var theadCols = rdtTable.find('thead tr th' ),
                        tBodyRows,
                        nameFirstRow,
                        nameLastRow;

                        // click first column to order by name
                        angular.element(theadCols[0]).click();
                                           
                        tBodyRows = rdtTable.find('tbody tr' );

                        // names should be ordered alphabetically
                        nameFirstRow = angular.element(tBodyRows[0]).find('td')[0];
                        nameLastRow = angular.element(tBodyRows[4]).find('td')[0];

                        // test first and last rows after clicking
                        expect( angular.element(nameFirstRow).html() ).toBe('Enos');
                        expect( angular.element(nameLastRow).html() ).toBe('Tiancum');

                    })

                    it('should hide the name column after clicking the hide name button', function() {
                        
                        var tableButtons = rdtTable.find('button');
                        console.log('table buttons: ' + angular.element(tableButtons[0]).html() );
                        angular.element(tableButtons[0]).click();
                        var tableCells = rdtTable.find('tbody td');

                        // test if the display attribute of a name cell is 'none'
                        expect( angular.element(tableCells[4]).css('display') ).toBe('none'); 

                    })

                });

                describe('should render the footer', function() {

                    it('should render footer rows', function() {
                        var tFooter = rdtTable.find('tfoot tr');
                        expect(tFooter.length).toBeGreaterThan(0);
                    })
                });

            });
        });
    });

});

