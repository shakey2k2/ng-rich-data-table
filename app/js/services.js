'use strict';

/* Services */


angular.module('myApp.services', [])
 	.factory('Items', function () {
      var items = {},
          data = {};
      items.query = function () {
        return  {

            results: [
                {name: "Moroni",  age: 50},
                {name: "Tiancum", age: 43},
                {name: "Jacob",   age: 27},
                {name: "Nephi",   age: 29},
                {name: "Enos",    age: 34}
                ,{"name":"Sheppard","age":68},{"name":"Rosella","age":13},{"name":"Tessa","age":87},{"name":"Emilia","age":25},{"name":"Vera","age":74},{"name":"Hallie","age":76},{"name":"Mullen","age":99},{"name":"Celeste","age":23},{"name":"Lorna","age":15},{"name":"Suzanne","age":75},{"name":"Lillie","age":34},{"name":"Crane","age":62},{"name":"Maryann","age":45},{"name":"Amalia","age":57},{"name":"Cooper","age":46},{"name":"Christine","age":70},{"name":"Ware","age":50},{"name":"Mary","age":87},{"name":"Dennis","age":31},{"name":"Kerri","age":81},{"name":"Ballard","age":27},{"name":"Bobbie","age":43},{"name":"Willis","age":73},{"name":"Larsen","age":69}

            ]

		};
      };
      return items;
    })
    .factory('RDTSettings', function () {
        var settings = {};

        settings.query = function () {
            return  {
                "settings" : {
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
                        "pageSize": 8,
                        "enablePagination": true
                    },
                    "hideHeader": false,
                    "displayValue": undefined //function(a,b){return "return result here"}
                }

            };
        };
        return settings;
    });