$(function() {
	"use strict";
		
	//Game Computer/Bot Class
	function Factory() = {	
		var computer {
			moveCount: {
				"rock": 0,
				"paper": 0,
				"scissors": 0
			},
			faveMove: function() {
				//NEEDS WORK
				Math.max(this.moveCount.rock, this.moveCount.paper, this.moveCount.scissors);
			},
			moveSequence: new Array(),
			strategy: "",
			move: function() {
				switch(this.strategy) {
					case "last":
						this.lastMove();
						break;
					case "fave":
						this.faveMove();
						break;
					default:
						this.randomMove();
						break;
				}
			},
			//returns the move that beats the player's last move
			lastMove: function() {
				if (this.moveSequence.length > 0) {
					return this.moveSequence.peek();
				}
				else {
					this.randomMove();//defaults to a random move for the first turn 
				}
			},
			//returns a random move
			randomMove: function() {
				var moves = new Array("rock", "paper", "scissors");
				return moves[Math.round(2 * Math.random())];
			},
			//taunts a message based on the game results
			taunt: function(result) {
				var message;
				var alertType;
				switch(result) {
					case "win":
						message = "You won! I guess I went too easy on you!";
						alertType = "alert-success";
						break;
					case "lose":
						message = "You lose! I like this: let's play again!";
						alertType = "alert-failure";
						break;
					case "tie":
						message = "Draw! You're good!";
						alertType = "alert-warning";
						break;
				};
				$("<div>")
					.addClass("alert " + alertType)
					.data("role":"alert")
					.text(message)
					.appendTo("#taunt")
			}
			return computer;
		}
	};
	function newScoreBoard() {
		var board = {
			scores: {
				"wins": 0,
				"losses": 0,
				"ties": 0
			},
			win: function() {
				scores["wins"]++;
				$("#wins").val(score.wins); 
			}
			lose: function() {
				scores["losses"]++;
			}
			tie: function() {
				scores["ties"]++;
				$("#ties").val(score.ties); 
			}
			reset: function() {
				$("#wins", "#ties", "#losses").val(0);
				scores.wins = 0;
				scores.losses = 0;
				scores.ties = 0;
			}
		}
		//resets the game scoreboard on new game
		$("#wins", "#ties", "#losses").val(0);
		return board;
	};

	var Controller = {
		var scoreBoard = newScoreBoard();
		var computer = Factory();
		rps = {
			"rock": "scissors",
			"paper": "rock",
			"scissors": "paper"
		},
		shoot: function(humanMove) {
			var compMove = computer.move();
			if (humanMove === compMove) {//It's a draw!
				scoreBoard.tie();
				computer.taunt("tie");
			}	
			else if (humanMove === rps[compMove]) {//You Win!
				scoreboard.win();
				computer.taunt("win");
			}
			else { //Try again!
				scoreBoard.lose();
				computer.taunt("lose"); 
			}
			computer.moveSequence.push(rps[playerMove]);//store the move that would've beaten the player's most recent move
		},		
		reset: function() {
			scoreBoard = newScoreBoard();
			computer = Factory();	
		}
	};
	//start the game
	var controller  newGame();
	//jQuery methods
	$("#reset").click(function() {
		controller.reset();
	});
	
	$("playerMoves.move").click(function(){
		controller.shoot($(this).val);
	});
	
	$("#strategy button").click(function(){
		$("#strategy button").removeClass("active"); //clears the class from any previously active ones
		$(this).setClass("active");  //adds to this one
		var newStrategy = $(this).val();
		Computer.strategy(newStrategy);
	});
})