var userMgmtController = angular.module('soqu.userMgmtController', ['soqu.services']);

userMgmtController.controller('userMgmtCtrl', ['$scope', 'soquService', '$compile', 
	function($scope, soquService, $compile)
	{
		$scope.userReg = {userName: "", password: "", passwordRepeat: ""};

		$scope.registerUser = function()
		{
			soquService.register($scope.userReg, 
				function(resp)
				{
					console.log("The user is registered successfully!");
				},
				function(err)
				{
					console.log("Error occurred during user registration!");
				}
			);
		};
	}
]); 
