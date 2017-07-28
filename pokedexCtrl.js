app.controller("pokedexCtrl", function($scope, $http){
	$scope.listOfPokemon = new Array();
	var num = 1;
	while(num < 25){
		$http({
		  method: 'GET',
		  url: 'http://pokeapi.co/api/v2/pokemon/' + num
		}).then(function successCallback(response) {
			$scope.pokemon = {
				name: response.data.name.charAt(0).toUpperCase() + response.data.name.substring(1),
				weight: response.data.weight,
				num: response.data.id,
				image: response.data.sprites.front_default,
				sImage: response.data.sprites.back_default
			}
			$scope.listOfPokemon.push($scope.pokemon);
			$scope.listOfPokemon.sort(compareNumbers);
			window.scrollTo(0, 1000000);
			console.log(response.data);
		  }, function errorCallback(response) {
			console.log(response.data);
		  });
		  num++;
	}
	function compareNumbers(a, b){
		return a.num - b.num;
	}
});