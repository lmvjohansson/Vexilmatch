import { GameTimer } from './GameTimer.js';

class GameScore {
    constructor(user, category, time, moves, totalGames) {
      this.user = user;
      this.category = category;
      this.time = time; // Use the GameTimer instance
      this.moves = moves;
      this.totalGames = totalGames;
    }

    static fromJSON(json) {
        if (!json) return null;

        return new GameScore(
            json.user,
            json.category,
            GameTimer.fromJSON(json.time),
            json.moves,
            json.totalGames
        );
    }
  
    getUser() {
      return this.user;
    }
  
    getCategory() {
      return this.category;
    }
  
    getTime() {
      return this.time;
    }
  
    getMoves() {
      return this.moves;
    }
  
    getTotalGames() {
      return this.totalGames;
    }
}

export { GameScore };