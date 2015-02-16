var app = angular.module("friends");

app.controller('homeCtrl', function($scope, friends) {
	$scope.friends = friends;
})


// app.controller('homeCtrl', function($scope, $rootScope, GithubService) {
// 	$scope.getData = function(res) {
// 		$scope.friends = GithubService.getFollowing();
// 		console.log(res);
// 	}
// })