import {Button, Card, Modal, Tooltip} from "antd";
import {QuestionCircleOutlined} from '@ant-design/icons';
import "../style.css";
import { observer } from "mobx-react-lite";

export const GameView = observer(function GameView(props) {
    function displayCardCB(card){
        return (<span className="cardDiv" key={card.id}>
            <Card
                style={{ maxWidth: '100%', maxHeight: '100%', height: '150px', width: '175px', backgroundColor: card.colour}}
                className="cardStyle"
                onClick={cardClickHandlerACB}
            >
                {card.isFlipped ? (card.isFlagCard ? <img src={card.flag} className="card-flag"/> : card.name) : ""}
            </Card>
        </span>);

        function cardClickHandlerACB() {
            props.onCardClick(card);
        }
    }

    function handlePlayAgainACB() {
        props.onPlayAgain();
    }

    function handleChangeCategoryACB() {
        props.onChangeCategory();
        window.location.hash="#/start";
    }

    return (
        <div id="game" className={props.category}>
            <Modal
                title="Congratulations!"
                open={props.gameWon}
                footer={[
                    <Button key="play again" type="primary" onClick={handlePlayAgainACB}>
                        Play again
                    </Button>,
                    <Button key="change category" type="primary" onClick={handleChangeCategoryACB}>
                        Change category
                    </Button>]}
                closable={true}
                onCancel={props.onGameWonClose}
            >
                You've matched all the cards in {props.gameTimer} with {props.gameMoves} moves!
            </Modal>
            <div className="game-box">
                <div>
                    <h2>Match countries {props.category === "World" ? "" : "in " + props.category} with their flag! &nbsp;&nbsp;
                        <Tooltip color="white" overlayInnerStyle={{color: '#000'}} title="Click a card to flip it over. Match names of countries with their flags, two matching cards will stay face up. You win when all cards have been matched!">
                            <QuestionCircleOutlined/>
                        </Tooltip>
                    </h2>
                </div>
                <div>
                    Time: <span id="timer">00:00</span>
                </div>
                <div>
                    Moves: {props.gameMoves}
                </div>
            </div>
            <div className="playing-field-div">
                    {props.cards.map(displayCardCB)}
                </div>
        </div>
    );
});