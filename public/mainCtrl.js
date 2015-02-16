var app = angular.module('friends');

app.controller('mainCtrl', function($scope, githubService) {
	$scope.login = function() {
		githubService.login();
	}
})