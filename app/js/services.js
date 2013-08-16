'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
 	.factory('Items', function () {
      var items = {};
      items.query = function () {
        // data from server here
        return  {
            data: [
                {name: "Moroni",  age: 50},
                {name: "Tiancum", age: 43},
                {name: "Jacob",   age: 27},
                {name: "Nephi",   age: 29},
                {name: "Enos",    age: 34}
            ],
            columns: [
                { key: 'name', label: 'Name' },
                { key: 'age',  label: 'Age'  }
            ]
		};
      };
      return items;
    });