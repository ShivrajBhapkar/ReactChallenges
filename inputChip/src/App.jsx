import { useState, useMemo } from "react";
import "./App.css";
import { useCallback } from "react";

function App() {
    const [inputValue, setInputValue] = useState("");
    const [options, setOptions] = useState([]);
    // function onEnter(event) {
    //     if (event.key == "Enter") {
    //         setOptions((prevState) => [...prevState, inputValue]);
    //         setInputValue("");
    //     }
    // }

    // This is improvement function
    const onEnter = useCallback(
        (event) => {
            if (event.key == "Enter" && inputValue.trim() !== "") {
                setOptions((prevState) => [...prevState, inputValue.trim()]);
                setInputValue("");
            }
        },
        [inputValue]
    );
    // function onDelete(event) {
    //     const newOptions = options.filter((item, index) => index != event);
    //     setOptions(newOptions);
    // }

    // This is improvement function
    const onDelete = useCallback((index) => {
        setOptions((prevState) => prevState.filter((_, i) => i !== index));
    }, []);
    const renderedList = useMemo(() =>
        options.map((item, index) => {
            return (
                <div
                    className="flex items-center justify-between gap-4 border p-2 text-xs h-6 rounded-lg border-black"
                    key={index}
                >
                    <span>{item}</span>
                    <button
                        onClick={() => onDelete(index)}
                        className="text-red-400 hover:cursor-pointer"
                    >
                        X
                    </button>
                </div>
            );
        })
    );

    return (
        <div className="flex flex-col w-full">
            <div className="flex-1">
                <input
                    onKeyDown={(e) => onEnter(e)}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="p-2 border border-black w-full"
                    placeholder="Type & hit Enter"
                />
            </div>
            <div className=" grid grid-cols-6 items-center justify-center gap-4 mt-4">
                {renderedList}
            </div>
        </div>
    );
}

export default App;
