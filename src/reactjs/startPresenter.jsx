import {StartView} from "../views/startView.jsx";
import { observer } from "mobx-react-lite";

const Start = observer(
    function StartPresenter(props) {
        function handleCategorySelect(category) {
            props.model.setCategory(category);
            props.model.setUpGame();
            window.location.hash = "#/game";
            // props.model.makeCards(category).then(cards => {props.model.cards = cards;}).catch(error => {console.error("Error fetching cards:", error);});
        }
        return (<StartView onCategorySelect={handleCategorySelect} />);
    }
);

export { Start };