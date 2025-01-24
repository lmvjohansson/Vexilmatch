import { createRoot } from "react-dom/client";
import { model } from '../VexilMatchModel.js';
import { ReactRoot } from "./ReactRoot.jsx";
import "/src/firebaseModel.js";

import {observable, configure, reaction} from "mobx";
import { connectToFirebase } from "../firebaseModel.js";
configure({ enforceActions: "never", });

const reactiveModel = observable(model);

const rootJSX = <ReactRoot model={reactiveModel} />;

createRoot(document.getElementById('root')).render(rootJSX);

connectToFirebase(reactiveModel, reaction); 