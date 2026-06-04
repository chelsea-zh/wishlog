import { useState } from 'react'
import './ToDo.css'

// task = {reward: 100, goal: "string", claimed: false}


export default function ToDo() {
    const [daily, setDaily] = useState(true);
    const [dailyTasks, setDailyTasks] = useState([
        {reward: 100, goal: "testiad ad;lkfj sdf a sdflk; slf d fsdfng", claimed: false},
        {reward: 200, goal: "other test", claimed: false},
        {reward: 100, goal: "test 3", claimed: false},
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
                customTasks.filter(task => task.goal != goal)
            )
        }
    }

    function claimTask(goal: string) {
        if (daily) {
            setDailyTasks(dailyTasks =>
                dailyTasks.map(task => 
                    task.goal === goal
                    ? {...task, claimed: true}
                    : task
                )
            )
        } else {
            setCustomTasks(customTasks =>
                customTasks.map(task => 
                    task.goal === goal
                    ? {...task, claimed: true}
                    : task
                )
            )
        }
    }

    function addTask(task) {
        if (daily) {
            setDailyTasks(dailyTasks => [...dailyTasks, task])
        } else {
            setCustomTasks(customTasks => [...customTasks, task])
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
                <Dailies 
                    dailyTasks={dailyTasks} 
                    deleteTask={deleteTask} 
                    claimTask={claimTask}
                    addTask={addTask}/>
            ) : (
                <Custom 
                    customTasks={customTasks} 
                    deleteTask={deleteTask} 
                    claimTask={claimTask}
                    addTask={addTask}/>
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

function Dailies({dailyTasks, deleteTask, claimTask, addTask}) {
    return(
        <div className="dailies">
            <h1>dailies</h1>
            <TaskList 
                tasks = {dailyTasks} 
                deleteTask={deleteTask}  
                claimTask={claimTask}
                addTask={addTask}/>
        </div>
    )
}

function Custom({customTasks, deleteTask, claimTask, addTask}) {
    return(
        <div className="custom">
            <h1>Custom</h1>
            <TaskList 
                tasks = {customTasks} 
                deleteTask={deleteTask} 
                claimTask={claimTask}
                addTask={addTask}/>
        </div>
    )
}

function TaskList({tasks, deleteTask, claimTask, addTask}) {
    return(
        <div className='tasklist'>
            <UnclaimedTasks 
                tasks = {tasks} 
                deleteTask = {deleteTask} 
                claimTask={claimTask} />
            <ClaimedTasks 
                tasks = {tasks} 
                deleteTask = {deleteTask} 
                claimTask={claimTask} />
            <TaskCreator addTask={addTask}/>
        </div>
    )
}

function UnclaimedTasks({tasks, deleteTask, claimTask}) {
    let tasklist = [];
    tasks.forEach((t) => {
        if (!t.claimed) {
            tasklist.push(
                <Task 
                    task = {t} 
                    deleteTask={deleteTask} 
                    claimTask={claimTask}/>
            )
        }
    });

    return(
        <div className='unclaimed'>
            {tasklist}
        </div>
    )
}

function ClaimedTasks({tasks, deleteTask, claimTask}) {
    let tasklist = [];
    tasks.forEach((t) => {
        if (t.claimed) {
            tasklist.push(
                <Task 
                    task = {t} 
                    deleteTask={deleteTask} 
                    claimTask={claimTask}/>
            )
        }
    });

    return(
        <div className='claimed'>
            {tasklist}
        </div>
    )
}

function Task({task, deleteTask, claimTask}) {
    return(
        <div className="task">
            <h1> {task.reward} </h1>
            <h1> {task.goal} </h1>
            <button onClick={() => claimTask(task.goal)}> claim </button>
            <button onClick={() => deleteTask(task.goal)}> delete </button>
        </div>
    )
}

function TaskCreator({addTask}) {
    const [reward, setReward] = useState("")
    const [goal, setGoal] = useState("")

    return(
        <div className='taskCreator'>
            <form>
                <input 
                    type="number" 
                    placeholder="100" 
                    value={reward} 
                    onChange={(e) => setReward(e.target.value)}
                />
                <input 
                    type="text" 
                    placeholder='New task here!' 
                    value={goal} 
                    onChange={(e) => setGoal(e.target.value)}
                />
            </form>
            <button onClick={() =>
                {addTask({reward:Number(reward), goal:goal, claimed:false});
                setReward(""); setGoal("")}
            }>Add</button>
        </div>
    )
}