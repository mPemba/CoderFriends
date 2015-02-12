var app = angular.module('friends');

app.service('GithubService', function($http) {

	
	this.getFollowing = function() {
		return $http.get('/api/github/following');
	}




})