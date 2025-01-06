import { useEffect, useRef, useState } from "react";
import "./App.css";
// Explanation of requestAnimationFrame
// requestAnimationFrame is a browser API designed for rendering animations efficiently. It schedules a callback function to run before the next repaint, ensuring smooth updates at the screen refresh rate (usually 60 frames per second). This approach is more efficient than using setInterval or setTimeout for animations because:

// Synchronization with Display: It synchronizes updates with the browser's refresh rate, avoiding unnecessary calculations when the tab is inactive or minimized.
// Improved Performance: It reduces CPU usage by pausing updates when the browser is not actively rendering.
// When to Use requestAnimationFrame
// Use requestAnimationFrame for:

// Animating elements (e.g., moving objects, fades, transitions).
// Continuously updating values tied to the UI (e.g., timers, games).
// Scenarios where high precision and smooth rendering are critical.

function App() {
    return (
        <div className="container">
            <StopWatch />
        </div>
    );
}

function StopWatch() {
    const [elapsedTime, setElapsedTime] = useState(0); // Only for UI updates
    const isRunning = useRef(false); // Ref for running state
    const startTimeRef = useRef(0); // Tracks start time
    const animationFrameId = useRef(null); // Ref for requestAnimationFrame ID

    useEffect(() => {
        return () => {
            // Cleanup on component unmount
            cancelAnimationFrame(animationFrameId.current);
        };
    }, []);

    const runTimer = () => {
        if (!isRunning.current) {
            return;
        }
        const now = Date.now();
        const elapsed = now - startTimeRef.current;
        setElapsedTime(elapsed);
        animationFrameId.current = requestAnimationFrame(runTimer); // Continue the loop
    };

    const handleStart = () => {
        if (!isRunning.current) {
            isRunning.current = true;
            startTimeRef.current = Date.now() - elapsedTime;
            runTimer();
        }
    };

    const handleStop = () => {
        isRunning.current = false;
        console.log(isRunning.current);
        cancelAnimationFrame(animationFrameId.current);
    };

    const handleReset = () => {
        isRunning.current = false;
        cancelAnimationFrame(animationFrameId.current);
        setElapsedTime(0);
    };

    const showTime = () => {
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
        let seconds = Math.floor((elapsedTime / 1000) % 60);
        let milliseconds = Math.floor((elapsedTime % 1000) / 10);
        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        milliseconds = String(milliseconds).padStart(2, "0");
        return `${minutes}:${seconds}:${milliseconds}`;
    };

    return (
        <div className="stopwatch-container">
            <div className="title">StopWatch</div>
            <div>
                <span className="timer-container">{showTime()}</span>
            </div>
            <div className="btn-container">
                <button onClick={handleStart} className="btn-start">
                    Start
                </button>
                <button
                    disabled={isRunning.current ? false : true}
                    onClick={handleStop}
                    className="btn-stop"
                >
                    Stop
                </button>
                <button
                    disabled={isRunning.current ? false : true}
                    onClick={handleReset}
                    className="btn-reset"
                >
                    Reset
                </button>
            </div>
        </div>
    );
}

export default App;
