import { useState } from 'react'
import './ToDo.css'

// task = {reward: 100, goal: "string", claimed: false}

type Task = {reward: number, goal: string, claimed: boolean}

export default function ToDo({changeGems}: {changeGems: (gems: number) => void}) {
    const [daily, setDaily] = useState<boolean>(true);
    const [dailyTasks, setDailyTasks] = useState<Task[]>([
        {reward: 100, goal: "testiad ad;lkfj sdf a sdflk; slf d fsdfng", claimed: false},
        {reward: 200, goal: "other test", claimed: false},
        {reward: 100, goal: "test 3", claimed: false},
        {reward: 200, goal: "test 4", claimed: false}
    ]);
    const [customTasks, setCustomTasks] = useState<Task[]>([]);

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
            let task = dailyTasks.find(block => block.goal == goal)!
            if (task.claimed==false) {
                changeGems(task.reward)
            }
        } else {
            setCustomTasks(customTasks =>
                customTasks.map(task =>
                    task.goal === goal
                        ? { ...task, claimed: true }
                        : task
                )
            )
            let task = customTasks.find(block => block.goal == goal)!
            if (task.claimed == false) {
                changeGems(task.reward)
            }
        }
    }

    function addTask(task: Task) {
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

function ToDoSelector({onClick}: {onClick: () => void}) {
    return(
        <div className="sel" onClick={onClick}>
            <h1>s</h1>
        </div>
    )
}

function Dailies({dailyTasks, deleteTask, claimTask, addTask}:
    {dailyTasks: Task[], deleteTask: (goal: string) => void, claimTask: (goal: string) => void, addTask: (task: Task) => void}
) {
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

function Custom({customTasks, deleteTask, claimTask, addTask}:
    {customTasks: Task[], deleteTask: (goal: string) => void, claimTask: (goal: string) => void, addTask: (task: Task) => void}
) {
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

function TaskList({tasks, deleteTask, claimTask, addTask}:
    {tasks: Task[], deleteTask: (goal: string) => void, claimTask: (goal: string) => void, addTask: (task: Task) => void}
) {
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

function UnclaimedTasks({tasks, deleteTask, claimTask}:
    {tasks: Task[], deleteTask: (goal: string) => void, claimTask: (goal: string) => void}
) {
    let tasklist:React.ReactNode[] = [];
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

function ClaimedTasks({tasks, deleteTask, claimTask}:
    {tasks: Task[], deleteTask: (goal: string) => void, claimTask: (goal: string) => void}
) {
    let tasklist:React.ReactNode[] = [];
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

function Task({task, deleteTask, claimTask}:
    {task: Task, deleteTask: (goal: string) => void, claimTask: (goal: string) => void}
) {
    return(
        <div className="task">
            <h1> {task.reward} </h1>
            <h1> {task.goal} </h1>
            <button onClick={() => claimTask(task.goal)}> claim </button>
            <button onClick={() => deleteTask(task.goal)}> delete </button>
        </div>
    )
}

function TaskCreator({addTask}: {addTask: (task: Task) => void}) {
    const [reward, setReward] = useState<number | "">("")
    const [goal, setGoal] = useState<string>("")

    return(
        <div className='taskCreator'>
            <form>
                <input 
                    type="number" 
                    placeholder="100" 
                    value={reward} 
                    onChange={(e) => setReward(Number(e.target.value))}
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