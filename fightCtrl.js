app.controller("fightCtrl", function($http, $scope, $rootScope, $timeout, $interval){
	$scope.blood="resources/blood.png";
	var wait1 = false;
	var wait2 = false;
	var p1MoveDone = function(){
		$scope.attack1 = false;
	}
	var p2MoveDone = function(){
		$scope.attack2 = false;
	}
	var p1BloodDone = function(){
		$scope.blood1 = false;
	}
	var p2BloodDone = function(){
		$scope.blood2 = false;
	}
	function move1(attack){
		$scope.weapon1 = "resources/" + attack + ".png";
		console.log("in move1");
		$scope.attack1 = true;
		console.log($scope.attack1);
		wait1 = true;
		
		var top1 = 130;
		var left1 = 420;
		var id1 = setInterval(frame1, 2.5);
		function frame1() {
			if (top1 == 215) {
				clearInterval(id1);
				$scope.blood2 = true;
			} else {
			top1++; 
			if(left1 > 340)
				left1--;
			var pixTop1 = top1 + 'px';
			var pixLeft1 = left1 + 'px';
			angular.element('#mon1Weapon2').css('paddingTop', pixTop1);
			angular.element('#mon1Weapon2').css('paddingLeft', pixLeft1);
			//angular.element('#fighter1_2').css('paddingTop', pixTop1);
			//angular.element('#fighter1_2').css('paddingLeft', pixLeft1);
			}
		}
		var top2 = 240;
		var left2 = 300;
		var id2 = setInterval(frame2, 2.5);
		function frame2() {
			if (top2 == 155) {
				clearInterval(id2);
				$scope.blood2 = true;
			} else {
			top2--; 
			if(left2 < 380)
				left2++;
			var pixTop2 = top2 + 'px';
			var pixLeft2 = left2 + 'px';
			angular.element('#mon1Weapon1').css('paddingTop', pixTop2);
			angular.element('#mon1Weapon1').css('paddingLeft', pixLeft2);
			//angular.element('#fighter1_1').css('paddingTop', pixTop1);
			//angular.element('#fighter1_1').css('paddingLeft', pixLeft1);
			}
		}
		$timeout(p1MoveDone, 500);
		$timeout(p2BloodDone, 1000);
	}
	
	function move2(attack){
		$scope.weapon2 = "resources/" + attack + ".png";
		console.log("in move2");
		$scope.attack2 = true;
		wait2 = true;
		
		var top1 = 130;
		var left1 = 420;
		var id1 = setInterval(frame1, 2.5);
		function frame1() {
			if (top1 == 215) {
				clearInterval(id1);
				$scope.blood1 = true;
			} else {
			top1++; 
			if(left1 > 340)
				left1--;
			var pixTop1 = top1 + 'px';
			var pixLeft1 = left1 + 'px';
			angular.element('#mon2Weapon1').css('paddingTop', pixTop1);
			angular.element('#mon2Weapon1').css('paddingLeft', pixLeft1);
			//angular.element('#fighter2_1').css('paddingTop', pixTop1);
			//angular.element('#fighter2_1').css('paddingLeft', pixLeft1);
			}
		}
		var top2 = 240;
		var left2 = 300;
		var id2 = setInterval(frame2, 2.5);
		function frame2() {
			if (top2 == 155) {
				clearInterval(id2);
				$scope.blood1 = true;
			} else {
			top2--; 
			if(left2 < 380)
				left2++;
			var pixTop2 = top2 + 'px';
			var pixLeft2 = left2 + 'px';
			angular.element('#mon2Weapon2').css('paddingTop', pixTop2);
			angular.element('#mon2Weapon2').css('paddingLeft', pixLeft2);
			//angular.element('#fighter2_2').css('paddingTop', pixTop1);
			//angular.element('#fighter2_2').css('paddingLeft', pixLeft1);
			}
		}
		$timeout(p2MoveDone, 500);
		$timeout(p1BloodDone, 1000);
	}
	
	var healthDown = function(player, amount, delay){
		 $timeout(function() {
			var p1Dmg;
			var start;
			if(player == "player1"){
				start = $scope.mon1CurrHp;
				p1Dmg = true;
			}
			else if(player == "player2"){
				start = $scope.mon2CurrHp;
				p1Dmg = false;
			}
			var id = $interval(damage, 40);
			function damage() {
				if(p1Dmg){
					if ($scope.mon1CurrHp == 0 || $scope.mon1CurrHp == (start - amount)) {
						$interval.cancel(id);
						wait1 = false;
					}
					else
						$scope.mon1CurrHp--;
				}
				else{
					if ($scope.mon2CurrHp == 0 || $scope.mon2CurrHp == (start - amount)) {
						$interval.cancel(id);
						wait2 = false;
					}
					else
						$scope.mon2CurrHp--;
				}
			}
		}, delay);
	}
	
	var healthUp = function(player, amount, delay){
		$timeout(function() {
			var p1Dmg;
			var start;
			if(player == "player1"){
				start = $scope.mon1CurrHp;
				p1Dmg = true;
			}
			else if(player == "player2"){
				start = $scope.mon2CurrHp;
				p1Dmg = false;
			}
			var id = $interval(damage, 40);
			function damage() {
				if(p1Dmg){
					if ($scope.mon1CurrHp == 200 || $scope.mon1CurrHp == (start + amount)) {
						$interval.cancel(id);
						wait1 = false;
					}
					else
						$scope.mon1CurrHp++;
				}
				else{
					if ($scope.mon2CurrHp == 200 || $scope.mon2CurrHp == (start + amount)) {
						$interval.cancel(id);
						wait2 = false;
					}
					else
						$scope.mon2CurrHp++;
				}
			}
		}, delay);
	}
	
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
	if(num1 < 152){
		$scope.pokemon1 = {
			name: $rootScope.pokemonNames[parseInt(num1, 10) - 1],
			imageFront: "resources/" + parseInt(num1, 10) + ".gif",
			imageBack: "resources/" + parseInt(num1, 10) + " (1).gif"
		}
	}
	else{
		$scope.pokemon1 = {
			name: $rootScope.pokemonNames[parseInt(num1, 10) - 1],
			imageFront: "resources/" + parseInt(num1, 10) + ".png",
			imageBack: "resources/" + parseInt(num1, 10) + " (1).png"
		}
	}
	$scope.message1 = "What will " + $scope.pokemon1.name + " do?";
		
	if(num2 < 152){
		$scope.pokemon2 = {
			name: $rootScope.pokemonNames[parseInt(num2, 10) - 1],
			imageFront: "resources/" + parseInt(num2, 10) + ".gif",
			imageBack: "resources/" + parseInt(num2, 10) + " (1).gif"
		}
	}
	else{
		$scope.pokemon2 = {
			name: $rootScope.pokemonNames[parseInt(num2, 10) - 1],
			imageFront: "resources/" + parseInt(num2, 10) + ".png",
			imageBack: "resources/" + parseInt(num2, 10) + " (1).png"
		}
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
		if(wait1 || wait2)
			console.log("waiting");
		else{
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
							$scope.message1 = "You stabbed each other (-50hp)";
							$scope.message2 = "You stabbed each other (-50hp)";
							move1("sword");
							move2("sword");
							healthDown("player1", 50, 1000);
							healthDown("player2", 50, 1000);
							console.log("stab vs stab");
						}
						else if($scope.p2Selected == 2){
							move1("sword");
							healthDown("player2", 50, 1000);
							healthUp("player2", 100, 4000);
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
							move2("sword");
							healthDown("player1", 50, 1000);
							healthUp("player1", 100, 4000);
							console.log("heal vs stab");
						}
						else if($scope.p2Selected == 2){
							$scope.message1 = "You both healed(+100hp)";
							$scope.message2 = "You both healed(+100hp)";
							healthUp("player1", 100, 1000);
							healthUp("player2", 100, 1000);
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
							$scope.message1 = "You stabbed each other (-50hp)";
							$scope.message2 = "You stabbed each other (-50hp)";
							move1("sword");
							move2("sword");
							healthDown("player1", 50, 1000);
							healthDown("player2", 50, 1000);
							console.log("stab vs stab");
						}
						else if($scope.p2Selected == 2){
							move1("sword");
							healthDown("player2", 50, 1000);
							healthUp("player2", 100, 4000);
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
							move2("sword");
							healthDown("player1", 50, 1000);
							healthUp("player1", 100, 4000);
							console.log("heal vs stab");
						}
						else if($scope.p2Selected == 2){
							$scope.message1 = "You both healed(+100hp)";
							$scope.message2 = "You both healed(+100hp)";
							healthUp("player1", 100, 1000);
							healthUp("player2", 100, 1000);
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
	}

	
	
});