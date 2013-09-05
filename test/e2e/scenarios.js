'use strict';

/* jasmine specs for directives go here */

describe('rich data table', function() {

        describe('make sure the table got rendered', function() {
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

            describe('test that the table is rendered correctly', function() {
                var rdtTable;


                /**************** tests  *****************/
                describe('rich data table', function() {

                  beforeEach(function() {
                    browser().navigateTo('../../app/index.html');
                    sleep(1);
                  });

                    describe('index', function() {

                        beforeEach(function() {
                          browser().navigateTo('../../app/index.html');
                        });

                        it('should display names with "a" when typed in the search input"', function() {
                            input('searchText').enter('a');
                            expect(element('tbody').html()).toContain('Tiancum');
                        });

                        it('should display names with "b" when typed in the search input', function() {
                          input('searchText').enter('b');
                          expect(element('tbody').html()).toContain('Ballard');
                        });

                        it('should only display the name "sheppard" when typed in the search input', function() {
                          input('searchText').enter('sheppard');
                          expect(element('tbody').html()).toContain('Sheppard');
                          expect(element('tbody').html()).not().toContain('Jacob');
                        });

                        it('should display a second page name when the 2nd pagination link is clicked', function() {
                            element('div ul li:eq(2) a').click();
                            expect(element('tbody').html()).toContain('Rosella');
                        });

                        it('should display "Suzanne" when selected in the dropdown filter', function() {
                            input('searchDropdown').enter('Suzanne');
                            sleep(1);
                            expect(element('tbody').html()).toContain('Suzanne');
                        });

                    });

                });



                /**************** tests *****************/
            });

        });


});

