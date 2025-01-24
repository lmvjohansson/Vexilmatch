import { observer } from "mobx-react-lite";
import {GameView} from "../views/gameView.jsx";

const Game = observer(
    function GameRender(props) {

        async function flipCardACB(card){
            if (props.model.isLocked) return; //if the state is locked nothing is carried out on a click
            props.model.setIsLocked(true); //before any game logic is carried out lock the state
            if (!card.isFlipped){ //if card is flipped do nothing
                if (props.model.firstSelect === null) { //if no card is flipped yet set flipped card to firstSelect
                    props.model.flipUpFirst(card);
                    props.model.setIsLocked(false); //unlock the state to allow clicks again
                } else {
                    props.model.flipUpSecond(card); //if first card has been flipped already, flip second card
                    if(props.model.compareCards()){ //compare the cards, if they match call match();
                        props.model.match();
                        if (props.model.cards.every(card => card.isMatched)){ //if all cards are matched
                            props.model.triggerWin();
                        }
                        props.model.setIsLocked(false);
                    }
                    else { //if they do not match call nonMatch that sets the colour to red
                        props.model.nonMatch();
                        setTimeout(() => { //waits for 3 seconds before flipping the cards back down
                            props.model.flipDown();
                            props.model.setIsLocked(false);
                        }, 1300);
                    }
                }
            }
            if(props.model.firstSelect && card.name === props.model.firstSelect.name) {
                props.model.setIsLocked(false);
            }
            if(card.isMatched === true) {
                props.model.setIsLocked(false);
            }
        }

        function gameWonCloseACB() {
            props.model.toggleGameWon();
        }

        function playAgainACB(){
            props.model.resetGame();
            props.model.setUpGame();
        }

        function changeCategoryACB() {
            props.model.resetGame();
        }

        if (props.model.cards && props.model.category) {
            return <GameView
                cards={props.model.cards}
                category={props.model.category}
                onCardClick={flipCardACB}
                gameWon={props.model.gameWon}
                gameMoves={props.model.gameMoves}
                gameTimer={props.model.gameTimer.getFormattedTime()}
                personalStats={props.model.publicLeaderboard}
                onGameWonClose={gameWonCloseACB}
                onPlayAgain={playAgainACB}
                onChangeCategory={changeCategoryACB}
            />;
        }
        if (props.model.randomCountriesPromiseState.promise) {
            if (props.model.randomCountriesPromiseState.error) {
                return (
                    <div>
                        Error loading search results: {props.model.randomCountriesPromiseState.error.toString()}
                    </div>);
            }
            if (!props.model.randomCountriesPromiseState.data) {
                return (
                    <div>
                        <img src={"https://brfenergi.se/iprog/loading.gif"}/>
                    </div>);
            }
        }
        return (
            <div>
                <img src={"https://brfenergi.se/iprog/loading.gif"}/>
            </div>
        );
});

export { Game };