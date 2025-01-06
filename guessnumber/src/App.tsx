import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [currnum, setCurrNum] = useState<string | number>(1);
  const [show, setShow] = useState(false);
  const [randomnum, setRandomNum] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setRandomNum(Math.floor(Math.random() * 100));
  }, []);

  useEffect(() => {
    console.log(randomnum);
  }, [randomnum]);

  function handleReset() {
    setShow(false);
    setCurrNum(1);
    setMessage("");
    setRandomNum(Math.floor(Math.random() * 100)); // Reset random number
  }

  function handleCheck() {
    const currentNumber = typeof currnum === "string" ? Number(currnum) : currnum;
    setShow(true);
    if (currentNumber < 0 || currentNumber > 100 || isNaN(currentNumber)) {
      setMessage("Please enter a number between 0 and 100.");
      return;
    }
    console.log(currentNumber, randomnum);
    if (currentNumber === randomnum) {
      setMessage("Correct Guess!!");
    } else if (currentNumber > randomnum) {
      setMessage("Try smaller number");
    } else {
      setMessage("Try greater number");
    }
  }

  return (
    <div className="Container">
      <div className="inputcontainer">
        <div>Guess a Number between 0 and 100</div>
        <input
          type="number"
          value={currnum}
          onChange={(e) => {
            const newValue = e.target.value;
            // Allow empty string for controlled input
            setCurrNum(newValue === "" ? "" : Number(newValue));
          }}
        />
      </div>
      <div>
        <div className="btncontainer">
          <button className="btn" onClick={handleReset}>
            Reset
          </button>
          <button className="btn" onClick={handleCheck}>
            Check
          </button>
        </div>
        {show && <div className="output">{message}</div>}
      </div>
    </div>
  );
}

export default App;
