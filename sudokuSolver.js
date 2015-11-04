var solver = angular.module('sudokuSolver',[]);

var makeCell = function(solid, num){return false};

solver.controller('sudokuController', ['$scope', function($scope){
	var grid = [];
	var count = 0;
	for (var i = 0; i < 9; i++)
	{
		var row = [];
		for (var j = 0; j < 9; j++)
		{
			row.push({value:null, cell:count});
			count++;
		}
		grid.push(row);
	}
	$scope.grid = grid;
	$scope.clear = function(){
		//Clear grid
	}
	$scope.solve = function(){
		//Solve grid
	}
}]);
