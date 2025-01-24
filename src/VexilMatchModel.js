import { resolvePromise } from "./resolvePromise.js";
import {retrieveCountries} from "/src/cardSource";
import {GameTimer} from "/src/gameTimer.js";
import {Leaderboard} from "/src/Leaderboard.js";
import {GameScore} from "/src/gameScore.js";



const model = {  
    category: null,
    cards: null,
    firstSelect: null,
    secondSelect: null,
    randomCountriesPromiseState:{}, 
    gameWon: false,
    gameTimer: new GameTimer(),
    gameMoves: 0,
    personalStats: new Leaderboard(),
    publicLeaderboard: null,
    isLocked: false,
    username: null,

    setCategory(category){
        this.category = category;
    },

    setUpGame() {
        this.resetGame();
        resolvePromise(this.makeCards(this.category), this.randomCountriesPromiseState);
    
        //Checks changes in the promise state
        const checkPromiseState = () => {
            if (this.randomCountriesPromiseState.data) {
                //When cards retrieved
                const cards = this.randomCountriesPromiseState.data;
                const randomCards = this.selectRandomCards(cards); //Select 18 random cards (9 countries)
                const pairedCards = randomCards.flatMap((country) => [
                    {
                        id: `${country.name}-flag`,
                        name: country.name,
                        flag: country.flag,
                        isFlagCard: true,
                        isFlipped: false,
                        isMatched: false,
                        colour: "#FFFFFF",
                    },
                    {
                        id: `${country.name}-info`,
                        name: country.name,
                        flag: null,
                        isFlagCard: false,
                        isFlipped: false,
                        isMatched: false,
                        colour: "#FFFFFF",
                    },
                ]);
                this.cards = this.shuffle(pairedCards); //Shuffle and assign cards
            } else if (this.randomCountriesPromiseState.error) {
                console.error("Error fetching cards:", this.randomCountriesPromiseState.error);
            } else {
                //pending
                setTimeout(checkPromiseState, 50); 
            }
        };
    
        checkPromiseState();
        this.gameTimer.start();
    },

    makeCards(category) {
        return retrieveCountries(category).then(cards => {
            return cards; //Resolve the cards and return
        })
        .catch(error => {
            console.error("Error creating cards:", error); // Handle errors
        });
    }, 

    //fetches random cards
    selectRandomCards(cards) {
        const numberToSelect = 9 //9*2 (countries as pairs) 
        //shuffle algorithm (Fisher–Yates)
        //Copies array
        const shuffled = [...cards];
        for (let i = shuffled.length - 1; i > 0; i--) {
            //Generate a random index
            const j = Math.floor(Math.random() * (i + 1));
            //need to swap postions randomizing its order in the array
            //j is the random value generated within the size of the given country card.
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; 
        }
        return shuffled.slice(0, numberToSelect);
    },

    //only for reshuffling selected pairs
    shuffle(cards) { 
        //shuffle algorithm (Fisher–Yates)
        //Copies array
        const shuffled = [...cards];
        for (let i = shuffled.length - 1; i > 0; i--) {
            //Generate a random index
            const j = Math.floor(Math.random() * (i + 1));
            //need to swap postions randomizing its order in the array
            //j is the random value generated within the size of the given country card.
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; 
        }
        return shuffled;
    },

    flipUpFirst(card){
        this.firstSelect = card;
        this.firstSelect.isFlipped = true;
        this.firstSelect.colour = "#85ceff";
        this.gameMoves++;
    },

    flipUpSecond(card) {
        this.secondSelect = card;
        this.secondSelect.isFlipped = true;
        this.secondSelect.colour = "#85ceff";
        this.gameMoves++;
    },

    flipDown() {
        this.firstSelect.colour = "#FFFFFF";
        this.secondSelect.colour = "#FFFFFF";
        this.firstSelect.isFlipped = false;
        this.secondSelect.isFlipped = false;
        this.firstSelect = null;
        this.secondSelect = null;
    },

    match() {
        this.firstSelect.isMatched = true;
        this.secondSelect.isMatched = true;
        this.firstSelect.colour = "#85ffb1";
        this.secondSelect.colour = "#85ffb1";
        this.firstSelect = null;
        this.secondSelect = null;
    },

    nonMatch() {
        this.firstSelect.colour = "#ff8585";
        this.secondSelect.colour = "#ff8585";
    },

    toggleGameWon() {
        this.gameWon = !this.gameWon;
    },

    triggerWin() {
        this.toggleGameWon();
        this.gameTimer.stop();
        let game;

        if (this.user) {
            const currentTotalGames = this.personalStats[`${this.category.toLowerCase()}TotalGames`]?.getTotalGames() ?? 0;
            const calculatedTotalGames = currentTotalGames + 1;
            const name = this.username ?? this.user.uid
            game = new GameScore(name, this.category, this.gameTimer.clone(), this.gameMoves, calculatedTotalGames);
            this.personalStats.compareGames(game);
            this.personalStats = new Leaderboard(this.personalStats);
        }
        else {
            game = new GameScore("Guest", this.category, this.gameTimer.clone(), this.gameMoves, 1);
        }

        this.publicLeaderboard.compareGames(game);
        this.publicLeaderboard = new Leaderboard(this.publicLeaderboard);
    },

    resetGame() {
        this.cards = null;
        this.firstSelect = null;
        this.secondSelect = null;
        this.randomCountriesPromiseState = {};
        this.gameWon = false;
        this.gameMoves = 0;
        if (this.gameTimer) {
            this.gameTimer.stop();
            this.gameTimer.reset();
        } else {
            this.gameTimer = new GameTimer();
        }
    },

    cleanupTimer() {
        if (this.gameTimer) {
            this.gameTimer.stop();
            this.gameTimer = new GameTimer();
        }
    },

    compareCards() {
        if (this.firstSelect.name === this.secondSelect.name)
            return true;
        else
            return false;
    },

    setIsLocked(value) {
        this.isLocked = value;
    },
}

export {model};