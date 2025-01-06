import { useEffect, useState } from "react";
import "./App.css";
function App() {
    const [gridSize, setGridSize] = useState(3); // Default 3x3 grid
    const [grid, setGrid] = useState(
        Array(gridSize)
            .fill()
            .map(() => Array(gridSize).fill(null))
    );
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState(null);
    useEffect(() => {
        const localGrid = localStorage.getItem("grid");
        const localIsXNext = localStorage.getItem("isXNext");
        const localWinner = localStorage.getItem("winner");
        if (localGrid) {
            setGrid([...JSON.parse(localGrid)]);
        }
        if (localIsXNext) {
            setIsXNext(JSON.parse(localIsXNext));
        }
        if (localWinner) {
            setWinner(localWinner);
        }

        function browserSync(event) {
            if (
                event.key === "grid" ||
                event.key === "isXNext" ||
                event.key === "winner"
            ) {
                const updatedGrid = JSON.parse(localStorage.getItem("grid"));
                const updatedIsXNext = JSON.parse(
                    localStorage.getItem("isXNext")
                );
                const updatedWinner = localStorage.getItem("winner");
                if (updatedGrid) setGrid(updatedGrid);
                if (updatedIsXNext) setIsXNext(updatedIsXNext);
                if (updatedWinner) setWinner(updatedWinner);
            }
        }

        window.addEventListener("storage", browserSync);
        return () => window.removeEventListener("storage", browserSync);
    }, []);
    function handleClick(event) {
        const { row, col } = event.target.dataset;
        if (grid[row][col] || (winner && winner !== "null")) return; // Prevent overwriting or clicking after a win

        const newGrid = grid.map((r, rowIndex) =>
            r.map((cell, colIndex) =>
                rowIndex === Number(row) && colIndex === Number(col)
                    ? isXNext
                        ? "X"
                        : "O"
                    : cell
            )
        );

        setGrid(newGrid);
        localStorage.setItem("grid", JSON.stringify([...newGrid]));
        setIsXNext(!isXNext);
        localStorage.setItem("isXNext", JSON.stringify(!isXNext));
        checkWinner(newGrid);
    }

    const checkWinner = (grid) => {
        const lines = [];
        // Check rows and columns
        for (let i = 0; i < gridSize; i++) {
            lines.push(grid[i]); // Rows
            lines.push(grid.map((row) => row[i])); // Columns
        }
        // Check diagonals
        lines.push(grid.map((row, i) => row[i])); // Top-left to bottom-right
        lines.push(grid.map((row, i) => row[gridSize - i - 1])); // Top-right to bottom-left
        // Check for a winner
        for (const line of lines) {
            if (line.every((cell) => cell === "X")) {
                setWinner("X");
                localStorage.setItem("winner", "X");
                return;
            }
            if (line.every((cell) => cell === "O")) {
                localStorage.setItem("winner", "O");
                setWinner("O");
                return;
            }
        }
        // Check for a draw
        if (grid.flat().every((cell) => cell)) {
            localStorage.setItem("winner", "Draw");
            setWinner("Draw");
        }
    };

    const resetGame = () => {
        const newGrid = initializeGrid(gridSize);
        setGrid(newGrid);
        localStorage.setItem("grid", JSON.stringify(newGrid));
        setIsXNext(true);
        localStorage.setItem("isXNext", JSON.stringify(true));
        setWinner(null);
        localStorage.setItem("winner", null);
    };

    const initializeGrid = (size) =>
        Array(size)
            .fill()
            .map(() => Array(size).fill(null));

    return (
        <div className="tic-tac-toe">
            <div>
                <h1>Tic Tac Toe</h1>
            </div>
            <div
                className="grid"
                style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
                onClick={handleClick} // Attach a single event listener to the parent
            >
                {grid.map((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            className="cell"
                            data-row={rowIndex} // Store row index in data attribute
                            data-col={colIndex} // Store column index in data attribute
                        >
                            {cell}
                        </div>
                    ))
                )}
            </div>
            {winner !== null && winner !== "null" && (
                <div className="winner">
                    Winner: {winner !== "null" ? winner : ""}
                </div>
            )}
            <button onClick={resetGame}>Reset Game</button>
        </div>
    );
}

export default App;
