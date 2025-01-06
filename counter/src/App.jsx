import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [diffcount, setDiffCount] = useState(1);
  function IncreaseCount() {
    setCount((state)=> state+diffcount);
  }
  function DecreaseCount() {
    setCount((state) => state - diffcount);
  }
  function ResetCount() {
    setCount(0);
  }
  return (
      <div className="flex flex-col items-center my-6 space-y-4">
          <div>Counter</div>
          <div id="currcount">{count}</div>
          <div id="operationcontainer" className="space-x-6">
              <button
                  className=" border-gray-400 w-8 h-8 border-solid border-2"
                  onClick={DecreaseCount}
              >
                  -
              </button>
              <button
                  className="border-gray-400 w-8 h-8 border-solid border-2"
                  onClick={IncreaseCount}
              >
                  +
              </button>
          </div>
          <div className="space-x-2">
              <span>Increment/Decrement by</span>
              <input
                  type="number"
                  className="border-2 border-gray-400"
                  defaultValue={diffcount}
                  onChange={(e) => {
                      setDiffCount(Number(e.target.value));
                  }}
              />
          </div>
          <button
              className="border-2 border-gray-400  h-8 w-12"
              onClick={ResetCount}
          >
              Reset
          </button>
      </div>
  );
}

export default App
