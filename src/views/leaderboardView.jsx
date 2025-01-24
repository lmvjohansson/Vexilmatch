import "../style.css";

export function LeaderboardView(props) {
    const categories = ['world', 'europe', 'americas', 'africa', 'asia', 'oceania'];

    return (
        <div className="leaderboard">
            <h1>Leaderboard</h1>
            <div className="leaderboard-grid">
                {/* Time-Column */}
                <div className="leaderboard-column">
                    <h2>Time</h2>
                    {categories.map((category) => (
                        <div key={category} className="leaderboard-entry"> 
                            <div className="leaderboard-category">
                                {category.charAt(0).toUpperCase() + category.slice(1)} {/* so category starts with capital letter */}
                            </div> 
                            <div className="leaderboard-row">
                                <div className="leaderboard-username">
                                    {props[`${category}Time`]?.user || "someUsername"} {/* displays 'someUsername' if other is falsy */}
                                </div>
                                <div className="leaderboard-value">
                                    {props[`${category}Time`]?.time?.getFormattedTime?.() ?? "00:00"} {/* correctly formatted time */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Moves-Column */}
                <div className="leaderboard-column">
                    <h2>Moves</h2>
                    {categories.map((category) => (
                        <div key={category} className="leaderboard-entry">
                            <div className="leaderboard-category">
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </div>
                            <div className="leaderboard-row">
                                <div className="leaderboard-username">
                                    {props[`${category}Moves`]?.user || "someUsername"}
                                </div>
                                <div className="leaderboard-value">
                                    {props[`${category}Moves`]?.moves ?? "0"}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Total Games-Column */}
                <div className="leaderboard-column">
                    <h2>Total Completions</h2>
                    {categories.map((category) => (
                        <div key={category} className="leaderboard-entry">
                            <div className="leaderboard-category">
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </div>
                            <div className="leaderboard-row">
                                <div className="leaderboard-username">
                                    {props[`${category}TotalGames`]?.user || "someUsername"}
                                </div>
                                <div className="leaderboard-value">
                                    {props[`${category}TotalGames`]?.totalGames ?? "0"}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
