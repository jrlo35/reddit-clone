var app = angular.module('redditClone',['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

	$stateProvider
	.state('home', {
		url: '/home',
		templateUrl: '/home.html',
		controller: 'MainController'
	})
	.state('posts',{
		url: '/posts/{id}',
		templateUrl: '/posts.html',
		controller: 'PostsController'
	})
  $urlRouterProvider.otherwise('home');
}]);

app.controller('MainController', [
	'$scope', 'MainFactory', function($scope, MainFactory){

    $scope.posts = MainFactory.posts

    $scope.addPost = function(){
    	if(!$scope.title  || $scope.title === '' ){return;}
    	$scope.posts.push({
    		title: $scope.title,
        link: $scope.link,
        upvotes: 0,
        comments: [
        {author: 'Joe', body: 'Cool post!', upvotes: 0},
        {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}]
    	  
    	})
      $scope.title = '';
      $scope.link = '';
    }
    
    $scope.incrementUpvotes = function (post) {
      post.upvotes ++;
    }

}]);
app.controller('PostsController', [
	'$scope', '$stateParams','MainFactory', function($scope, $stateParams, MainFactory){
    $scope.post = MainFactory.posts[$stateParams.id];
    $scope.addComment = function (){
    	if(!$scope.body === ''){return;}
    	$scope.post.comments.push({
    		body: $scope.body,
    		author: 'user',
    		upvotes: 0
    	});
    	$scope.body = '';
    }
	}])


app.factory('MainFactory', [function(){
	var o = {
    posts: []
	};
	return o;
}])
