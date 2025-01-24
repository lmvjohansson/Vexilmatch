import { StatsView } from "../views/statsView.jsx";
import { observer } from "mobx-react-lite";
//import "../Leaderboard.js";
import "../gameTimer.js"

const Stats = observer(function StatsPresenter(props) {
    const personalStats = props.model.personalStats;


    // Process the leaderboard stats into a displayable format
    const stats = {
        World: {
            completions: personalStats?.worldTotalGames?.getTotalGames().toString() || 0,
            shortestTime: personalStats?.worldTime?.time?.getFormattedTime() || "N/A",
            fewestMoves: personalStats?.worldMoves?.getMoves().toString() || "N/A",
        },
        Europe: {
            completions: personalStats?.europeTotalGames?.getTotalGames().toString() || 0,
            shortestTime: personalStats?.europeTime?.time?.getFormattedTime() || "N/A",
            fewestMoves: personalStats?.europeMoves?.getMoves().toString() || "N/A",
        },
        Americas: {
            completions: personalStats?.americasTotalGames?.getTotalGames().toString() || 0,
            shortestTime: personalStats?.americasTime?.time?.getFormattedTime() || "N/A",
            fewestMoves: personalStats?.americasMoves?.getMoves().toString() || "N/A",
        },
        Africa: {
            completions: personalStats?.africaTotalGames?.getTotalGames().toString() || 0,
            shortestTime: personalStats?.africaTime?.time?.getFormattedTime() || "N/A",
            fewestMoves: personalStats?.africaMoves?.getMoves().toString() || "N/A",
        },
        Asia: {
            completions: personalStats?.asiaTotalGames?.getTotalGames().toString() || 0,
            shortestTime: personalStats?.asiaTime?.time?.getFormattedTime() || "N/A",
            fewestMoves: personalStats?.asiaMoves?.getMoves().toString() || "N/A",
        },
        Oceania: {
            completions: personalStats?.oceaniaTotalGames?.getTotalGames().toString() || 0,
            shortestTime: personalStats?.oceaniaTime?.time?.getFormattedTime() || "N/A",
            fewestMoves: personalStats?.oceaniaMoves?.getMoves().toString() || "N/A",
        },


    };

    

    return <StatsView stats={stats} />;
});

export { Stats };
