var app = angular.module('friends');

app.controller('friendCtrl', function($scope, events) {
	$scope.events = events;
})