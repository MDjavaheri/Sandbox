/*
Project: Rock, Paper, Scissors
Author: MDjavaheri
Date: March, 2016
Version: 1.0

Objective: A Rock Paper Scissors game with three different computer gameplay strategies
Implementation: One dominant Controller class as well as a Scoreboard and Computer Opponent

*/
/* global Controller */
$(function() {
	"use strict";
	
	//The brains of the game
	var controller = newController();
	var scoreBoard = newScoreBoard();
	var computer = overseasFactory();
		
	//Controller: Takes GUI input and runs the game
	function newController() {
		var Controller = {
			//turn counter for logging
			turn: 1,
			
			play: function(humanMove) {
				//Associative array of moves and the moves they lose to
				var counterMove = {
					"rock": "paper",
					"paper": "scissors",
					"scissors": "rock"					
				};
				
				//Get computer's move
				var compMove = computer.move();

				//print standard part of log
				$("#log").append(this.turn++ + ". Player: " + humanMove + ", Computer: " + compMove + " | ")
				
				
				if (humanMove === compMove) {//It's a draw!
					scoreBoard.tie();
					$("#log").append("You Tied!<br>");
				}	
				else if (humanMove === counterMove[compMove]){ //You Win!
					scoreBoard.win();
					$("#log").append("You Won!<br>");
				}
				else { //You Lose!
					scoreBoard.lose();
					$("#log").append("You lost!<br>");
				}
				
				//Update computer move count with most frequently successful move (counter of the user's most frequent)
				computer.moveCount[counterMove[humanMove]]++;
				
				//update last move property to counter player's next move for last move strategy
				computer.lastMoveCounter = counterMove[humanMove];
			},		
			//Change the computer's gameplay strategy		
			newStrategy: function(strategy) {
				computer.strategy = strategy;
				$("#strategy span").text(strategy);
			},
			//Resart the game
			reset: function() {
				scoreBoard.reset();
				computer = overseasFactory();
				$("#log").text("");	
				this.turn = 1;
			}
		}
		return Controller;
	};
	
	//Computer Opponent
	function overseasFactory() {	
		var computer = {
			//counts the human's moves to see what is most frequent
			moveCount: {
				"rock": 0,
				"paper": 0,
				"scissors": 0
			},
			
			//Returns the counter of the most popular player move
			faveMove: function() {
				//uses the max value to find the corresponding key in an inverted array (Underscore.js)
				var maxVal = Math.max(this.moveCount.rock, this.moveCount.paper, this.moveCount.scissors);
				var invertedMoveCount = _.invert(this.moveCount);
				return invertedMoveCount[maxVal];
			},
			
			//moveSequence: new Array(); a stack implementation for further implementation of various gameplay strategies
			
			//Determines which gameplay strategy function to call 
			strategy: "random",
			move: function() {
				switch(this.strategy) {
					case "Last":
						return this.lastMove();
					case "Most Popular":
						return this.faveMove();
					default:
						return this.randomMove();
				}
			},
			
			//Plays move that beats the player's last move
			lastMoveCounter: "",
			lastMove: function() {
				if (this.lastMoveCounter === "") { 
					return this.randomMove();//defaults to a random move for the first turn 
				}
				else {
					return this.lastMoveCounter;
				}
			},
			//Plays a random move
			randomMove: function() {
				var moves = new Array("rock", "paper", "scissors");
				return moves[Math.round(2 * Math.random())];
			},
			
		}
		return computer;
	};
	//Records score and updates player dashboard
	function newScoreBoard() {
		var board = {
			scores: {
				"wins": 0,
				"losses": 0,
				"ties": 0
			},
			win: function() {
				$("#wins").text(++this.scores["wins"]); 
			},
			lose: function() {
				$("#losses").text(++this.scores["losses"]);
			},
			tie: function() {
				$("#ties").text(++this.scores["ties"]); 
			},
			reset: function() {
				//resets object properties
				this.scores["wins"] = 0;
				this.scores["losses"] = 0;
				this.scores["ties"] = 0;
				
				//reset gui
				$("#wins").text(0); 
				$("#ties").text(0);
				$("#losses").text(0);
			}
		};
		return board;
	};
	
	//---jQuery GUI helpers---
	//Start a new game
	$("#reset").click(function() {
		controller.reset();
	});
	//Pick a move
	$("#playerMoves button.move").click(function(){
		controller.play($(this).val());
	});
	// Change computer strategy
	$(".strButton").click(function(){
		var strategy = $(this).val();
		controller.newStrategy(strategy);
	});
	
	
})