import { useState } from "react";
import "./App.css";

function App() {
    const [num, setNum] = useState("");

    function HandleInput(e) {
        const inputValue = e.target.value;
        const plainValue = inputValue.replace(/[^\d]/g, "");
        // Check if the user is backspacing (inputValue is shorter than current num)
        if (plainValue.length <= 3) {
            setNum(plainValue); // Allow normal backspacing
        } else {
            const formattedValue = `+(${plainValue.slice(
                0,
                3
            )})-${plainValue.slice(3)}`;
            setNum(formattedValue);
        }
    }

    return (
        <div className="inputcontainer">
            <input
                type="tel"
                maxLength={14}
                value={num}
                onChange={(e) => HandleInput(e)}
                id="inputbox"
            />
        </div>
    );
}

export default App;
