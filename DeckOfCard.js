/******************************************************************************
 *  Execution       :   1. default node         cmd> node DeckOfCard.js 
 *                      2. if nodemon installed cmd> nodemon DeckOfCard.js
 * 
 *  Purpose         : Shuffle the cards using Random method and then distribute 9 Cards to 4 Players and Print the Cards the received by the 4 Players.
 * 
 *  @description    
 * 
 *  @file           : DeckOfCard.js
 *  @overview       : DeckOfCard module to  Shuffle the cards using Random method and then 
 *                    distribute 9 Cards to 4 Players and Print the Cards the received by the 4 Players.
 *  @module         : DeckOfCard - This is optional if expeclictly its an npm or local package
 *  @author         : Parmeshwar Raut
 *  @version        : 1.0
 *  @since          : 05-01-2019
 *
 ******************************************************************************/
/**
 *  class Deck for  distribute card to players
 */
class Deck {
    constructor() {
        //create array deck which hold shuffled card. 
        this.deck = [];
        //reset() define all cards are reset at every execution of program
        this.reset();
        //shuffle() all cards
        this.shuffle();
    }

    reset() {
        this.deck = [];
        /**
         * array of suite
         */
        const suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
        /**
         * array of rank
         */
        const values = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];
        /**
         * take 2D array for suit and rank then push to deck[] array 
         */
        for (let suit in suits) {
            for (let value in values) {
                this.deck.push(`${values[value]} of ${suits[suit]}`);
            }
        }
    }

    shuffle() {
        const { deck } = this;  //take deck array
        let m = deck.length, i; // find out length of deck array

        while (m) {
            /**
             * Get random suite and rank into deck[[][]]
             */
            i = Math.floor(Math.random() * m--);

            [deck[m], deck[i]] = [deck[i], deck[m]];
        }
        //return deck which hold all shuffel or random cards
        return deck;
    }

    deal() {
        /**
         * pop cards from deck 0f array
         */
        return this.deck.pop();
    }

}


/**
 * create object of parent class
 */
const objDeck = new Deck();
//var len = (objDeck.deck).length;
/**
 * oject are assign to another variable
 */
var dek = objDeck.deck;

/**
 * Derived class Player extends property of base class Deck
 */
class Player extends Deck {
    /**
     * method card() defines to distribute 9 cards out of 52 cards to 4 players 
     * 
     */

    card(deck) {
        var i = 0;
        /**
         * player1 hold 9 cards
         */
        var player1 = [];
         /**
         * player2 hold 9 cards
         */
        var player2 = [];
         /**
         * player3 hold 9 cards
         */
        var player3 = [];
         /**
         * player4 hold 9 cards
         */
        var player4 = [];

        var len = deck.length; //find out length of deck i.e. 52
        //console.log("All cards are = "+len);
        for (i = 0; i < len; i++) {
            if (i < 9) {
                // Give 9 card to player 1 
                player1.push(deck[i]);
            }
            else if (i <= 18 && i > 9) {
                // Give 9 card to player2
                player2.push(deck[i]);

            }
            else if (i <= 27 && i > 18) {
                // Give 9 card to player3 
                player3.push(deck[i]);

            }
            else if (i <= 36 && i > 27) {
                // Give 9 card to player4 
                player4.push(deck[i]);

            }

        }
        console.log("Player 1 ==> [" + player1+"]"); //display  cards of player1
        console.log("Player 2 ==> [" + player2+"]");//display  cards of player2
        console.log("Player 3 ==> [" + player3+"]");//display  cards of player3
        console.log("Player 4 ==> [" + player4+"]");//display  cards of player4

    }



}
/**
 * create object of derived class  
 */
const objPlayer = new Player();
/**
 * call method of derived class which hold object variable of parent class 
 * Here we use object orinted property i.e.inheritance 
 */
objPlayer.card(dek);
