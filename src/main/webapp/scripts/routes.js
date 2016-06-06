/**
 * 
 */
(function(){
	angular.module('blog').config(function($routeProvider) {
		$routeProvider.when('/home', {
			templateUrl: "templates/home.html"
		}).when('/about', {
			templateUrl: "templates/about.html"
		}).when('/ask-questions', {
			templateUrl: "templates/ask-questions.html"
		}).when('/view-questions', {
			templateUrl: "templates/view-questions.html"
		}).when('/search-questions', {
			templateUrl: "templates/search-questions.html"
		}).when('/join-us', {
			templateUrl: "templates/join-us.html"
		}).when('/contact-us', {
			templateUrl: "templates/contact-us.html"
		}).when('/not-supported', {
			templateUrl: "templates/not-supported.html"
		}).when('/auth-failed', {
			templateUrl: "templates/auth-failed.html"
		}).otherwise({
			redirectTo: '/home'
		});;
	});
})();