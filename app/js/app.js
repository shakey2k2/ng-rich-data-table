'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['rdt.directives', 'myApp.services', 'myApp.filters'])
    .run(function($templateCache,$http){
        // caching all templates from the start option 2
        //$http.get('templates/rdtActionButtons.html',{cache:$templateCache});
        //$templateCache.put('templates/rdtActionButtons.html', '<h1>rdtActionButtons.html inline template</h1>');
        //console.log('templateCache in run: ' + $templateCache.get('templates/rdtActionButtons.html'));
    })
;
