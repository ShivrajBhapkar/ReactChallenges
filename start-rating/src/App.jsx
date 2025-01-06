import { useState, useMemo } from "react";

import "./App.css";

function App() {
    return (
        <div className="container">
            <div>
                <StarRating total={5} value={2} />
            </div>
        </div>
    );
}

function StarRating({ value, total }) {
    const [hoveredStar, setHoveredStar] = useState(null);
    const [clickedStar, setClickedStar] = useState(value - 1);
    const starArray = Array.from({ length: total });
    function isStarFilled(index, hoveredStar, clickedStar) {
        return index <= (hoveredStar != null ? hoveredStar : clickedStar);
    }
    return (
        <div>
            {starArray.map((_, index) => (
                <Star
                    filled={isStarFilled(index, hoveredStar, clickedStar)}
                    key={`starkey_${index}`}
                    onHover={() => setHoveredStar(index)}
                    onLeave={() => setHoveredStar(null)}
                    onClick={() => setClickedStar(index)}
                />
            ))}
        </div>
    );
}

function Star({ onHover, onLeave, onClick, filled }) {
    return (
        <span
            className={`star ${filled ? "filled" : ""}`}
            role="button"
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            onClick={onClick}
        >
            {filled ? "\u2605" : "\u2606"}
        </span>
    );
}
export default App;
