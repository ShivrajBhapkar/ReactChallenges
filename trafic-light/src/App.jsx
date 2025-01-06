import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [active, setActive] = useState("red-color");
    const [time, setTime] = useState(5);
    useEffect(() => {
        startCyle();
    }, []);
    function startCyle() {
        changeTored();
    }
    function changeTored() {
        setActive("red-color");
        setTime(5);
        startCountdown(5, changeTogreen);
    }
    function changeTogreen() {
        setActive("green-color");
        setTime(3);
        startCountdown(3, changeToyellow);
    }
    function changeToyellow() {
        setActive("yellow-color");
        setTime(2);
        startCountdown(2, changeTored);
    }

    function startCountdown(timer, callbackfunction) {
        let currentTimer = timer;
        const interval = setInterval(() => {
            currentTimer -= 1;
            setTime(currentTimer);
            if (currentTimer == 0) {
                clearInterval(interval);
                callbackfunction();
            }
        }, 1000);
    }
    return (
        <>
            <div className="container">
                <div className="trafic-container">
                    <div
                        className={`${
                            active === "red-color"
                                ? "red-color"
                                : "no-red-color"
                        }`}
                    ></div>
                    <div
                        className={`${
                            active === "yellow-color"
                                ? "yellow-color"
                                : "no-yellow-color"
                        }`}
                    ></div>
                    <div
                        className={`${
                            active === "green-color"
                                ? "green-color"
                                : "no-green-color"
                        }`}
                    ></div>
                </div>
                <div>{time}</div>
            </div>
        </>
    );
}

export default App;
