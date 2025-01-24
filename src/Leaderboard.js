import {GameScore} from "/src/gameScore.js";

class Leaderboard {
  constructor(existingLeaderboard = null) {
    if (existingLeaderboard) {
      const categories = ['world', 'europe', 'americas', 'africa', 'asia', 'oceania'];
      categories.forEach(category => {
        this[`${category}Time`] = existingLeaderboard[`${category}Time`];
        this[`${category}Moves`] = existingLeaderboard[`${category}Moves`];
        this[`${category}TotalGames`] = existingLeaderboard[`${category}TotalGames`];
      });
    } else {
      this.worldTime = null;
      this.worldMoves = null;
      this.worldTotalGames = null;

      this.europeTime = null;
      this.europeMoves = null;
      this.europeTotalGames = null;

      this.americasTime = null;
      this.americasMoves = null;
      this.americasTotalGames = null;

      this.africaTime = null;
      this.africaMoves = null;
      this.africaTotalGames = null;

      this.asiaTime = null;
      this.asiaMoves = null;
      this.asiaTotalGames = null;

      this.oceaniaTime = null;
      this.oceaniaMoves = null;
      this.oceaniaTotalGames = null;
    }
  }
  static fromJSON(json) {
    if (!json) return new Leaderboard();

    const leaderboard = new Leaderboard();
    const categories = ['world', 'europe', 'americas', 'africa', 'asia', 'oceania'];

    categories.forEach(category => {
      if (json[`${category}Time`]) {
        leaderboard[`${category}Time`] = GameScore.fromJSON(json[`${category}Time`]);
      }
      if (json[`${category}Moves`]) {
        leaderboard[`${category}Moves`] = GameScore.fromJSON(json[`${category}Moves`]);
      }
      if (json[`${category}TotalGames`]) {
        leaderboard[`${category}TotalGames`] = GameScore.fromJSON(json[`${category}TotalGames`]);
      }
    });

    return leaderboard;
  }
  
    compareGames(game) {
      const category = game.getCategory().toLowerCase();
  
      switch (category) {
        case "world":
          this.updateCategory(game, "world");
          break;
        case "europe":
          this.updateCategory(game, "europe");
          break;
        case "americas":
          this.updateCategory(game, "americas");
          break;
        case "africa":
          this.updateCategory(game, "africa");
          break;
        case "asia":
          this.updateCategory(game, "asia");
          break;
        case "oceania":
          this.updateCategory(game, "oceania");
          break;
        default:
          console.error(`Unknown category: ${category}`);
      }
    }
  
    updateCategory(game, category) {
      if (
        !this[`${category}Time`] || //if null
          this[`${category}Time`].getTime().compareTo(game.getTime()) //or if time is better
      ) {
        this[`${category}Time`] = game; //--> then update
      }
  
      if (
        !this[`${category}Moves`] ||
        game.getMoves() < this[`${category}Moves`].getMoves()
      ) {
        this[`${category}Moves`] = game;
      }
  
      if (
        !this[`${category}TotalGames`] ||
        game.getTotalGames() > this[`${category}TotalGames`].getTotalGames()
      ) {
        this[`${category}TotalGames`] = game;
      }
    }
}

export { Leaderboard };