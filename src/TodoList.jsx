import React, { useState } from 'react';

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [taskDate, setTaskDate] = useState("");
    const [taskClass, setTaskClass] = useState(""); 
    const [filter, setFilter] = useState(""); 

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function handleDateChange(event) {
        setTaskDate(event.target.value);
    }

    function handleClassChange(event) {
        setTaskClass(event.target.value);
    }

    function handleFilterChange(event) {
        setFilter(event.target.value);
    }

    function addTask() {
        
        if (newTask.trim() !== "" && taskDate !== "" && taskClass !== "") {
           
            setTasks(t => [...t, { text: newTask, date: taskDate, class: taskClass, completed: false }]);
           
            setNewTask("");
            setTaskDate("");
            setTaskClass("");
        } else {
            alert("Please fill in all fields.");
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function toggleTaskCompletion(index) {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    const filteredTasks = tasks.filter(task => {
        if (!filter) return true; 
        const [filterValue, filterType] = filter.split(" - ");
        if (filterType === "Completed" || filterType === "Not Completed") {
            return (filterType === "Completed" && task.completed) || (filterType === "Not Completed" && !task.completed);
        }
        return task.class.includes(filterValue);
    });

    return (
        <div className="to-do-list">
            <h1>To do List</h1>
            <div>
                <input
                    type="text"
                    placeholder="Enter task"
                    value={newTask}
                    onChange={handleInputChange}
                />
                <input
                    type="date"
                    value={taskDate}
                    onChange={handleDateChange}
                />
                <select value={taskClass} onChange={handleClassChange}>
                    <option value="" disabled>Select priority or category</option>
                    <option value="High - Work">High - Work</option>
                    <option value="Medium - Work">Medium - Work</option>
                    <option value="Low - Work">Low - Work</option>
                    <option value="High - Personal">High - Personal</option>
                    <option value="Medium - Personal">Medium - Personal</option>
                    <option value="Low - Personal">Low - Personal</option>
                    <option value="High - Shopping">High - Shopping</option>
                    <option value="Medium - Shopping">Medium - Shopping</option>
                    <option value="Low - Shopping">Low - Shopping</option>
                    <option value="High - Other">High - Other</option>
                    <option value="Medium - Other">Medium - Other</option>
                    <option value="Low - Other">Low - Other</option>
                    <option value="Completed - Completed">Completed</option>
                    <option value="Not Completed - Not Completed">Not Completed</option>
                </select>
                <button className="add-button" onClick={addTask}>Add</button>
            </div>
            <div>
                <label>Filter: </label>
                <select value={filter} onChange={handleFilterChange}>
                    <option value="">Show All</option>
                    <option value="High - Work">High - Work</option>
                    <option value="Medium - Work">Medium - Work</option>
                    <option value="Low - Work">Low - Work</option>
                    <option value="High - Personal">High - Personal</option>
                    <option value="Medium - Personal">Medium - Personal</option>
                    <option value="Low - Personal">Low - Personal</option>
                    <option value="High - Shopping">High - Shopping</option>
                    <option value="Medium - Shopping">Medium - Shopping</option>
                    <option value="Low - Shopping">Low - Shopping</option>
                    <option value="High - Other">High - Other</option>
                    <option value="Medium - Other">Medium - Other</option>
                    <option value="Low - Other">Low - Other</option>
                    <option value="Completed - Completed">Completed</option>
                    <option value="Not Completed - Not Completed">Not Completed</option>
                </select>
            </div>
            <ol>
                {filteredTasks.map((task, index) => (
                    <li key={index} className={task.completed ? "completed-task" : ""}>
                        <span className="text">
                            {task.text} - {task.date} - {task.class}
                        </span>
                        <button className="complete-button" onClick={() => toggleTaskCompletion(index)}>
                            {task.completed ? "Unmark" : "Complete"}
                        </button>
                        <button className="delete-button" onClick={() => deleteTask(index)}>Delete</button>
                        <button className="move-button" onClick={() => moveTaskUp(index)}>Up</button>
                        <button className="move-button" onClick={() => moveTaskDown(index)}>Down</button>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default ToDoList;
