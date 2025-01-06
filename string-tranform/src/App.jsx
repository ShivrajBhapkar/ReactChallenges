import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
    const [text, setText] = useState("hello world");
    const [finalText, setFinalText] = useState("hello world");
    function handleTextInput(e) {
        setText(e.target.value);
    }
    function handTrim() {
        setFinalText(text.trim());
    }
    function handLowerCase() {
        setFinalText(text.toLowerCase().trim());
    }
    function handUpperCase() {
        setFinalText(text.toUpperCase().trim());
    }
    function handleCamelCase() {
        const splitedString = text.trim().split(" ");
        const finalString = splitedString
            .map((word, index) => {
                if (index === 0) {
                    return word.toLowerCase();
                } else {
                    return (
                        word.charAt(0).toUpperCase() +
                        word.slice(1).toLowerCase()
                    );
                }
            })
            .join("");
        setFinalText(finalString);
    }

    function handlePascalCase() {
        const splittedString = text.trim().split(" ");
        const finalString = splittedString
            .map((word, index) => {
                return (
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                );
            })
            .join("");
        setFinalText(finalString);
    }

    function handleSnakeCase() {
        const splittedString = text.trim().split(" ");
        const finalString = splittedString.map((word, index) => {
            if (index === splittedString.length - 1) {
                return word.toLowerCase();
            } else {
                return word.toLowerCase() + "_";
            }
        });
        setFinalText(finalString);
    }
    function handleKebabCase() {
        const splittedString = text.trim().split(" ");
        const finalString = splittedString.map((word, index) => {
            if (index === splittedString.length - 1) {
                return word.toLowerCase();
            } else {
                return word.toLowerCase() + "-";
            }
        });
        setFinalText(finalString);
    }
    return (
        <div className="container">
            <div className="tranformcontainer">
                <textarea
                    onChange={(e) => handleTextInput(e)}
                    value={text}
                    rows={3}
                    cols={50}
                    className="textarea"
                />
                <div className="btncontainer">
                    <button className="btn" onClick={handLowerCase}>
                        Lower Case
                    </button>
                    <button className="btn" onClick={handUpperCase}>
                        Upper Case
                    </button>
                    <button className="btn" onClick={handleCamelCase}>
                        Camel Case
                    </button>
                    <button className="btn" onClick={handlePascalCase}>
                        Pascal Case
                    </button>
                    <button className="btn" onClick={handleSnakeCase}>
                        Snake Case
                    </button>
                    <button className="btn" onClick={handleKebabCase}>
                        Kebab Case
                    </button>
                    <button className="btn" onClick={handTrim}>
                        Trim
                    </button>
                </div>
                <div className="outputcontainer">
                    <div className="label">Tranformed String : </div>
                    <div className="output">{finalText}</div>
                </div>
            </div>
        </div>
    );
}

export default App;
