import { observer } from "mobx-react-lite";
import { HeaderView } from "../views/headerView.jsx";
import { GoogleAuthProvider, signInWithPopup, signOut, FacebookAuthProvider, GithubAuthProvider } from "firebase/auth";
import { auth } from "/src/firebaseModel.js";

const googleAuthProvider = new GoogleAuthProvider();
const facebookAuthProvider = new FacebookAuthProvider();
const githubAuthProvider = new GithubAuthProvider();

const Header = observer(function HeaderRender(props) {
    function handleGoogleLoginACB() {
        signInWithPopup(auth, googleAuthProvider).catch(error => console.error("Error logging in with Google: ", error));
        if (window.location.hash === "#/game") {
            window.location.hash = "#/start";
        }
    }

    function handleGithubLoginACB() {
        signInWithPopup(auth, githubAuthProvider).catch(error => console.error("Error logging in with Google: ", error));
        if (window.location.hash === "#/game") {
            window.location.hash = "#/start";
        }
    }

    function handleLogOutACB() {
        signOut(auth)
            .then(() => {
                if (window.location.hash === "#/game" || window.location.hash === "#/stats") {
                    window.location.hash = "#/start";
                }
            })
            .catch(error => console.error("Error logging out: ", error));
    }

    function handleUsernameChangeACB(newUsername) {
        props.model.username = newUsername;
    }

    function handleLeaderboardClickACB(){
        window.location.hash = "#/leaderboard"; 
    }

    function handleResumeClickACB() {
        window.location.hash = "#/game";
    }

    return (
        <HeaderView
            isLoggedIn={!!props.model.user}
            username={props.model.username}
            hasGameRunning={!!props.model.cards}
            onGoogleLogin={handleGoogleLoginACB}
            onGithubLogin={handleGithubLoginACB}
            onLogOut={handleLogOutACB}
            onUsernameChange={handleUsernameChangeACB}
            onLeaderboardClick={handleLeaderboardClickACB}
            onResumeClick={handleResumeClickACB}
        />
    );
});
export { Header };
