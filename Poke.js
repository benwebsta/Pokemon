var app = angular.module("myApp", []);
app.config(['$httpProvider', function ($httpProvider) {
            // enable http caching
           $httpProvider.defaults.cache = true;
      }])
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

app.controller("homeCtrl", function($scope, $http){
	
});

app.controller("battleCtrl", function($scope, $http){
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
		var audio = new Audio('sounds/(' + pokeNum + ').wav');
		console.log(audio);
		audio.play();
		console.log("row param " + row);
		console.log("col param " + col);
		
		if($scope.p1 == true){
			$scope.player1Pokemon = $scope.listOfLists[row][col];
			$scope.row1 = row;
			$scope.col1 = col;
			console.log($scope.player1Pokemon);
		}
		else if($scope.p2 == true){
			$scope.player2Pokemon = $scope.listOfLists[row][col];
			$scope.row2 = row;
			$scope.col2 = col;
			console.log($scope.player2Pokemon);
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

app.controller("fightCtrl", function($http, $scope){
	var url = window.location.href;
	var array = url.split('p1');
	var array2 = array[1].split('p2');

	var mon1 = array2[0];
	var rowCol1 = mon1.split('/');
	var mon2 = array2[1];
	var rowCol2 = mon2.split('/');
	
	var row1 = rowCol1[0];
	var col1 = rowCol1[1];
	var row2 = rowCol2[0];
	var col2 = rowCol2[1];
	col1++;
	col2++;
	
	var num1 = parseInt(row1*12) + parseInt(col1);
	var num2 = parseInt(row2*12) + parseInt(col2);
	console.log(num1);
	console.log(num2);
	$scope.pokemon1 = {
		name: "naaaaa",
		imageFront: "resources/" + parseInt(num1, 10) + ".png",
		imageBack: "resources/" + parseInt(num1, 10) + " (1).png"
	}
	$scope.message1 = "What will " + $scope.pokemon1.name + " do?";
		
	$scope.pokemon2 = {
		name: "naa",
		imageFront: "resources/" + parseInt(num2, 10) + ".png",
		imageBack: "resources/" + parseInt(num2, 10) + " (1).png"
	}
	$scope.message2 = "What will " + $scope.pokemon2.name + " do?";
	
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



