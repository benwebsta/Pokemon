app.controller("battleCtrl", function($scope, $http, $rootScope){
	console.log($rootScope.pokemonNames);
	$scope.listOfLists = new Array();

	var num = 1;
	var listOfPokemon = new Array();
	while(num < 722){
			$scope.pokemon = {
				name: "naaaa",
				image: "resources/" + num + ".png"
			}
			if(num == 0)
				listOfPokemon = new Array();
			
			listOfPokemon.push($scope.pokemon);
			
			if(num%12 == 0){
				$scope.listOfLists.push(listOfPokemon);
				listOfPokemon = new Array();
			}
		  num++;
	}	
	
	function compareNumbers(a, b){
		return a.num - b.num;
	}
		
	$scope.p1 = true;
	$scope.p2 = true;
	
	$scope.p1Picked = false;
	$scope.index1;
	$scope.index2;
	$scope.playerSelect = function(row, col){
		window.scrollTo(0, 0);
		var pokeNum = parseInt(row*12) + parseInt(col);
		pokeNum++;
		var audio = new Audio('sounds/(' + pokeNum + ').wav');
		audio.play();
		console.log("row param " + row);
		console.log("col param " + col);
		
		if($scope.p1 == true){
			$scope.player1Pokemon = $scope.listOfLists[row][col];
			var pokeNum1 = pokeNum;
			$scope.player1PokemonName = $rootScope.pokemonNames[pokeNum1 - 1];
			$scope.row1 = row;
			$scope.col1 = col;
		}
		else if($scope.p2 == true){
			$scope.player2Pokemon = $scope.listOfLists[row][col];
			var pokeNum2 = pokeNum;
			$scope.player2PokemonName = $rootScope.pokemonNames[pokeNum2 - 1];
			$scope.row2 = row;
			$scope.col2 = col;
		}
		
	}
	
	$scope.lockIn1 = function(){
		if($scope.player1Pokemon == null)
			alert('Please Select a Pokemon!');
		else if($scope.p1 == false)
			alert('P2 is picking!');
		else{
			console.log("done picking 1");
			$scope.p1Picked = true;
			$scope.p1 = false;
		}
	}
	$scope.lockIn2 = function(){
		if($scope.player2Pokemon == null)
			alert('Please Select a Pokemon!');
		else if($scope.p2 == false)
			alert('P1 is picking!');
		else{
			angular.element(document.querySelector('#Fight').setAttribute
			('href', 'Fight.html?p1' + $scope.row1 + "/" + $scope.col1 + 'p2' + $scope.row2 + "/" + $scope.col2));
			console.log($scope.col);
			$scope.p2 = false;
			console.log(angular.element(document.querySelector('#Fight')));
		}
	}
});