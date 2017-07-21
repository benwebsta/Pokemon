var app = angular.module("myApp", []);
app.config(['$httpProvider', function ($httpProvider) {
            // enable http caching
           $httpProvider.defaults.cache = true;
      }])
app.controller("pokedexCtrl", function($scope, $http){
	$scope.listOfPokemon = new Array();
	var num = 1;
	while(num < 152){
		$http({
		  method: 'GET',
		  url: 'http://pokeapi.co/api/v2/pokemon/' + num
		}).then(function successCallback(response) {
			$scope.pokemon = {
				name: response.data.name.charAt(0).toUpperCase() + response.data.name.substring(1),
				weight: response.data.weight,
				num: response.data.id,
				image: response.data.sprites.front_default,
				sImage: response.data.sprites.front_shiny
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

app.controller("homeCtrl", function($scope, $http){
	
});

app.controller("battleCtrl", function($scope, $http){
	$scope.listOfPokemon1 = new Array();
	$scope.listOfPokemon2 = new Array();
	$scope.listOfPokemon3 = new Array();
	$scope.listOfPokemon4 = new Array();
	$scope.listOfPokemon5 = new Array();
	$scope.listOfPokemon6 = new Array();
	$scope.listOfPokemon7 = new Array();
	$scope.listOfPokemon8 = new Array();
	$scope.listOfPokemon9 = new Array();
	$scope.listOfPokemon10 = new Array();
	$scope.listOfPokemon11= new Array();
	$scope.listOfPokemon12 = new Array();
	$scope.listOfPokemon13 = new Array();
	
	$scope.p1 = true;
	$scope.p2 = true;
	
	var num = 1;
	while(num < 152){
		$http({
		  method: 'GET',
		  url: 'http://pokeapi.co/api/v2/pokemon/' + num
		}).then(function successCallback(response) {
			$scope.pokemon = {
				name: response.data.name.charAt(0).toUpperCase() + response.data.name.substring(1),
				num: response.data.id,
				image: response.data.sprites.front_default
			}
				if(response.data.id < 13){
					console.log("adding 1-12");
					$scope.listOfPokemon1.push($scope.pokemon);
					$scope.listOfPokemon1.sort(compareNumbers);
				}
				else if(response.data.id > 12 && response.data.id < 25){
					console.log("adding 13-24");
					$scope.listOfPokemon2.push($scope.pokemon);
					$scope.listOfPokemon2.sort(compareNumbers);
				}
				else if(response.data.id > 24 && response.data.id < 37){
					console.log("adding 25-36");
					$scope.listOfPokemon3.push($scope.pokemon);
					$scope.listOfPokemon3.sort(compareNumbers);
				}
				else if(response.data.id > 36 && response.data.id < 49){
					console.log("adding 37-48");
					$scope.listOfPokemon4.push($scope.pokemon);
					$scope.listOfPokemon4.sort(compareNumbers);
				}
				else if(response.data.id > 48 && response.data.id < 61){
					console.log("adding 49-60");
					$scope.listOfPokemon5.push($scope.pokemon);
					$scope.listOfPokemon5.sort(compareNumbers);
				}
				else if(response.data.id > 60 && response.data.id < 73){
					console.log("adding 61-72");
					$scope.listOfPokemon6.push($scope.pokemon);
					$scope.listOfPokemon6.sort(compareNumbers);
				}
				else if(response.data.id > 72 && response.data.id < 85){
					console.log("adding 73-84");
					$scope.listOfPokemon7.push($scope.pokemon);
					$scope.listOfPokemon7.sort(compareNumbers);
				}
				else if(response.data.id > 84 && response.data.id < 97){
					console.log("adding 85-96");
					$scope.listOfPokemon8.push($scope.pokemon);
					$scope.listOfPokemon8.sort(compareNumbers);
				}
				else if(response.data.id > 96 && response.data.id < 109){
					console.log("adding 97-108");
					$scope.listOfPokemon9.push($scope.pokemon);
					$scope.listOfPokemon9.sort(compareNumbers);
				}
				else if(response.data.id > 108 && response.data.id < 121){
					console.log("adding 109-120");
					$scope.listOfPokemon10.push($scope.pokemon);
					$scope.listOfPokemon10.sort(compareNumbers);
				}
				else if(response.data.id > 120 && response.data.id < 133){
					console.log("adding 121-132");
					$scope.listOfPokemon11.push($scope.pokemon);
					$scope.listOfPokemon11.sort(compareNumbers);
				}
				else if(response.data.id > 132 && response.data.id < 145){
					console.log("adding 133-144");
					$scope.listOfPokemon12.push($scope.pokemon);
					$scope.listOfPokemon12.sort(compareNumbers);
				}
				else if(response.data.id > 144 && response.data.id < 152){
					console.log("adding 145-151");
					$scope.listOfPokemon13.push($scope.pokemon);
					$scope.listOfPokemon13.sort(compareNumbers);
				}
				else{
					console.log("else");
				}
		  }, function errorCallback(response) {
			console.log(response.data);
		  });
		  num++;
	}	
	
	function compareNumbers(a, b){
		return a.num - b.num;
	}
	
	$scope.playerSelect = function(index){
		var row = Math.floor((index+1)/12) + 1;
		var col = (index)%12;
		if(col == 11)
			row--;
		console.log(row + " " + col);
		if($scope.p1 == true){
			if(row == 1)
				$scope.player1Pokemon = $scope.listOfPokemon1[col];
			else if(row == 2)			
				$scope.player1Pokemon = $scope.listOfPokemon2[col];
			else if(row == 3)
				$scope.player1Pokemon = $scope.listOfPokemon3[col];
			else if(row == 4)
				$scope.player1Pokemon = $scope.listOfPokemon4[col];
			else if(row == 5)
				$scope.player1Pokemon = $scope.listOfPokemon5[col];
			else if(row == 6)
				$scope.player1Pokemon = $scope.listOfPokemon6[col];
			else if(row == 7)
				$scope.player1Pokemon = $scope.listOfPokemon7[col];
			else if(row == 8)
				$scope.player1Pokemon = $scope.listOfPokemon8[col];
			else if(row == 9)
				$scope.player1Pokemon = $scope.listOfPokemon9[col];
			else if(row == 10)
				$scope.player1Pokemon = $scope.listOfPokemon10[col];
			else if(row == 11)
				$scope.player1Pokemon = $scope.listOfPokemon11[col];
			else if(row == 12)
				$scope.player1Pokemon = $scope.listOfPokemon12[col];
			else if(row == 13)
				$scope.player1Pokemon = $scope.listOfPokemon13[col];
			console.log($scope.player1Pokemon);
		}
		else if($scope.p2 == true){
			if(row == 1)
				$scope.player2Pokemon = $scope.listOfPokemon1[col];
			else if(row == 2)			
				$scope.player2Pokemon = $scope.listOfPokemon2[col];
			else if(row == 3)
				$scope.player2Pokemon = $scope.listOfPokemon3[col];
			else if(row == 4)
				$scope.player2Pokemon = $scope.listOfPokemon4[col];
			else if(row == 5)
				$scope.player2Pokemon = $scope.listOfPokemon5[col];
			else if(row == 6)
				$scope.player2Pokemon = $scope.listOfPokemon6[col];
			else if(row == 7)
				$scope.player2Pokemon = $scope.listOfPokemon7[col];
			else if(row == 8)
				$scope.player2Pokemon = $scope.listOfPokemon8[col];
			else if(row == 9)
				$scope.player2Pokemon = $scope.listOfPokemon9[col];
			else if(row == 10)
				$scope.player2Pokemon = $scope.listOfPokemon10[col];
			else if(row == 11)
				$scope.player2Pokemon = $scope.listOfPokemon11[col];
			else if(row == 12)
				$scope.player2Pokemon = $scope.listOfPokemon12[col];
			else if(row == 13)
				$scope.player2Pokemon = $scope.listOfPokemon13[col];
			console.log($scope.player2Pokemon);
		}
		
	}
	
	$scope.lockIn1 = function(){
		if($scope.player1Pokemon == null)
			alert('Please Select a Pokemon!');
		else if($scope.p1 == false)
			alert('P2 is picking!');
		else
			$scope.p1 = false;
	}
	$scope.lockIn2 = function(){
		if($scope.player2Pokemon == null)
			alert('Please Select a Pokemon!');
		else if($scope.p2 == false)
			alert('P1 is picking!');
		else{
			angular.element(document.querySelector('#Fight').setAttribute
			('href', 'Fight.html?p1' + $scope.player1Pokemon.num + 'p2' + $scope.player2Pokemon.num));
			$scope.p2 = false;
			console.log(angular.element(document.querySelector('#Fight')));
		}
	}
});

app.controller("fightCtrl", function($http, $scope){
	var url = window.location.href;
	var array = url.split('p1');
	var array2 = array[1].split('p2');
	$http({
		  method: 'GET',
		  url: 'http://pokeapi.co/api/v2/pokemon/' + array2[0]
		}).then(function successCallback(response) {
			$scope.pokemon1 = {
				name: response.data.name.charAt(0).toUpperCase() + response.data.name.substring(1),
				num: response.data.id,
				imageFront: response.data.sprites.front_default,
				imageBack: response.data.sprites.back_default
			}
			$scope.message1 = "What will " + $scope.pokemon1.name + " do?";
		}, function errorCallback(response) {
			console.log(response.data);
		  });
		$http({
		  method: 'GET',
		  url: 'http://pokeapi.co/api/v2/pokemon/' + array2[1]
		}).then(function successCallback(response) {
			$scope.pokemon2 = {
				name: response.data.name.charAt(0).toUpperCase() + response.data.name.substring(1),
				num: response.data.id,
				imageFront: response.data.sprites.front_default,
				imageBack: response.data.sprites.back_default
			}
			$scope.message2 = "What will " + $scope.pokemon2.name + " do?";
		}, function errorCallback(response) {
			console.log(response.data);
		  }); 
	
	var position = 1; 
	$scope.fight = true;
	$scope.bag = false;
	$scope.mon = false;
	$scope.run = false;
		  
	var position2 = 1; 
	$scope.fight2 = true;
	$scope.bag2 = false;
	$scope.mon2 = false;
	$scope.run2 = false;

	/*$scope.key = function($event){
		console.log($event.keyCode);
		if ($event.keyCode == 38){
			//up2(up arrow)
			if(position2 == 3){
				$scope.mon2 = false;
				$scope.fight2 = true;
				position2 = 1;
			}
			else if(position2 == 4){
				$scope.run2 = false;
				$scope.bag2 = true;
				position2 = 2;
			}
		}
		else if ($event.keyCode == 87){
			//up1(w)
			if(position == 3){
				$scope.mon = false;
				$scope.fight = true;
				position = 1;
			}
			else if(position == 4){
				$scope.run = false;
				$scope.bag = true;
				position = 2;
			}
		}
		else if ($event.keyCode == 39){
			//right2(right arrow)
			if(position2 == 1){
				$scope.fight2 = false;
				$scope.bag2 = true;
				position2 = 2;
			}
			else if(position2 == 3){
				$scope.mon2 = false;
				$scope.run2 = true;
				position2 = 4;
			}
		}
		else if ($event.keyCode == 68){
			//right1 (d)
			if(position == 1){
				$scope.fight = false;
				$scope.bag = true;
				position = 2;
			}
			else if(position == 3){
				$scope.mon = false;
				$scope.run = true;
				position = 4;
			}
		}
		else if ($event.keyCode == 40){
			//down1 (down arrow)
			if(position2 == 2){
				$scope.bag2 = false;
				$scope.run2 = true;
				position2 = 4;
			}
			else if(position2 == 1){
				$scope.fight2 = false;
				$scope.mon2 = true;
				position2 = 3;
			}
		}
		else if ($event.keyCode == 83){
			//down1 (s)
			if(position == 2){
				$scope.bag = false;
				$scope.run = true;
				position = 4;
			}
			else if(position == 1){
				$scope.fight = false;
				$scope.mon = true;
				position = 3;
			}
		}
		else if ($event.keyCode == 37){
			//left2 (left arrow)
			if(position2 == 2){
				$scope.bag2 = false;
				$scope.fight2 = true;
				position2 = 1;
			}
			else if(position2 == 4){
				$scope.run2 = false;
				$scope.mon2 = true;
				position2 = 3;
			}
		}
		else if ($event.keyCode == 65){
			//left1 (a)
			if(position == 2){
				$scope.bag = false;
				$scope.fight = true;
				position = 1;
			}
			else if(position == 4){
				$scope.run = false;
				$scope.mon = true;
				position = 3;
			}
		}
		else if ($event.keyCode == 32){
			//space
			if(position == 1){
				$scope.beginFight = true;
			}
		}
		else if ($event.keyCode == 13){
			//enter
			if(position2 == 1){
				$scope.beginFight2 = true;
			}
		}
	}*/
	$scope.mon1MaxHp = 200;
	$scope.mon2MaxHp = 200;
	$scope.mon1CurrHp = 200;
	$scope.mon2CurrHp = 200;
	$scope.p1Selected = 1;
	$scope.p2Selected = 1;
	$scope.beginFight = false;
	$scope.beginFight2 = false;
	
	$scope.key = function($event){
		console.log($event.keyCode);
		if ($event.keyCode == 38){
			//up2(up arrow)
			position2 = 2;
		}
		else if ($event.keyCode == 87){
			//up1(w)
			position = 2;
		}
		else if ($event.keyCode == 39){
			//right2(right arrow)
			position2 = 4;
		}
		else if ($event.keyCode == 68){
			//right1 (d)
			position = 4;
		}
		else if ($event.keyCode == 40){
			//down1 (down arrow)
			position2 = 3;
		}
		else if ($event.keyCode == 83){
			//down1 (s)
			position = 3;
		}
		else if ($event.keyCode == 37){
			//left2 (left arrow)
			position2 = 1;
		}
		else if ($event.keyCode == 65){
			//left1 (a)
			position = 1;
		}
		else if ($event.keyCode == 32){
			//space
			if($scope.beginFight2 == false){
				$scope.beginFight = true;
				$scope.p1Selected = position;
			}
			else if($scope.beginFight2 == true){
				$scope.beginFight = true;
				$scope.p1Selected = position;
				console.log("P1 Selected: " + $scope.p1Selected);
				console.log("P2 Selected: " + $scope.p2Selected);
				if($scope.p1Selected == 1){
					if($scope.p2Selected == 1){
						$scope.mon1CurrHp -= 50;
						$scope.mon2CurrHp -= 50;
						$scope.message1 = "You stabbed each other (-50hp)";
						$scope.message2 = "You stabbed each other (-50hp)";
						console.log("stab vs stab");
					}
					else if($scope.p2Selected == 2){
						$scope.mon2CurrHp += 50;
						$scope.message1 = "Your opponent healed(+100hp), but you stabbed them(-50)";
						$scope.message2 = "You healed(+100hp), but were stabbed(-50hp)"
						console.log("stab vs heal");
					}
					else if($scope.p2Selected == 3){
						$scope.message1 = "Your opponent perried your stab (-50hp)";
						$scope.message2 = "You perried your opponents stab (-50hp)";
						$scope.mon1CurrHp -= 50;
						console.log("stab vs perry");
					}
					else if($scope.p2Selected == 4){
						$scope.message1 = "You stabbed before your opponent could slam (-50hp)";
						$scope.message2 = "Your opponent stabbed you before you could slam (-50hp)";
						$scope.mon2CurrHp -= 50;
						console.log("stab vs slam");
					}
				}
				else if($scope.p1Selected == 2){
					if($scope.p2Selected == 1){
						$scope.message1 = "You healed(+100hp), but were stabbed(-50hp)";
						$scope.message2 = "Your opponent healed(+100hp), but you stabbed them(-50)";
						$scope.mon1CurrHp += 50;
						console.log("heal vs stab");
					}
					else if($scope.p2Selected == 2){
						$scope.message1 = "You healed(+100hp), your opponent healed(+100hp)";
						$scope.message2 = "You healed(+100hp), your opponent healed(+100hp)";
						$scope.mon1CurrHp += 100;
						$scope.mon2CurrHp += 100;
						console.log("heal vs heal");
					}
					else if($scope.p2Selected == 3){
						$scope.message1 = "You healed(+100hp), your opponent perried nothing";
						$scope.message2 = "You perried, but your opponent healed(+100hp)";
						$scope.mon1CurrHp += 100;
						console.log("heal vs perry");
					}
					else if($scope.p2Selected == 4){
						$scope.message1 = "You healed(+100hp), and your opponent slammed(-100hp)";
						$scope.message2 = "You slammed(-100hp), and your opponent healed(+100hp)";
						console.log("heal vs slam");
					}
				}
				else if($scope.p1Selected == 3){
					if($scope.p2Selected == 1){
						$scope.message1 = "You perried your opponents stab (-50hp)";
						$scope.message2 = "Your opponent perried your stab (-50hp)";
						$scope.mon2CurrHp -= 50;
						console.log("perry vs stab");
					}
					else if($scope.p2Selected == 2){
						$scope.message1 = "You perried, but your opponent healed(+100hp)";
						$scope.message2 = "You healed(+100hp), your opponent perried nothing";
						$scope.mon2CurrHp += 100;
						console.log("perry vs heal");
					}
					else if($scope.p2Selected == 3){
						$scope.message1 = "You perried, but your opponent perried too";
						$scope.message2 = "You perried, but your opponent perried too";
						console.log("perry vs perry");
					}
					else if($scope.p2Selected == 4){
						$scope.message1 = "You perried but your opponent slammed(-100hp)";
						$scope.message2 = "You slammed(-100hp), and your opponent tried to perry it";
						$scope.mon1CurrHp -= 100;
						console.log("perry vs slam");
					}
				}
				else if($scope.p1Selected == 4){
					if($scope.p2Selected == 1){
						$scope.message1 = "Your opponent stabbed you before you could slam (-50hp)";
						$scope.message2 = "You stabbed before your opponent could slam (-50hp)";
						$scope.mon1CurrHp -= 50;
						console.log("slam vs stab");
					}
					else if($scope.p2Selected == 2){
						$scope.message1 = "You slammed(-100hp), and your opponent healed(+100hp)";
						$scope.message2= "You healed(+100hp), and your opponent slammed(-100hp)";
						console.log("slam vs heal");
					}
					else if($scope.p2Selected == 3){
						$scope.message1 = "You slammed(-100hp), and your opponent tried to perry it";
						$scope.message2 = "You perried but your opponent slammed(-100hp)";
						$scope.mon2CurrHp -= 100;
						console.log("slam vs perry");
					}
					else if($scope.p2Selected == 4){
						$scope.message1 = "You slammed(-100hp) and your opponent slammed(-100hp)";
						$scope.message2 = "You slammed(-100hp) and your opponent slammed(-100hp)";
						$scope.mon1CurrHp -= 100;
						$scope.mon2CurrHp -= 100;
						console.log("slam vs slam");
					}
				}
				if($scope.mon1CurrHp < 0)
					$scope.mon1CurrHp = 0;
				if($scope.mon1CurrHp > 200)
					$scope.mon1CurrHp = 200;
				if($scope.mon2CurrHp < 0)
					$scope.mon2CurrHp = 0;
				if($scope.mon2CurrHp > 200)
					$scope.mon2CurrHp = 200;
				$scope.beginFight = false;
				$scope.beginFight2 = false;
			}
		}
		else if ($event.keyCode == 13){
			//enter
			if($scope.beginFight == false){
				$scope.beginFight2 = true;
				$scope.p2Selected = position2;
			}
			else if($scope.beginFight == true){
				$scope.beginFight2 = true;
				$scope.p2Selected = position2;
				console.log("P1 Selected: " + $scope.p1Selected);
				console.log("P2 Selected: " + $scope.p2Selected);
				if($scope.p1Selected == 1){
					if($scope.p2Selected == 1){
						$scope.mon1CurrHp -= 50;
						$scope.mon2CurrHp -= 50;
						$scope.message1 = "You stabbed each other (-50hp)";
						$scope.message2 = "You stabbed each other (-50hp)";
						console.log("stab vs stab");
					}
					else if($scope.p2Selected == 2){
						$scope.mon2CurrHp += 50;
						$scope.message1 = "Your opponent healed(+100hp), but you stabbed them(-50)";
						$scope.message2 = "You healed(+100hp), but were stabbed(-50hp)"
						console.log("stab vs heal");
					}
					else if($scope.p2Selected == 3){
						$scope.message1 = "Your opponent perried your stab (-50hp)";
						$scope.message2 = "You perried your opponents stab (-50hp)";
						$scope.mon1CurrHp -= 50;
						console.log("stab vs perry");
					}
					else if($scope.p2Selected == 4){
						$scope.message1 = "You stabbed before your opponent could slam (-50hp)";
						$scope.message2 = "Your opponent stabbed you before you could slam (-50hp)";
						$scope.mon2CurrHp -= 50;
						console.log("stab vs slam");
					}
				}
				else if($scope.p1Selected == 2){
					if($scope.p2Selected == 1){
						$scope.message1 = "You healed(+100hp), but were stabbed(-50hp)";
						$scope.message2 = "Your opponent healed(+100hp), but you stabbed them(-50)";
						$scope.mon1CurrHp += 50;
						console.log("heal vs stab");
					}
					else if($scope.p2Selected == 2){
						$scope.message1 = "You healed(+100hp), your opponent healed(+100hp)";
						$scope.message2 = "You healed(+100hp), your opponent healed(+100hp)";
						$scope.mon1CurrHp += 100;
						$scope.mon2CurrHp += 100;
						console.log("heal vs heal");
					}
					else if($scope.p2Selected == 3){
						$scope.message1 = "You healed(+100hp), your opponent perried nothing";
						$scope.message2 = "You perried, but your opponent healed(+100hp)";
						$scope.mon1CurrHp += 100;
						console.log("heal vs perry");
					}
					else if($scope.p2Selected == 4){
						$scope.message1 = "You healed(+100hp), and your opponent slammed(-100hp)";
						$scope.message2 = "You slammed(-100hp), and your opponent healed(+100hp)";
						console.log("heal vs slam");
					}
				}
				else if($scope.p1Selected == 3){
					if($scope.p2Selected == 1){
						$scope.message1 = "You perried your opponents stab (-50hp)";
						$scope.message2 = "Your opponent perried your stab (-50hp)";
						$scope.mon2CurrHp -= 50;
						console.log("perry vs stab");
					}
					else if($scope.p2Selected == 2){
						$scope.message1 = "You perried, but your opponent healed(+100hp)";
						$scope.message2 = "You healed(+100hp), your opponent perried nothing";
						$scope.mon2CurrHp += 100;
						console.log("perry vs heal");
					}
					else if($scope.p2Selected == 3){
						$scope.message1 = "You perried, but your opponent perried too";
						$scope.message2 = "You perried, but your opponent perried too";
						console.log("perry vs perry");
					}
					else if($scope.p2Selected == 4){
						$scope.message1 = "You perried but your opponent slammed(-100hp)";
						$scope.message2 = "You slammed(-100hp), and your opponent tried to perry it";
						$scope.mon1CurrHp -= 100;
						console.log("perry vs slam");
					}
				}
				else if($scope.p1Selected == 4){
					if($scope.p2Selected == 1){
						$scope.message1 = "Your opponent stabbed you before you could slam (-50hp)";
						$scope.message2 = "You stabbed before your opponent could slam (-50hp)";
						$scope.mon1CurrHp -= 50;
						console.log("slam vs stab");
					}
					else if($scope.p2Selected == 2){
						$scope.message1 = "You slammed(-100hp), and your opponent healed(+100hp)";
						$scope.message2= "You healed(+100hp), and your opponent slammed(-100hp)";
						console.log("slam vs heal");
					}
					else if($scope.p2Selected == 3){
						$scope.message1 = "You slammed(-100hp), and your opponent tried to perry it";
						$scope.message2 = "You perried but your opponent slammed(-100hp)";
						$scope.mon2CurrHp -= 100;
						console.log("slam vs perry");
					}
					else if($scope.p2Selected == 4){
						$scope.message1 = "You slammed(-100hp) and your opponent slammed(-100hp)";
						$scope.message2 = "You slammed(-100hp) and your opponent slammed(-100hp)";
						$scope.mon1CurrHp -= 100;
						$scope.mon2CurrHp -= 100;
						console.log("slam vs slam");
					}
				}
				if($scope.mon1CurrHp < 0)
					$scope.mon1CurrHp = 0;
				if($scope.mon1CurrHp > 200)
					$scope.mon1CurrHp = 200;
				if($scope.mon2CurrHp < 0)
					$scope.mon2CurrHp = 0;
				if($scope.mon2CurrHp > 200)
					$scope.mon2CurrHp = 200;
				$scope.beginFight = false;
				$scope.beginFight2 = false;
			}
		}
	}

	
	
});



