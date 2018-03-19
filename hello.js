var myApp = angular.module('hello', ['ui.router']);

myApp.config(function ($stateProvider) {
    // An array of state definitions
    var states = [
        {name: 'hello', url: '/hello', component: 'hello'},

        {
            name: 'about',
            url: '/about',
            component: 'about'
        },

        {
            name: 'people',
            url: '/people',
            component: 'people',
            resolve: {
                people: function (PeopleService) {
                    return PeopleService.getAllPeople();
                }
            }
        },

        {
            name: 'people.person',
            url: '/{personId}',
            component: 'person',
            resolve: {
                person: function (people, $stateParams) {
                    return people.find(function (person) {
                        return person.id === $stateParams.personId;
                    });
                }
            }
        }
    ];

    // Loop over the state definitions and register them
    states.forEach(function (state) {
        $stateProvider.state(state);
    });
});


myApp.run(function ($http, $uiRouter, $transitions, $location, $rootScope) {
    var Visualizer = window['ui-router-visualizer'].Visualizer;
    $uiRouter.plugin(Visualizer);
    $http.get('data/people.json', {cache: true});

    $rootScope.appName = 'S&H';

    $rootScope.setName = function () {
        $rootScope.appName = Math.floor(Math.random() * 100);
        console.log('setting app name to: ' + appName);
    };

    // listen for successful transitions..
    $transitions.onSuccess({}, function (transition) {
        console.log('state was sucessfully changed.. ' + transition.to());

        // console.log('$location.path', $location.path);

        //push the event to datalayer.
        window.dataLayer.push({
            event: 'pageViewees',
            action: $location.path(),
        });
    });


});


(function (myApp) {
    "use strict";
    myApp.controller('koi', function ($scope) {
        $scope.appName = 'S&H';

        $scope.setName = function () {
            $scope.appName = Math.floor(Math.random() * 100);
            console.log('setting app name to: ' + $scope.appName);
        };
    });
})(myApp);