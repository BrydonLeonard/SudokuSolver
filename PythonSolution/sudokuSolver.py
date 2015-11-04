import sys

f = open(sys.argv[1],'r');

grid = []
concrete = []

for row in f:
	s = row.replace('\n','').split(',')
	grid.append(s)

def solve(cellNo):
	x = cellNo % 9
	y = cellNo // 9
	if int(grid[x][y]) != 0:
		if (cellNo == 80 or solve(cellNo + 1) == True):
			return True
		else:
			return False
	for i in range(1,10):
		if isValid(x,y,i) == True:
			grid[x][y] = i
			if (cellNo == 80 or solve(cellNo + 1) == True):
				return True
	grid[x][y] = 0
	return False

def isValid(x,y,num):
	for i in range(0,9):
		if (int(grid[x][i])==num or int(grid[i][y]) ==num):
			return False
	minx = (x // 3)*3
	miny = (y // 3)*3
	for i in range(minx,minx+3):
		for j in range(miny,miny+3):
			if (int(grid[i][j]) == num):
				return False
	return True

solve(0)
for row in grid:
	for item in row:
		sys.stdout.write(str(item) + ' ')
	sys.stdout.write('\n')
