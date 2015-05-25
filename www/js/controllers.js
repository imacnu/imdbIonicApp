angular.module('starter.controllers', [])

.controller('DashCtrl',['$scope','imdbFactory','$ionicLoading','$stateParams', function($scope,imdbFactory,$ionicLoading,$stateParams) {

	$scope.okData = false;
	$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };

	$scope.search = function(keyword){
		$ionicLoading.show({template:'Loading ...'});
		imdbFactory.getFilms(keyword).then(function(data){
			$ionicLoading.hide();
			$scope.okData = true;
			$scope.films = data;
		});
	};
	var likes = 1;
	$scope.addLike = function(){
		$scope.likes = likes ++;
	};
}])

.controller('ChatsCtrl', function($scope, Chats) {
	$scope.chats = Chats.all();
	$scope.remove = function(chat) {
		Chats.remove(chat);
	};
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
	$scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
	$scope.settings = {
		enableFriends: true
	};
})

.factory('imdbFactory', ['$http', function($http){

	var getFilms = function(keyword){
		return $http.get('http://www.omdbapi.com/?t='+ keyword +'&y=&plot=short&r=json').then(function(response){
			return response.data;
		});
	};
	return{
		getFilms: getFilms
	};
}]);
