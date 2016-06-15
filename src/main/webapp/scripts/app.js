/**
 * 
 */
(function() {
	var app = angular.module('blog', ['ngRoute', 'ui-notification', 'ngCookies']);
	
	app.controller('NavbarController', function($timeout, $scope, $rootScope, $location) {
		
		$scope.loggedIn = false;
		
		$timeout(function() {
			console.log("timed out");
			$rootScope.$broadcast("performLogin");
		});
		

		$rootScope.$on("loginSuccess", function() {
			console.log("Success");
			$scope.loggedIn = true;
			$location.url('/home');
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
			var promise = $http.post("techblog/techspace/user/register", userData);
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
	
	app.controller('LoginController', function($scope, $rootScope, $http, Notification, $cookieStore) {

		$scope.loginUser = function(credentials) {
			console.log("Login Method called");
			console.log(credentials);
			var checkLoginPossible = false;
			// Trying to login during page refresh
			if (credentials.userName === undefined) { 
				$rootScope.globals = $cookieStore.get('globals') || {};
				console.log("userName === undefined")
		        if ($rootScope.globals.currentUser) {
		        	console.log("Found user details in cookie");
		        	console.log("Found = "+$rootScope.globals.currentUser.authdata);
		        	console.log("Found = "+$rootScope.globals.currentUser.userName);
		            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
		            checkLoginPossible = true;
		        }
			} else {
				console.log('userName !== undefined')
				var auth = btoa(credentials.userName + ":" + credentials.password);
				$http.defaults.headers.common['Authorization'] = 'Basic ' + auth;
				console.log(auth);
				checkLoginPossible = true;
			}
			
			if (checkLoginPossible) {
				var promise = $http.get("techblog/techspace/user/login");
				promise.success(function() {
					Notification.success('Login Successful.');
					document.getElementById("login-nav").reset();
					$scope.emitLoginStatus(true);
					if (credentials.userName !== undefined) {
						setCredentials(credentials.userName, credentials.password);
					}
				});
				promise.error(function() {
					Notification.error('Login Failed. Check your username/password and try again.');
					document.getElementById("login-nav").reset();
					console.log("Error in loggin in");
					$scope.emitLoginStatus(false);
				});
			}
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
			$scope.loginUser({});
	    });
		
		function setCredentials(username, password) {
            var authdata = btoa(username + ":" + password)
 
            $rootScope.globals = {
                currentUser: {
                    'userName': username,
                    'authdata': authdata
                }
            };
 
            $cookieStore.put('globals', $rootScope.globals);
        }
		
	});
	
	app.controller('LogoutController', function($scope, $rootScope, $http, Notification, $cookieStore) {

		$scope.logout = function() {
			console.log("Logout Method called");
			var promise = $http.get("techblog/techspace/user/logout");
			promise.success(function() {
				Notification.success('Logout Successful.');
				$scope.emitLogoutStatus(true);
				resetData();
			});
			promise.error(function() {
				Notification.error('Logout error');
				console.log("Error in loggout");
				$scope.emitLogoutStatus(false);
				resetData();
			});
		};
		$scope.emitLogoutStatus = function(data) {
			console.log(data);
			if (data) {
				$rootScope.$emit("logout");
			} else {
				$rootScope.$emit("logout");
			}
        };
		
		function resetData() {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = '';
        };
	});
	
	app.controller('AskQuestionController', function($scope, $rootScope, $http, Notification, $location, $cookieStore) {
		$scope.adding = false;
		$scope.submitQuestion = function(question) {
			console.log("Submit Question Method called");
			console.log(question);
			$scope.adding = true;
			addUserName(question);
			console.log(question);
			var promise = $http.post("techblog/techspace/question", question);
			promise.success(function() {
				$scope.adding=false;
				Notification.success('Question successfully posted');
				document.getElementById("ask-question-nav").reset();
			});
			promise.error(function(response, status) {
				$scope.adding=false;
				Notification.error('Failed to post Question. Please try again.');
				console.log("Error in posting Question");
				if (status === 401) {
					console.log('Authentication failed. Redirecting to error page');
					$rootScope.$emit("logout");
					$location.url('/auth-failed');
				}
			});
		};
		
		function addUserName(q) {
			$rootScope.globals = $cookieStore.get('globals') || {};
	        if ($rootScope.globals.currentUser) {
	        	console.log("Found user details in cookie");
	        	console.log("Found = "+$rootScope.globals.currentUser.authdata);
	        	console.log("Found = "+$rootScope.globals.currentUser.userName);
	        	q.userName = $rootScope.globals.currentUser.userName;
	        } else {
	        	console.log("Error in adding user. So adding anonymous user name");
	        	q.userName = "Anonymous";
	        }
		}
	});
	
	app.controller('ViewQuestionsController', function($scope, $rootScope, $http, Notification, $location) {
		$scope.isShown = false;
		var promise = $http.get("techblog/techspace/questions");
		
		promise.success(function(data) {
			$scope.questions = data;
			console.log("success in retrieving questions");
			$scope.isShown = true;
		});
		promise.error (function(response, status) {
			Notification.error('There was a problem retrieving questions from server. Try again after some time.');
			console.log("error in retriving questions");
			console.log(status);
			$scope.isShown = true;
			if (status === 401) {
				console.log('Authentication failed. Redirecting to error page');
				$rootScope.$emit("logout");
				$location.url('/auth-failed');
			}
		});
	});
	
	app.controller('SearchQuestionsController', function($scope, $rootScope, $http, Notification, $location) {
		$scope.isSearching = false;
		
		$scope.searchQuestion = function(searchString) {
			$scope.isSearching = true;
			var promise = $http.get("techblog/techspace/questions/"+searchString);
			
			promise.success(function(data) {
				$scope.questions = data;
				console.log("success in searching questions");
				$scope.isSearching = false;
				Notification.success('Search completed with '+data.length+' results');
				document.getElementById("search-nav").reset();
			});
			promise.error (function(response, status) {
				Notification.error('There was a problem retrieving questions from server. Try again after some time.');
				console.log("error in retriving questions")
				$scope.isSearching = false;
				if (status === 401) {
					console.log('Authentication failed. Redirecting to error page');
					$rootScope.$emit("logout");
					$location.url('/auth-failed');
				}
			});
		};
		
		
	});
	
	//Test data
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