var app = angular.module('friends', ["ngRoute", "firebase"]);

app.config(function($routeProvider) {
	$routeProvider
	.when('/home', {
		templateUrl: 'templates/home.html',
		controller: 'homeCtrl'
	})
	.when('/friend/:github_username', {
		templateUrl: 'templates/friend.html',
		controller: 'friendCtrl'
	})
	.otherwise({
		redirectTo: '/home'
	})

});