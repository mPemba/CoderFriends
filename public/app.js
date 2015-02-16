var app = angular.module('friends', ["ngRoute"]);

app.config(function($routeProvider, $httpProvider) {

	$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    $httpProvider.interceptors.push('myHttpInterceptor');


	$routeProvider
	.when('/home', {
		templateUrl: 'templates/home.html',
		controller: 'homeCtrl',
		resolve: {
			friends: function(GithubService) {
				return GithubService.getFollowing();
			}
		}
	})
	.when('/friend/:github_username', {
		templateUrl: 'templates/friend.html',
		controller: 'friendCtrl',
		resolve: {
			events: function(GithubService, $route) {
				return GithubService.getEvents($route.current.params.github_username);
			}
		}
	})
	.otherwise({
		redirectTo: '/home'
	})

});

app.factory('myHttpInterceptor', function($q) {
	return {
		'responseError': function(rejection) {
			if (rejection.status === 403) {
				document.locaton = '/';
				return;
			}
			return $q.reject(rejection);
		}
	}
})