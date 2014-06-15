var userMgmtController = angular.module('soqu.userMgmtController', ['soqu.services']);

userMgmtController.controller('userMgmtCtrl', ['$scope', 'soquService', '$compile', 
	function($scope, soquService, $compile)
	{
		$scope.userReg = {userName: "", password: "", passwordRepeat: ""};
		$scope.userLogin = {userName: "", password: "" };
		$scope.currUser = "abc";

		$scope.registerUser = function()
		{
			soquService.register($scope.userReg, 
				function(resp)
				{
					if ( resp.result == "success" )
					{
						console.log("The user is registered successfully!");
						window.location.href = "#/login";
					}
					
				},
				function(err)
				{
					console.log("Error occurred during user login: " + err);
				}
			);
		};

		$scope.login = function()
		{
			soquService.login($scope.userLogin, 
				function(resp)
				{
					if ( resp.result == "success" )
					{
						console.log("The user is logged in successfully!");
						window.location.href = "#/main";
						
						var currUserElm = document.getElementById("currUser");
						currUserElm.innerHTML = $scope.userLogin.userName;
						
						var regLoginBtnElm = document.getElementById("regLoginBtn");
						var logoutBtnElm = document.getElementById("logoutBtn");
						regLoginBtnElm.style.display = "none";
						logoutBtnElm.style.display = "block";
					}
					
				},
				function(err)
				{
					console.log("Error occurred during user registration: " + err);
				}
			);
		};

		var currUrl = window.location.href;
		if ( currUrl.indexOf("logout") >= 0 )
		{
			soquService.logout(
				function(resp)
				{
					if ( resp.result == "success" )
					{
						console.log("The user is logged out successfully!");
					}
					
				},
				function(err)
				{
					console.log("Error occurred during user registration: " + err);
				}
			);
			
			var regLoginBtnElm = document.getElementById("regLoginBtn");
			var logoutBtnElm = document.getElementById("logoutBtn");
			regLoginBtnElm.style.display = "block";
			logoutBtnElm.style.display = "none";
		}
	}
]); 
