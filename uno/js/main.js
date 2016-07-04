$(function(){
	
	function newGame(numBots) {
		var game = {
			discardPile: [],
			numStacked: 0, //keeps track of number of duplicate number/color of specific card that are stacked
			deck: newDeck(),
			players: newPlayers(numBots + 1),
			human: this.players[0],
			started: false
		};
		// function reset() {
			//does this need to reset the scoreboard?
		// };
		function deal() {
			game.started = true; //makes sure the game won't deal again until the current game is finished
			var y;
			game.players.forEach(function(bot){
				for(y = 0; y < handSize; y++){
					game.players.draw(game.deck.pop());
				}
			});
			for(y = 0; y < handSize; y++){
				player.draw(game.deck.pop());
			}
		};
		var handSize = 7;
		return game;
	};
	function newPlayers(num) {
		var players = [];
		var x;
		for (x = 0; x < num; x++) {
			players.push(player());
		};
	};
	//A player with a hand of cards and basic draw and drop functions
	function player() {
		var hand = [];
		var player = {
			draw: function(card) {
				hand.push(card);
			},
			drop: function(card) {
				hand.splice(hand.indexOf(card), 1);
			}
		};
		return player;
	};
	
	//Returns an shuffled deck of UNO cards
	function newDeck() {
		var deck = [];
		var colors = ["red", "blue", "yellow", "green"]; //need to enum
		var maxNum = 9;
		var specialtiesWithColor = ["skip", "reverse", "draw-2"];
		var numSpecialColored = 1; //of each per color
		var wilds = ["wild", "wild-draw-4"];
		var numWilds = 2; // of each
		
		deck = deck.concat(numberCards(colors, maxNum));//add colored 1-9
		deck = deck.concat(scCards(colors, numSpecialColored, specialtiesWithColor)); //add colored special cards
		deck = deck.concat(noncsCards(numWilds, wilds));
		return shuffle(deck);
	};
	// Create a set of colored numbered cards
	function numberCards(colors, maxNum) {
		var cards = [];
		var cardNum = 1
		for (; cardNum < maxNum; cardNum++) {
				colors.forEach(function(color) {
					cards.push(newNumCard(cardNum, color))
			}, this);
		};
		return cards;
	};
	//Creates a new UNO card of a given number and color
	function newNumCard(cardNum, color) {
		var card = {
			"type": "number",
			"number":cardNum,
			"color":color
		};
		return card;
	};
	function scCards(colors, numSpecialColored, specialties) {
		var cards = [];
		var c;
		colors.forEach(function(color) {
			specialties.forEach(function(specialty) {
				for (c = 0; c < numSpecialColored; c++) {
					cards.push(newColSpecCard(specialty, color));	
				}
			}, this)
		});
		return cards;
	};
	//Creates new color special cards (Skip, Draw-2, and Reverse)
	function newColSpecCard(specialty, color) {
		var card = {
			"type": "special",
			"specialty": specialty,
			"color": color
		};
		return card;
	};
	function noncsCards(numSpecialColored, specialties) {
		var cards = [];
		var c;
		specialties.forEach(function(specialty) {
			for (c = 0; c < numSpecialColored; c++) {
				cards.push(newNonColoredSpecialCard(specialty));	
			}
		}, this);
		return cards;
	};
	//Creates new noncolored special cards (Wild, Wild-Draw-4)
	function newNonColoredSpecialCard(specialty) {
		var card = {
			"type": "special",
			"specialty": specialty,
		};
		return card;
	};
	
	
	var game = newGame(3)
	
	$("#deal").click(function() {
		if (!game.started) {
			game.deal();
			$("#deal").addClass("inactive");//is this the right class?
		}
	});
	
	$("#reset").click(function(){
		if(confirm("Are you sure you want to reset?")) {
			game = newGame();
		}
	})
});