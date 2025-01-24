import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Modal } from "antd";
import "../style.css";

export const HeaderView = observer(function HeaderView(props) {

    const [isModalVisible, setModalVisible] = useState(false);

    function handleLogoClickACB() {
        window.location.hash = "#/start";
    }

    function handleStatsClickACB() {
        window.location.hash = "#/stats";
    }

    function showModalACB() {
        setModalVisible(true);
    }

    function hideModalACB() {
        setModalVisible(false);
    }

    function handleGoogleLoginACB() {
        props.onGoogleLogin(); // trigger custom event
        hideModalACB(); // close modal after the event is triggered
    }

    function handleGithubLoginACB() {
        props.onGithubLogin(); // trigger custom event
        hideModalACB(); // close modal after the event is triggered
    }

    function handleLogOutACB() {
        props.onLogOut();
    }

    function usernameInputChangeACB(evt) {
        props.onUsernameChange(evt.target.value);
    }

    function handleLeaderboardClickACB(){
        props.onLeaderboardClick();
    }

    function handleResumeClickACB() {
        props.onResumeClick();
    }


    if (props.isLoggedIn) {
        return (
            <header className="header">
                <div>
                    <button onClick={handleLogoClickACB} className="category-button">Back to Start</button>
                    <button onClick={handleLeaderboardClickACB} className="category-button">Leaderboard</button>
                    <button onClick={handleStatsClickACB} className="category-button">Your stats</button>
                    {props.hasGameRunning ?
                        <button onClick={handleResumeClickACB} className="category-button">Resume</button> : ""}
                </div>
                <div>
                    <span>
                        Username:
                        <input value={props.username || ""} onChange={usernameInputChangeACB} placeholder="Type a name here"
                        className="input"/>
                    </span>
                    <button onClick={handleLogOutACB} className="category-button">Log out</button>
                </div>
            </header>
        );
    } else {
        return (
            <header className="header">
                <div>
                    <button onClick={handleLogoClickACB} className="category-button">Back to Start</button>
                    <button onClick={handleLeaderboardClickACB} className="category-button">Leaderboard</button>
                </div>
                <div>
                    <button onClick={showModalACB} className="category-button">Log in</button>
                </div>
    
                {/* modal for login */}
                <Modal open={isModalVisible} onCancel={hideModalACB} footer={null} width={600}>
                    <h2>Login Options</h2>
                    <div className="login-options">
                        <button type="button" className="login-with-google-btn" onClick={handleGoogleLoginACB}>
                            Log in with Google
                        </button>
                        <button type="button" className="login-with-github-btn" onClick={handleGithubLoginACB}>
                            Log in with GitHub
                        </button>
                    </div>
                </Modal>
            </header>
        );
    }
    
});
