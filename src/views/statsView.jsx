import "../style.css";
import {Card} from "antd";

export function StatsView(props) {
      // Extract stats from props
      const stats = props.stats;
     const categories = ["Africa", "Americas", "Asia", "Europe", "Oceania", "World"];


    return (
        <div className="stats">
        <h1 className="stats-title">Your personal statistics!</h1>
        <div className="stats-grid">
         {categories.map(category => (
            <Card key={category} className="statsCard">
                <h3>{category}</h3>
                <p>Total completions: {stats[category]?.completions || 0}</p>
                <p>Shortest time: {stats[category]?.shortestTime|| "N/A"}</p>
                <p>Fewest moves: {stats[category]?.fewestMoves || "N/A"}</p>
            </Card> 
        ))}
    </div>
    </div>   
    );
}
