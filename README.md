------------------ README for Project Submission 23/12/2024 -----------------------------

Run the project the same way as in the labs:
1. Install node, recent version (e.g. 17)
2. After checkout execute "npm install"
3. To start your development server "npm run dev"
4. Point your browser to HTML address http://localhost:8080/index.html

The project is also deployed on the website https://vexilmatch.web.app/

The 3rd party components used are all from ant design https://ant.design/
Card is used in gameView and statsView
Modal is used in headerView and gameView
Tooltip and Icon is used in gameView

------------------ README for Mid-peoject review 9/12/2024 ------------------------------

VexilMatch is a memory style game where a user matches flags with their countries, a user can choose which region the countries should be from 
or play with random countries from the whole world if they wish. It is a fun game that is working both the long and short term memory! For 
competitive players, the game will feature personal statistics, including best game records based on time and moves, as well as the total 
number of completed games in each category. Additionally, a public leaderboard will showcase the top players.

For the mid-project review 9/12/2024 we have completed the start page where a user can select category and the header so that the player can 
navigate between the game page and the start page. We have completed the model, view and presenter responsible for the game so that it works 
in its entirety, that includes API calls to get the flags and names of countries.

The remaining features include per user persistance of both game state and personal stats, public persistance for leaderboard and the logic 
required to compare and add stats to the leaderboard, leaderboard view and presenter, personal stats view and presenter, adding the navigation 
to the header and doing the additional routing in the root. We also need to implement suspense.

```
Project file structure:
src  
├── reactjs  
│   ├── gamePresenter.jsx - Presenter for gameView
│   ├── headerPresenter.jsx - Presenter for headerView
│   ├── index.jsx - Makes model reactive and mounts it
│   ├── ReactRoot.jsx - Decides what to render/routing
│   └── startPresenter.jsx - Presenter for startView
├── views  
│   ├── gameView.jsx - View of game page
│   ├── headerView.jsx - View of header at the top of the page
│   └── startView.jsx - View of start page
├── cardSource.js - Code for calling API and retrieving countries based on category
├── firebaseConfig.js - Config file for firebase
├── firebaseModel.js - Code for persistance
├── gameScore.js - Class to allow for saving stats for a specific game such as user id, category, time, moves
├── gameTimer.js - Class to allow for time taking of a game, defines a timer and has methods like start(), stop(), reset()
├── Leaderboard.js - Class to contain the best games in different categories, games are saved as gameScore objects. Will be used for public and personal stats/leaderboards
├── resolvePromise.js - Shows state of promise to allow for suspense
├── style.css - Making things look nice
└── VexilMatchModel.js - Model file, contains all saved data and methods that modify the data
```
