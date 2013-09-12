'use strict';

/* jasmine specs for directives go here */

describe('rich data table', function() {

        describe('make sure the table got rendered', function() {

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

