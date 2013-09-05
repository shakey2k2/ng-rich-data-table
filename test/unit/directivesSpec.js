'use strict';

/* jasmine specs for directives go here */

describe('directives', function() {
    var $scope;

    beforeEach(module('rdt.directives'));
    beforeEach(module('myApp.filters'));
    beforeEach(module('templates/mainTable.html'));
    beforeEach(module('templates/header.html'));
    beforeEach(module('templates/rdtBody.html'));
    beforeEach(module('templates/rdtFooter.html'));
    beforeEach(module('templates/rdtToolbar.html'));
    beforeEach(module('templates/rdtPagination.html'));
    beforeEach(module('templates/rdtActionButtons.html'));
    beforeEach(module('templates/rdtIcons.html'));

    describe('rdt-table', function() {
        describe('table should get rendered', function() {
            var sampleData = {
                data : [
                        {name: "Moroni",  age: 50},
                        {name: "Tiancum", age: 43},
                        {name: "Jacob",   age: 27},
                        {name: "Nephi",   age: 29},
                        {name: "Enos",    age: 10}
                        ,{"name":"Sheppard","age":68},{"name":"Rosella","age":13},{"name":"Tessa","age":87},{"name":"Emilia","age":25},{"name":"Vera","age":74},{"name":"Hallie","age":76},{"name":"Mullen","age":99},{"name":"Celeste","age":23},{"name":"Lorna","age":15},{"name":"Suzanne","age":75},{"name":"Lillie","age":34},{"name":"Crane","age":62},{"name":"Maryann","age":45},{"name":"Amalia","age":57},{"name":"Cooper","age":46},{"name":"Christine","age":70},{"name":"Ware","age":50},{"name":"Mary","age":87},{"name":"Dennis","age":31},{"name":"Kerri","age":81},{"name":"Ballard","age":27},{"name":"Bobbie","age":43},{"name":"Willis","age":73},{"name":"Larsen","age":69}
                    ],
                    settings: {
                        columns : [
                            { key: 'name', label: 'Name', columnClass:'highVisGreen' },
                            { key: 'age',  label: 'Age', columnClass:'', customTmpl:'rdtActionButtons.html'  },
                            { key: 'extracol',  label: 'ExtraColumn', columnClass:'', customTmpl:'rdtIcons.html'  }
                        ],
                        useSearchInput: true,  // display rdt toolbar
                        filteringOptions: [
                            {value: 'name', label: 'Name'}
                        ],
                        paginationOptions:{
                            pageSize: 5,
                            enablePagination: true
                        }
                    }
                };

            describe('table compiles', function() {
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
                        expect(theadCols.length).toBe(3);
                    });

                    it('header titles should be in the correct order', function() {
                        var theadCols = rdtTable.find('thead tr th' );
                        expect(angular.element(theadCols[0]).html()).toBe('Name');
                        expect(angular.element(theadCols[1]).html()).toBe('Age');
                        expect(angular.element(theadCols[2]).html()).toBe('ExtraColumn');
                    })
                });

                describe('should render the body', function() {

                    it('should render all the rows in main table body according to data', function() {
                        var tRows = rdtTable.find('tbody tr' );
                        // total rows should be sampleData.data + header + footer
                        expect(tRows.length).toBe(sampleData.data.length);
                    })
                    /*
                    it('should render the corresponding content in each column of main table body', function() {
                        var tBodyRows = rdtTable.find('tbody tr' ),
                        tBodyTd1, tBodyTd2,
                        firstColumnArray = [],
                        secondColumnArray = [];
                        // create array for testing with the columns in sample data
                        for (var i = 0; i <= sampleData.settings.paginationOptions.pageSize - 1; i++) {
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
                    */

                    it('should order the rows by age after clicking', function() {
                        var theadCols = rdtTable.find('thead tr th' ),
                        tBodyRows,
                        ageFirstRow,
                        ageLastRow;
                        // click second column to order by age
                        angular.element(theadCols[1]).click();

                        // lowest age should be in the first row
                        tBodyRows = rdtTable.find('tbody tr' );
                        ageFirstRow = angular.element(tBodyRows[0]).find('td a img')[1];
                        ageLastRow = angular.element(tBodyRows[0+1]).find('td a img')[1];
                        // test first and second row after clicking
                        expect( parseInt(ageFirstRow.getAttribute('alt')) ).toBeLessThan( parseInt(ageLastRow.getAttribute('alt')));

                    })

                    it('should reverse order the rows by age after clicking', function() {
                        var theadCols = rdtTable.find('thead tr th' ),
                            tBodyRows,
                            ageFirstRow,
                            ageLastRow;
                        // click second column to order by age
                        angular.element(theadCols[1]).click();
                        angular.element(theadCols[1]).click();

                        // lowest age should be in the first row
                        tBodyRows = rdtTable.find('tbody tr' );
                        ageFirstRow = angular.element(tBodyRows[0]).find('td a img')[1];
                        ageLastRow = angular.element(tBodyRows[0+1]).find('td a img')[1];
                        // test first and second row after clicking two times
                        expect( parseInt(ageLastRow.getAttribute('alt')) ).toBeLessThan( parseInt(ageFirstRow.getAttribute('alt')));

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
                        nameFirstRow = angular.element(tBodyRows[0]).find('td span')[0];
                        nameLastRow = angular.element(tBodyRows[4]).find('td span')[0];

                        // test first and last rows after clicking
                        expect( angular.element(nameFirstRow).html() ).toBe('Amalia');
                        expect( angular.element(nameLastRow).html() ).toBe('Christine');

                    })

                    it('should hide the name column after clicking the hide name button', function() {
                        var tableButtons = rdtTable.find('button');
                        angular.element(tableButtons[0]).click();
                        var tableCells = rdtTable.find('tbody td');
                        // test if the display attribute of a name cell is 'none'
                        expect( angular.element(tableCells[0]).css('display') ).toBe('none');
                    })

                });

                describe('should render the footer', function() {

                    it('should render footer rows', function() {
                        var tFooter = rdtTable.find('tfoot tr');
                        expect(tFooter.length).toBeGreaterThan(0);
                    })
                });



                describe('should render the toolbar', function() {

                    it('if display toolbar is set in config', function() {
                        // check if toolbar was created
                        if (sampleData.settings.useSearchInput) {
                            var toolbar = angular.element(rdtTable.find('div')[0])[0];
                            expect(angular.element(toolbar).attr('rdt-toolbar')).toBe('');
                        }
                    })
                });

                describe('pagination', function() {

                    it('should display the correct number of visible rows according to defined page size', function() {
                        var tBodyRows = rdtTable.find('tbody tr'),
                            totalVisibleRows = 0;
                        for (var i = 0; i < tBodyRows.length; i++) {
                            if ( angular.element(tBodyRows[i]).css('display') !== ('none') ) {
                                totalVisibleRows++;
                            }
                        }
                        // check if visible rows are the same as the page size
                        expect( parseInt(totalVisibleRows) ).toBe(sampleData.settings.paginationOptions.pageSize);
                    })

                    it('should display a different page after clicking in the next page number button', function() {
                        // get current displayed first row name and save
                        var tBodyRows = rdtTable.find('tbody tr'),
                            paginationButtons = rdtTable.find('div.rdt-pagination ul li a');
                        // first row display is standard
                        expect(angular.element(tBodyRows[0]).css('display')).toBe('');
                        // click on 2nd page button
                        angular.element(paginationButtons[2]).click();
                        // first row display is none after clicking next page, so is not visible
                        expect(angular.element(tBodyRows[0]).css('display')).toBe('none');
                     })
                });

            });

        });
    });

});

