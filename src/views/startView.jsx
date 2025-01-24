import "../style.css";
import vexilmatchLogo from '../images/vexilmatch.png';

export function StartView(props) {
    const categories = ["Africa", "Americas", "Asia", "Europe", "Oceania", "World"];

    return (
        <div className="start-view">
            <img src={vexilmatchLogo} style={{ maxWidth: '100%', height: 'auto', width: '500px' }}/>
            <h2>Select a category to start the game</h2>
            <div className="category-buttons">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => props.onCategorySelect(category)}
                        className="category-button"
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
}
