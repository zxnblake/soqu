var userMgmtController = angular.module('soqu.favorMgmtController', ['soqu.services']);

userMgmtController.controller('favorMgmtCtrl', ['$scope', 'soquService', '$compile', 
	function($scope, soquService, $compile)
	{
		$scope.userInfo = {userName: "", password: "", passwordRepeat: ""};
		$scope.favorList = {};

		$scope.getFavors = function()
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

	}
]); 
