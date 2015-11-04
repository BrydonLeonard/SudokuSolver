var solver = angular.module('sudokuSolver',[]);

var makeCell = function(solid, num){return false};

solver.controller('sudokuController', function($scope){
	var grid = [];
	for (var i = 0; i < 9; i++)
	{
		var row = [];
		for (var j = 0; j < 9; j++)
		{
			row.push({val:null});
		}
		grid.push(row);
	}
	$scope.grid = grid;

	$scope.dsbld = false;

	$scope.clear = function(){
		for (var i = 0; i < 9; i++)
			for (var j = 0; j < 9; j++){
				$scope.grid[i][j].val = null;
			}
			$scope.dsbld = false;
	}
	$scope.do = function()
	{
		$scope.solve(0);
		$scope.dsbld = true;
	}
	$scope.solve = function(cellNo){
		var x = cellNo % 9;
		var y = Math.floor(cellNo / 9);
		if ($scope.grid[x][y].val != null)
		{

			if (cellNo == 80 || $scope.solve(cellNo + 1) == true){
				return true;
			}
			else return false;
		}

		for (var i = 1; i <= 9; i++){
			if ($scope.isValid(x,y,i) == true){

				$scope.grid[x][y].val=i;
				if (cellNo == 80 || $scope.solve(cellNo + 1) == true)
					return true;
				}

		}
		$scope.grid[x][y].val = null;
		return false;
	}
	$scope.isValid = function(x,y,num)
	{
		for (var i = 0; i < 9; i++)
			if ($scope.grid[x][i].val == num || $scope.grid[i][y].val == num)
				return false;
		var minX = (Math.floor(x / 3))*3;
		var minY = (Math.floor(y / 3))*3;

		for (var i = minX; i < minX + 3; i++)
			for (var j = minY; j < minY + 3; j++)
				if ($scope.grid[i][j].val == num)
					return false;

		return true;
	}
});
