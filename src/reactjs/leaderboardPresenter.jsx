import { observer } from "mobx-react-lite";
import { LeaderboardView } from "../views/leaderboardView.jsx";

const Leaderboard = observer(
    function LeaderboardRender(props){
        if (!props.model || !props.model.publicLeaderboard){
            return (
                <div>
                    <img src={"https://brfenergi.se/iprog/loading.gif"}/>
                </div>);
        }

        return(
            <LeaderboardView
            worldTime={props.model.publicLeaderboard.worldTime}
            worldMoves={props.model.publicLeaderboard.worldMoves}
            worldTotalGames={props.model.publicLeaderboard.worldTotalGames}

            europeTime={props.model.publicLeaderboard.europeTime}
            europeMoves={props.model.publicLeaderboard.europeMoves}
            europeTotalGames={props.model.publicLeaderboard.europeTotalGames}

            americasTime={props.model.publicLeaderboard.americasTime}
            americasMoves={props.model.publicLeaderboard.americasMoves}
            americasTotalGames={props.model.publicLeaderboard.americasTotalGames}

            africaTime={props.model.publicLeaderboard.africaTime}
            africaMoves={props.model.publicLeaderboard.africaMoves}
            africaTotalGames={props.model.publicLeaderboard.africaTotalGames}

            asiaTime={props.model.publicLeaderboard.asiaTime}
            asiaMoves={props.model.publicLeaderboard.asiaMoves}
            asiaTotalGames={props.model.publicLeaderboard.asiaTotalGames}

            oceaniaTime={props.model.publicLeaderboard.oceaniaTime}
            oceaniaMoves={props.model.publicLeaderboard.oceaniaMoves}
            oceaniaTotalGames={props.model.publicLeaderboard.oceaniaTotalGames}
                
            />
        )
    }
)

export { Leaderboard }