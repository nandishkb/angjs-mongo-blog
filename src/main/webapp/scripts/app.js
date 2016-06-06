/**
 * 
 */
(function() {
	var app = angular.module('blog', ['ngRoute', 'ui-notification']);
	
	app.controller('NavbarController', function($timeout, $scope, $rootScope) {
		
		$scope.loggedIn = false;
		
		$timeout(function() {
			console.log("timed out");
			$rootScope.$broadcast("performLogin");
		});
		

		$rootScope.$on("loginSuccess", function() {
			console.log("Success");
			$scope.loggedIn = true;
	    });
		
		$rootScope.$on("loginFailure", function() {
			console.log("Failure");
			$scope.loggedIn = false;
	    });
		
		$rootScope.$on("logout", function() {
			console.log("logout successful");
			$scope.loggedIn = false;
	    });

	});
	
	app.directive('siteFeatures', function() {
		return {
			retrict: 'E',
			templateUrl: "templates/site-features.html"
		};
	});
	
	app.controller('RegisterController', function($scope, $http, Notification) {
		$scope.adding = false;
		$scope.registerUser = function(userData) {
			console.log("Register Method called");
			console.log(userData);
			$scope.adding = true;
			var promise = $http.post("blog/techspace/user/register", userData);
			promise.success(function() {
				$scope.adding=false;
				Notification.success('Registration Successful. Please login now.');
				document.getElementById("register-nav").reset();
			});
			promise.error(function() {
				$scope.adding=false;
				Notification.error('Registration Failed. Please try again.');
				console.log("Error in adding user")
			});
		};
	});
	
	app.controller('LoginController', function($scope, $rootScope, $http, Notification) {

		$scope.logginIn = false;
		$scope.loginUser = function(credentials) {
			console.log("Login Method called");
			console.log(credentials);
			$scope.logginIn = true;
			var promise = $http.post("blog/techspace/user/login", credentials);
			promise.success(function() {
				$scope.logginIn=false;
				Notification.success('Login Successful.');
				document.getElementById("login-nav").reset();
				$scope.emitLoginStatus(true);
			});
			promise.error(function() {
				$scope.adding=false;
				Notification.error('Login Failed. Check your username/password and try again.');
				document.getElementById("login-nav").reset();
				console.log("Error in loggin in");
				$scope.emitLoginStatus(false);
			});
		};
		$scope.emitLoginStatus = function(data) {
			console.log(data);
			if (data) {
				$rootScope.$emit("loginSuccess");
			} else {
				$rootScope.$emit("loginFailure");
			}
        }
		
		$rootScope.$on("performLogin", function() {
			console.log("start login process");
			$scope.loginUser({});
	    });
	});
	
	app.controller('LogoutController', function($scope, $rootScope, $http, Notification) {

		$scope.logout = function() {
			console.log("Logout Method called");
			var promise = $http.get("blog/techspace/user/logout");
			promise.success(function() {
				Notification.success('Logout Successful.');
				$scope.emitLogoutStatus(true);
			});
			promise.error(function() {
				Notification.error('Logout error');
				console.log("Error in loggout");
				$scope.emitLogoutStatus(false);
			});
		};
		$scope.emitLogoutStatus = function(data) {
			console.log(data);
			if (data) {
				$rootScope.$emit("logout");
			} else {
				$rootScope.$emit("logout");
			}
        }
	});
	
	app.controller('AskQuestionController', function($scope, $http, Notification) {
		$scope.adding = false;
		$scope.submitQuestion = function(question) {
			console.log("Submit Question Method called");
			console.log(question);
			$scope.adding = true;
			var promise = $http.post("blog/techspace/question", question);
			promise.success(function() {
				$scope.adding=false;
				Notification.success('Question successfully posted');
				document.getElementById("register-nav").reset();
			});
			promise.error(function() {
				$scope.adding=false;
				Notification.error('Failed to post Question. Please try again.');
				console.log("Error in posting Question");
			});
		};
	});
	
	app.controller('ViewQuestionsController', function($scope, $http, Notification) {
		$scope.isShown = false;
		var promise = $http.get("blog/techspace/questions");
		
		promise.success(function(data) {
			$scope.questions = data;
			console.log("success in retrieving questions");
			$scope.isShown = true;
		});
		promise.error (function() {
			Notification.error('There was a problem retrieving questions from server. Try again after some time.');
			console.log("error in retriving questions")
			$scope.questions = questions_sample;
			$scope.isShown = true;
		});
	});
	
	app.controller('SearchQuestionsController', function($scope, $http, Notification) {
		$scope.isSearching = false;
		
		$scope.searchQuestion = function(searchString) {
			$scope.isSearching = true;
			var promise = $http.get("blog/techspace/questions/"+searchString);
			
			promise.success(function(data) {
				$scope.questions = data;
				console.log("success in searching questions");
				$scope.isSearching = false;
				Notification.success('Search completed with '+data.length+' results');
				document.getElementById("search-nav").reset();
			});
			promise.error (function() {
				Notification.error('There was a problem retrieving questions from server. Try again after some time.');
				console.log("error in retriving questions")
				$scope.questions = questions_sample;
				$scope.isSearching = false;
			});
		};
		
		
	});
	
	var questions_sample = [
         {
        	 title: "C++ Read a C++ book or from online Read a C++ book or from online Read a C++ book or from online ",
        	 description: "I want to learn C++ Read a C++ book or from online Read a C++ book or from online Read a C++ book or from online ",
        	 answers: [
	            {
        		 	answerId: 1,
        		 	data: "Read a C++ book or from online "
        	 	},
        	 	{
        	 		answerId: 2,
        		 	data: "Come home I'll teach you"
        	 	}
        	 ]
         },
         {
        	 title: "Java",
        	 description: "I want to learn Java",
        	 answers: [
	            {
        		 	answerId: 3,
        		 	data: "Read a Java book or from online"
        	 	},
        	 	{
        	 		answerId: 4,
        		 	data: "Come home I'll teach you"
        	 	}
        	 ]
         },
         {
        	 title: "HTML",
        	 description: "I want to learn HTML",
        	 answers: [
	            {
        		 	answerId: 3,
        		 	data: "Read a HTML book or from online"
        	 	},
        	 	{
        	 		answerId: 4,
        		 	data: "Come home I'll teach you"
        	 	}
        	 ]
         },
         {
        	 title: "HTML",
        	 description: "I want to learn HTML",
        	 answers: [
	            {
        		 	answerId: 3,
        		 	data: "Read a HTML book or from online"
        	 	},
        	 	{
        	 		answerId: 4,
        		 	data: "Come home I'll teach you"
        	 	}
        	 ]
         },
         {
        	 title: "HTML",
        	 description: "I want to learn HTML",
        	 answers: [
	            {
        		 	answerId: 3,
        		 	data: "Read a HTML book or from online"
        	 	},
        	 	{
        	 		answerId: 4,
        		 	data: "Come home I'll teach you"
        	 	}
        	 ]
         },
         {
        	 title: "HTML",
        	 description: "I want to learn HTML",
        	 answers: [
	            {
        		 	answerId: 3,
        		 	data: "Read a HTML book or from online"
        	 	},
        	 	{
        	 		answerId: 4,
        		 	data: "Come home I'll teach you"
        	 	}
        	 ]
         },
         {
        	 title: "HTML",
        	 description: "I want to learn HTML",
        	 answers: [
	            {
        		 	answerId: 3,
        		 	data: "Read a HTML book or from online"
        	 	},
        	 	{
        	 		answerId: 4,
        		 	data: "Come home I'll teach you"
        	 	}
        	 ]
         },
         {
        	 title: "HTML",
        	 description: "I want to learn HTML",
        	 answers: [
	            {
        		 	answerId: 3,
        		 	data: "Read a HTML book or from online"
        	 	},
        	 	{
        	 		answerId: 4,
        		 	data: "Come home I'll teach you"
        	 	}
        	 ]
         },{
        	 title: "C++ Read a C++ book or from online Read a C++ book or from online Read a C++ book or from online ",
        	 description: "I want to learn C++ Read a C++ book or from online Read a C++ book or from online Read a C++ book or from online ",
        	 answers: [
	            {
        		 	answerId: 1,
        		 	data: "Read a C++ book or from online "
        	 	},
        	 	{
        	 		answerId: 2,
        		 	data: "Come home I'll teach you"
        	 	}
        	 ]
         },{
        	 title: "C++ Read a C++ book or from online Read a C++ book or from online Read a C++ book or from online ",
        	 description: "I want to learn C++ Read a C++ book or from online Read a C++ book or from online Read a C++ book or from online ",
        	 answers: [
	            {
        		 	answerId: 1,
        		 	data: "Read a C++ book or from online "
        	 	},
        	 	{
        	 		answerId: 2,
        		 	data: "Come home I'll teach you"
        	 	}
        	 ]
         },{
        	 title: "C++ Read a C++ book or from online Read a C++ book or from online Read a C++ book or from online ",
        	 description: "I want to learn C++ Read a C++ book or from online Read a C++ book or from online Read a C++ book or from online ",
        	 answers: [
	            {
        		 	answerId: 1,
        		 	data: "Read a C++ book or from online "
        	 	},
        	 	{
        	 		answerId: 2,
        		 	data: "Come home I'll teach you"
        	 	}
        	 ]
         },{
        	 title: "C++ Read a C++ book or from online Read a C++ book or from online Read a C++ book or from online ",
        	 description: "I want to learn C++ Read a C++ book or from online Read a C++ book or from online Read a C++ book or from online ",
        	 answers: [
	            {
        		 	answerId: 1,
        		 	data: "Read a C++ book or from online "
        	 	},
        	 	{
        	 		answerId: 2,
        		 	data: "Come home I'll teach you"
        	 	}
        	 ]
         },{
        	 title: "C++ Read a C++ book or from online Read a C++ book or from online Read a C++ book or from online ",
        	 description: "I want to learn C++ Read a C++ book or from online Read a C++ book or from online Read a C++ book or from online ",
        	 answers: [
	            {
        		 	answerId: 1,
        		 	data: "Read a C++ book or from online "
        	 	},
        	 	{
        	 		answerId: 2,
        		 	data: "Come home I'll teach you"
        	 	}
        	 ]
         },{
        	 title: "C++ Read a C++ book or from online Read a C++ book or from online Read a C++ book or from online ",
        	 description: "I want to learn C++ Read a C++ book or from online Read a C++ book or from online Read a C++ book or from online ",
        	 answers: [
	            {
        		 	answerId: 1,
        		 	data: "Read a C++ book or from online "
        	 	},
        	 	{
        	 		answerId: 2,
        		 	data: "Come home I'll teach you"
        	 	}
        	 ]
         }
     ];	
})();