import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [isOpen, setIsOpen] = useState(false);
    const [closeoutside, setCloseOutside] = useState(false);
    const [escclose, setEscClose] = useState(false);
    const [closex, setCloseX] = useState(false);
    const [backdrop, setBackDrop] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    useEffect(() => {
        function handleKeyDown(event) {
            if (escclose && event.key === "Escape") {
                closeModal();
            }
        }
        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
        } else {
            document.removeEventListener("keydown", handleKeyDown);
        }
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, escclose]);

    return (
        <div className="container">
            <div className="input_containers">
                <div>
                    <span>Close dialog on outside click</span>
                    <input
                        onClick={(e) => setCloseOutside(!closeoutside)}
                        type="checkbox"
                    />
                </div>
                <div>
                    <label>Close dialog on escape</label>
                    <input
                        onClick={(e) => setEscClose(!escclose)}
                        type="checkbox"
                    />
                </div>
                <div>
                    <label>Show close icon</label>
                    <input
                        onClick={(e) => setCloseX(!closex)}
                        type="checkbox"
                    />
                </div>
                <div>
                    <label>Show backdrop</label>
                    <input
                        onClick={(e) => setBackDrop(!backdrop)}
                        type="checkbox"
                    />
                </div>
            </div>

            <div className="modal_container">
                <button onClick={openModal}>Open Modal</button>

                {isOpen && (
                    <div
                        className={`${
                            backdrop ? "backdrop_show" : ""
                        } backdrop`}
                        onClick={closeoutside ? closeModal : null}
                    >
                        <div
                            className="modal"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="close-button">
                                {closex && (
                                    <button
                                        className="btn"
                                        onClick={closeModal}
                                    >
                                        X
                                    </button>
                                )}
                            </div>
                            <h1>Modal Heading</h1>
                            <p>
                                This is modal content. You can put any content
                                here. This has a groovy backdrop! You can also
                                close this modal by clicking outside of it or
                                pressing the escape key.
                            </p>
                            <div className="close-button">
                                <button onClick={closeModal}>Close</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
