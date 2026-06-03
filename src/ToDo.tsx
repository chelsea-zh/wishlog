import { useState } from 'react'
import './ToDo.css'

// task = {reward: 100, goal: "string", claimed: false}


export default function ToDo() {
    const [daily, setDaily] = useState(true);
    const [dailyTasks, setDailyTasks] = useState([
        {reward: 100, goal: "testiad ad;lkfj sdf a sdflk; slf d fsdfng", claimed: true},
        {reward: 200, goal: "other test", claimed: false},
        {reward: 100, goal: "test 3", claimed: true},
        {reward: 200, goal: "test 4", claimed: false}
    ]);
    const [customTasks, setCustomTasks] = useState([]);

    function deleteTask(goal: string) {
        if (daily) {
            setDailyTasks(dailyTasks =>
                dailyTasks.filter(task => task.goal != goal)
            )
        } else {
            setCustomTasks(customTasks =>
                dailyTasks.filter(task => task.goal != goal)
            )
        }
    }

    function changeDaily() {
        setDaily(true)
    }
    function changeCustom() {
        setDaily(false)
    }

    return(
        <div className = "todo">
            {/*use cssgrid with bottom block on left, selector on right ->
            just have them as onclick divs lmao too lazy*/}
            {daily ? (
                <Dailies dailyTasks={dailyTasks} deleteTask={deleteTask}/>
            ) : (
                <Custom customTasks={customTasks} deleteTask={deleteTask}/>
            )}
            <ToDoSelector onClick={changeDaily}/>
            <ToDoSelector onClick={changeCustom}/>
        </div>
    )
}

function ToDoSelector({onClick}) {
    return(
        <div className="sel" onClick={onClick}>
            <h1>s</h1>
        </div>
    )
}

function Dailies({dailyTasks, deleteTask}) {
    return(
        <div className="dailies">
            <h1>dailies</h1>
            <TaskList tasks = {dailyTasks} deleteTask={deleteTask} />
        </div>
    )
}

function Custom({customTasks, deleteTask}) {
    return(
        <div className="custom">
            <h1>Custom</h1>
            <TaskList tasks = {customTasks} deleteTask={deleteTask}/>
        </div>
    )
}

function TaskList({tasks, deleteTask}) {
    return(
        <div className='tasklist'>
            <UnclaimedTasks tasks = {tasks} deleteTask = {deleteTask} />
            <ClaimedTasks tasks = {tasks} deleteTask = {deleteTask} />
            <TaskCreator />
        </div>
    )
}

function UnclaimedTasks({tasks, deleteTask}) {
    let tasklist = [];
    tasks.forEach((t) => {
        if (!t.claimed) {
            tasklist.push(
                <Task task = {t} deleteTask={deleteTask}/>
            )
        }
    });

    return(
        <div className='unclaimed'>
            {tasklist}
        </div>
    )
}

function ClaimedTasks({tasks, deleteTask}) {
    let tasklist = [];
    tasks.forEach((t) => {
        if (t.claimed) {
            tasklist.push(
                <Task task = {t} deleteTask={deleteTask}/>
            )
        }
    });

    return(
        <div className='claimed'>
            {tasklist}
        </div>
    )
}

function Task({task, deleteTask}) {
    return(
        <div className="task">
            <h1> {task.reward} </h1>
            <h1> {task.goal} </h1>
            <button> claim </button>
            <button onClick={() => deleteTask(task.goal)}> delete </button>
        </div>
    )
}

function TaskCreator() {
    return(
        <div className='creator'>
            <h1>100</h1>
            <h1>Create Task</h1>
            <button>Add</button>
        </div>
    )
}