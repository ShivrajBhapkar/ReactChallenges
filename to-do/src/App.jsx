import { useState } from "react";
import { v4 as uuid } from "uuid";
import "./App.css";

function App() {
    const [tasks, setTasks] = useState({
        "Ready to pick": [],
        "Inprocess task": [],
        "Completed task": [],
    });
    const [title, setTitle] = useState("");
    const [category, setCatogory] = useState("Ready to pick");

    function handleAddTask() {
        const newTask = {
            id: uuid(),
            title: title,
        };
        setTasks({
            ...tasks,
            [category]: [...tasks[category], newTask],
        });
        setTitle("");
    }
    function handleEditTask(task, currcategory) {
        setTitle(task.title);
        setCatogory(currcategory);
        const newTasks = tasks[currcategory].filter((currtask) => {
            return currtask.id !== task.id;
        });
        const updatedTasks = {
            ...tasks,
            [currcategory]: newTasks,
        };
        setTasks(updatedTasks);
    }
    function handleDeleteTask(task, currcategory) {
        setTasks({
            ...tasks,
            [currcategory]: tasks[currcategory].filter((t) => t.id !== task.id),
        });
    }
    return (
        <>
            <div className="container">
                <div className="input-container">
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        type="text"
                        maxLength={20}
                        className="input"
                    />
                    <select
                        defaultValue={category}
                        onChange={(e) => setCatogory(e.target.value)}
                    >
                        <option value="Ready to Pick">Add task</option>
                        <option value="Inprocess task">Inprocess Task</option>
                        <option value="Completed task"> Completed Task</option>
                    </select>
                    <button
                        className={title !== "" ? "btn" : "disabled"}
                        disabled={title !== "" ? false : true}
                        onClick={handleAddTask}
                    >
                        Submit
                    </button>
                </div>
                <div className="task-container">
                    {Object.keys(tasks).map((currkey, index) => {
                        return (
                            <div
                                key={index}
                                className="category-container"
                            >
                                <div className="category-container-title">{currkey}</div>
                                {tasks[currkey].map((task, index) => (
                                    <div className="currtask-container" key={task.id}>
                                        <div className="task-title">{task.title}</div>
                                        <div>
                                            <button
                                                data-tasktitle={task.title}
                                                data-taskcategory={currkey}
                                                onClick={() =>
                                                    handleEditTask(
                                                        task,
                                                        currkey
                                                    )
                                                }
                                           className="edit-btn"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDeleteTask(
                                                        task,
                                                        currkey
                                                    )
                                                }
                                        className="del-btn"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default App;
