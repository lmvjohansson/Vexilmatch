import { firebaseConfig } from "/src/firebaseConfig.js";
import { initializeApp } from "firebase/app";
import { ref, set, get, getDatabase } from "firebase/database"; // For interacting with Realtime Database
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "/src/VexilMatchModel.js";
import {GameTimer} from "/src/gameTimer.js";
import {Leaderboard} from "/src/Leaderboard.js";



// Initializations
const app = initializeApp(firebaseConfig);  
const db = getDatabase(app);
const auth = getAuth(app);
const leaderboardRef = ref(db, "VexilMatchModel/Leaderboard");

function getUserRef(model) { // PUP - reference to persisted data depends on the model.user ID, cannot make it a const since model.user has to be known
    return ref(db, `VexilMatchModel/Users/${model.user.uid}`);
}

function modelToPersistence(model){ // what to persist
    return {
        category: model.category, // current game category 
        cards: model.cards ? JSON.stringify(model.cards) : [],
        gameMoves: model.gameMoves, // nof moves made 
        firstSelectId: model.firstSelect ? model.firstSelect.id : null,
        personalStats: JSON.stringify(model.personalStats),  // stringify as we have objects
        gameTimer: model.gameTimer.toJSON(),
        username: model.username
    }
}

function persistenceToModel(dataFromPersistence, model){
    // When we have no data in Firebase 
    if(!dataFromPersistence){
        dataFromPersistence = {}; // initialize empty object
    }

    // Set defaults or assign values from Firebase when there is data 
    model.category = dataFromPersistence.category ?? null;
    model.cards = dataFromPersistence.cards ? JSON.parse(dataFromPersistence.cards) : [];
    model.gameMoves = dataFromPersistence.gameMoves ?? 0;
    model.username = dataFromPersistence.username ?? null;
    if (dataFromPersistence.firstSelectId && model.cards.length > 0) {
        model.firstSelect = model.cards.find(card => card.id === dataFromPersistence.firstSelectId) || null;
        if (model.firstSelect) {
            model.firstSelect.isFlipped = true;
            model.firstSelect.colour = "#85ceff";
        }
    } else {
        model.firstSelect = null;
    }
    if (dataFromPersistence.personalStats) {
        const statsData = JSON.parse(dataFromPersistence.personalStats);
        model.personalStats = Leaderboard.fromJSON(statsData);
    } else {
        model.personalStats = new Leaderboard();
    }

    if (dataFromPersistence.gameTimer) {
        model.gameTimer = GameTimer.fromJSON(dataFromPersistence.gameTimer);
    } else {
        model.gameTimer = new GameTimer();
    }
}


function saveToFirebase(model){
    if(model.ready && model.user){
        const persistenceData = modelToPersistence(model);
        if (persistenceData) {
            set(getUserRef(model), persistenceData);
        }
    }
}

function saveLeaderboardToFirebase(model) {
    if(model.ready && model.publicLeaderboard){
        set(leaderboardRef, leaderboardToPersistence(model));
    }
}

function readFromFirebase(model){
    function convertACB(snapshot) {
        if (snapshot.exists()) {
            persistenceToModel(snapshot.val(), model);
        }
    }

    function convertLeaderboardACB(snapshot){
        if (snapshot.exists()) {
            persistenceToLeaderboard(snapshot.val(), model);
        }
    }

    function setModelReadyACB() {
        model.ready = true;
    }

    model.ready = false;

    const leaderboardPromise = get(leaderboardRef)
        .then(snapshot => {
            return convertLeaderboardACB(snapshot);
        })
        .catch(error => {
            console.error("Error reading leaderboard from Firebase:", error);
        });

    if (model.user) {
        return leaderboardPromise
            .then(() => {
                return get(getUserRef(model));
            })
            .then(convertACB)
            .then(() => {
                setModelReadyACB();
            })
            .catch(error => {
                console.error("Error reading user data from Firebase:", error);
            });
    } else {
        return leaderboardPromise
            .then(() => {
                setModelReadyACB();
            })
            .catch(error => {
                console.error("Error finalizing leaderboard load:", error);
            });
    }
}

function connectToFirebase(model, watchFunction){
    function checkACB(){
        return [model.category, model.cards, model.gameMoves, model.firstSelect,
            model.username, model.personalStats, model.gameTimer]; // props to have eyes on
    }

    function saveModelACB(){
        saveToFirebase(model); // save model to Firebase
    }

    function saveLeaderboardACB() {
        saveLeaderboardToFirebase(model);
    }

    function checkLeaderboardACB(){
        return [model.publicLeaderboard];
    }

    function authStateChangedACB(user) {
        const previousLeaderboard = model.publicLeaderboard;
        model.user = user;

        if (user) {
            model.gameTimer.stop();
            readFromFirebase(model);
        } else {
            model.cleanupTimer();
            model.category = null;
            model.cards = null;
            model.firstSelect = null;
            model.secondSelect = null;
            model.randomCountriesPromiseState = {};
            model.gameWon = false;
            model.gameTimer = new GameTimer();
            model.gameMoves = 0;
            model.personalStats = null;
            model.isLocked = false;
            model.publicLeaderboard = previousLeaderboard;
            model.username = null;
        }
    }

    readFromFirebase(model);
    onAuthStateChanged(auth, authStateChangedACB);
    watchFunction(checkACB, saveModelACB);
    watchFunction(checkLeaderboardACB, saveLeaderboardACB);
}

function leaderboardToPersistence(model) {
    return {
        leaderboard: JSON.stringify(model.publicLeaderboard)
    };
}

function persistenceToLeaderboard(dataFromPersistence, model) {
    if (!dataFromPersistence) {
        dataFromPersistence = {};
    }

    if (dataFromPersistence.leaderboard) {
        const statsData = JSON.parse(dataFromPersistence.leaderboard);
        model.publicLeaderboard = Leaderboard.fromJSON(statsData);
    } else {
        if (!model.publicLeaderboard) {
            model.publicLeaderboard = new Leaderboard();
        }
    }
}

export { app, modelToPersistence, persistenceToModel, saveToFirebase, readFromFirebase, connectToFirebase, auth }; 



