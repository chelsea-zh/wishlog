import { useState } from 'react'
import './ToDo.css'

// task = {reward: 100, goal: "string", claimed: false}

type Task = {id: number, reward: number, goal: string, claimed: boolean}

export default function ToDo({changeGems}: {changeGems: (gems: number) => void}) {
    const [daily, setDaily] = useState<boolean>(true);
    const [dailyTasks, setDailyTasks] = useState<Task[]>([
        {id: 1, reward: 100, goal: "testiad ad;lkfj sdf a sdflk; slf d fsdfng", claimed: false},
        {id: 2, reward: 200, goal: "other test", claimed: false},
        {id: 3, reward: 100, goal: "test 3", claimed: false},
        {id: 4, reward: 200, goal: "test 4", claimed: false},
        {id: 5, reward: 200, goal: "other test", claimed: false},
        {id: 6, reward: 100, goal: "test 3", claimed: false},
        {id: 7, reward: 200, goal: "test 4", claimed: false},
        {id: 8, reward: 200, goal: "other test", claimed: false},
        {id: 9, reward: 100, goal: "test 3", claimed: false},
        {id: 10, reward: 200, goal: "test 4", claimed: false},
        {id: 11, reward: 200, goal: "other test", claimed: false},
        {id: 12, reward: 100, goal: "test 3", claimed: false},
        {id: 13, reward: 200, goal: "test 4", claimed: false}
    ]);
    const [customTasks, setCustomTasks] = useState<Task[]>([]);

    function deleteTask(id: number) {
        if (daily) {
            setDailyTasks(dailyTasks =>
                dailyTasks.filter(task => task.id != id)
            )
        } else {
            setCustomTasks(customTasks =>
                customTasks.filter(task => task.id != id)
            )
        }
    }

    function claimTask(id: number) {
        if (daily) {
            setDailyTasks(dailyTasks =>
                dailyTasks.map(task => 
                    task.id === id
                    ? {...task, claimed: true}
                    : task
                )
            )
            let task = dailyTasks.find(block => block.id == id)!
            if (task.claimed==false) {
                changeGems(task.reward)
            }
        } else {
            setCustomTasks(customTasks =>
                customTasks.map(task =>
                    task.id === id
                        ? { ...task, claimed: true }
                        : task
                )
            )
            let task = customTasks.find(block => block.id == id)!
            if (task.claimed == false) {
                changeGems(task.reward)
            }
        }
    }

    function addTask(task: {reward: number, goal: string, claimed: boolean}) {
        if (daily) {
            setDailyTasks(dailyTasks => [...dailyTasks, {...task, id: dailyTasks.length + 1}])
        } else {
            setCustomTasks(customTasks => [...customTasks, {...task, id: customTasks.length + 1}])
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
            <ToDoSelector onClick={changeDaily} daily={daily}/>
            <ToDoSelector onClick={changeCustom} daily={!daily}/>
        </div>
    )
}

function ToDoSelector({onClick, daily}: {onClick: () => void, daily: boolean}) {
    return(
        <div className="sel" onClick={onClick} style={
            daily ? {backgroundColor:"var(--light-2)"} : {backgroundColor:"var(--medium)"}
        }>
            <h1>s</h1>
        </div>
    )
}

function Dailies({dailyTasks, deleteTask, claimTask, addTask}:
    {dailyTasks: Task[], deleteTask: (id: number) => void, claimTask: (id: number) => void, addTask: (task: Task) => void}
) {
    return(
        <div className="dailies">
            <h1>Dailies</h1>
            <TaskList 
                tasks = {dailyTasks} 
                deleteTask={deleteTask}  
                claimTask={claimTask}
                addTask={addTask}/>
        </div>
    )
}

function Custom({customTasks, deleteTask, claimTask, addTask}:
    {customTasks: Task[], deleteTask: (id: number) => void, claimTask: (id: number) => void, addTask: (task: Task) => void}
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
    {tasks: Task[], deleteTask: (id: number) => void, claimTask: (id: number) => void, addTask: (task: Task) => void}
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
    {tasks: Task[], deleteTask: (id: number) => void, claimTask: (id: number) => void}
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
    {tasks: Task[], deleteTask: (id: number) => void, claimTask: (id: number) => void}
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
    {task: Task, deleteTask: (id: number) => void, claimTask: (id: number) => void}
) {
    return(
        <div className="task">
            <h1> {task.reward} </h1>
            <h1> {task.goal} </h1>
            <button onClick={() => claimTask(task.id)}> claim </button>
            <button onClick={() => deleteTask(task.id)}> delete </button>
        </div>
    )
}

function TaskCreator({addTask}: {addTask: (task: {reward: number, goal: string, claimed: boolean}) => void}) {
    const [reward, setReward] = useState<number | "">("")
    const [goal, setGoal] = useState<string>("")

    return(
        <div className='taskCreator'>
            <form>
                <input 
                    type="number" 
                    placeholder="100" 
                    step='50'
                    min={0}
                    value={reward} 
                    onChange={(e) => setReward(Number(e.target.value))}
                />
            </form>
            <form>
                <input 
                    type="text" 
                    placeholder='New task here!' 
                    value={goal} 
                    onChange={(e) => setGoal(e.target.value)}
                />
            </form>
            {/* <form> */}
                <button type="button" onClick={() =>
                    {addTask({reward:Number(reward), goal:goal, claimed:false});
                    setReward(""); setGoal("")}
                }>Add</button>
            {/* </form> */}
        </div>
    )
}