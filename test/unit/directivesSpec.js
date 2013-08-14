'use strict';

/* jasmine specs for directives go here */

describe('directives', function() {
  beforeEach(module('rdt.directives'));
  beforeEach(module('myApp.services'));

  beforeEach(inject(function ($compile, $rootScope, $templateCache) {
    describe('rdtTable directive', function() {
      var compile,
      scope,
      rdtTable;
     
      /* IF $httpBackend REMOVED i get this ERROR 
      Chrome 28.0.1500 (Windows 7) rdtTable directive encountered a declaration exception FAILED
              Error: Unexpected request: GET templates/mainTable.html
              No more request expected*/
     /* var $httpBackend;
      beforeEach(inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.whenGET('templates/mainTable.html').passThrough();
      })); 
      */
      // also tried : http://stackoverflow.com/questions/15214760/unit-testing-angularjs-directive-with-templateurl?rq=1
      // but returns ERROR TypeError: Cannot set property 'typeName' of undefined
      $templateCache.put('templates/mainTable.html', '<thead rdt-header></thead> <tfoot rdt-footer></tfoot><tbody rdt-body></tbody>');

      compile = $compile;
      scope = $rootScope;
      rdtTable = angular.element($templateCache.get('templates/mainTable.html'));
      compile(rdtTable)(scope);
      scope.$digest();

      it('should check if td elements in main table are created', function(){
        
        var tds = rdtTable.find('td');
        console.log('tds are:'+ tds.lenght);
        expect(tds.lenght).toBeGreaterThan(0);
      });
    }); 

    describe('rdtHeader directive', function() {
      it('should check if rdt-header th elements are created', function(){
        inject(function($compile, $rootScope) {
          var element = $compile('<thead rdt-header></thead>')($rootScope);

          console.log(JSON.stringify(element));
          var ths = element.find('th');
          console.log('ths are:'+ ths.lenght);
          expect(element.lenght).toBeGreaterThan(0);
        }); 
      });
    });

  }));



  describe('app-version', function() {
    it('should print current version', function() {
      module(function($provide) {
        $provide.factory('Items', 'TEST_VER');
      });
      inject(function($compile, $rootScope) {
        var element = $compile('<span app-version></span>')($rootScope);
        expect(element.text()).toEqual('TEST_VER');
      });
    });
  });


});
