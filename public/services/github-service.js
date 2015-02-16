var app = angular.module('friends');

app.service('GithubService', function($http, $q) {


this.login = function() {
	var dfd = $q.defer();
	$http({
		method: 'GET',
		url: '/auth/github'
	})

	return dfd.promise
}

this.getFollowing = function() {
	var dfd = $q.defer();
	$http({
		method: 'GET', 
		url: '/api/github/following'
	}).then(function(res) {
		console.log(res);
		dfd.resolve(res.data);
	}, function(err) {
		dfd.reject(err);
	})
	return dfd.promise;
}

this.getEvents = function(username) {
	var dfd = $q.defer();
	$http({
		method: 'GET',
		url: '/api/github/' + username + '/activity'
	}).then(function(res) {
		console.log(res.data);
		dfd.resolve(res.data);
	}, function(err) {
		dfd.reject(err);
	})
	return dfd.promise;
}

})