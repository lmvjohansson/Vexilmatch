import { observer } from "mobx-react-lite";
import { Game } from "./gamePresenter.jsx";
import "../style.css";
import {Start} from "./startPresenter.jsx";
import {Header} from "./headerPresenter.jsx";
import { Leaderboard } from "./leaderboardPresenter.jsx";
import { createHashRouter, RouterProvider } from "react-router-dom";
import {Stats} from "./statsPresenter.jsx";

function makeRouter(model) {
    return createHashRouter([
        {
            path: "/",
            element: <div className="start"><Start model={model}/></div>,
        },
        {
            path: "/start",
            element: <div className="start"><Start model={model}/></div>,
        },
        {
            path: "/game",
            element: <div className="game"><Game model={model}/></div>,
        },
        {
            path: "/leaderboard",
            element: <div><Leaderboard model={model}/></div>,
        },
        {
            path: "/stats",
            element: <div><Stats model={model}/></div>,
        },
    ]);
}

const ReactRoot = observer(function ReactRoot(props) {
    if (props.model.ready) {
        if(props.model.user === undefined) {
            return (
                <div>
                    <img src={"https://brfenergi.se/iprog/loading.gif"} />
                </div>
            );
        }
        return (
            <div>
                <div className="header-div">
                    <Header model={props.model}/>
                </div>
                <div>
                    <RouterProvider router={makeRouter(props.model)}/>
                </div>
            </div>
        );
    } else {
        {
            return (
                <div>
                    <img src={"https://brfenergi.se/iprog/loading.gif"} />
                </div>
            );
        }
    }
});

export {ReactRoot};