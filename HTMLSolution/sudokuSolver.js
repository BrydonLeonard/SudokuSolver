var solver = angular.module('sudokuSolver',[]);

var makeCell = function(solid, num){return false};

solver.controller('sudokuController', function($scope){
	var grid = [];
	for (var i = 0; i < 9; i++)
	{
		var row = [];
		for (var j = 0; j < 9; j++)
		{
			row.push({val:null, possible:[1,2,3,4,5,6,7,8,9]});
		}
		grid.push(row);
	}
	$scope.grid = grid;

	$scope.dsbld = false;

	$scope.clear = function(){
		for (var i = 0; i < 9; i++)
			for (var j = 0; j < 9; j++){
				$scope.grid[i][j] = {val:null, possible:[1,2,3,4,5,6,7,8,9]};
			}
			$scope.dsbld = false;
			$scope
	}
	$scope.do = function()
	{
		$scope.eliminate();
		$scope.solve(0);
		console.log(grid);
		$scope.dsbld = true;
	}
	$scope.eliminate = function(){
		for (var i = 0; i < 9; i++)
		{
			for (var j = 0; j < 9; j++)
			{
				if ($scope.grid[i][j].val)
				for (var k = 0; k < 9; k++){
					var ind = $scope.grid[i][k].possible.indexOf($scope.grid[i][j].val*1.0);
					if (ind > -1)
						$scope.grid[i][k].possible.splice(ind,1);
					var ind = $scope.grid[k][j].possible.indexOf($scope.grid[i][j].val*1.0);
					if (ind > -1)
						$scope.grid[k][j].possible.splice(ind,1);
				}
			}
		}
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
		//Not sure why this one isn't working
		//$scope.grid[x][y].possible.forEach(function(i){
		for (var i = 0; i < $scope.grid[x][y].possible.length; i++){
			var num = $scope.grid[x][y].possible[i];
			if ($scope.isValid(x,y,num) == true){
				$scope.grid[x][y].val=num;
				if (cellNo == 80 || $scope.solve(cellNo + 1) == true)
					return true;
				}
		//	});
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
