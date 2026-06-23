import { useState, useEffect, useRef } from 'react'
import './ToDo.css'

// task = {reward: 100, goal: "string", claimed: false}

type Task = {id: string, reward: number, goal: string, claimed: boolean}

export default function ToDo({changeGems, now}: {changeGems: (gems: number) => void, now:Date}) {
    const [todoTut, setTodoTut] = useState<boolean>(false)

    const [daily, setDaily] = useState<boolean>(true);
    const [dailyTasks, setDailyTasks] = useState<Task[]>([
        {id: "1", reward: 100, goal: "testiad ad;lkfj sdf a sdflk; slf d fsdfng", claimed: false},
        {id: "2", reward: 200, goal: "other test", claimed: false},
        {id: "3", reward: 100, goal: "test 3", claimed: false},
        {id: "4", reward: 200, goal: "test 4", claimed: false},
        {id: "5", reward: 200, goal: "other test", claimed: false},
        {id: "6", reward: 100, goal: "test 3", claimed: false},
        {id: "7", reward: 200, goal: "test 4", claimed: false},
        {id: "8", reward: 200, goal: "other test", claimed: false},
        {id: "9", reward: 100, goal: "test 3", claimed: false},
        {id: "10", reward: 200, goal: "test 4", claimed: false},
        {id: "11", reward: 200, goal: "other test", claimed: false},
        {id: "12", reward: 100, goal: "test 3", claimed: false},
        {id: "13", reward: 200, goal: "test 4", claimed: false}
    ]);
    const [customTasks, setCustomTasks] = useState<Task[]>([]);
    
    const currentDow = now.toDateString();
    const prevDow = useRef(currentDow);

    useEffect(() => {
        if (prevDow.current !== currentDow) {

            if (now.getDay() === 0) {
                resetCustom();
            }

            resetDailies();
            prevDow.current  = currentDow;
        }
    }, [currentDow])

    const nextDay:Date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
    const nextWeek:Date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (7 - now.getDay()))

    const dailyMs:number = nextDay.getTime() - now.getTime()
    const weeklyMs:number = nextWeek.getTime() - now.getTime()

    const dailyCd:string = 
        "reset in " +
        String(Math.trunc(dailyMs/1000/60/60)).padStart(2, "0") + ":" +
        String(Math.trunc(dailyMs/1000/60%60)).padStart(2, "0") + ":" +
        String(Math.trunc(dailyMs/1000%60)).padStart(2, "0")

    const weeklyCd:string = 
        "clear in " +
        String(Math.trunc(weeklyMs/1000/60/60/24)).padStart(2, "0") + "d " +
        String(Math.trunc(weeklyMs/1000/60/60%24)).padStart(2, "0") + ":" +
        String(Math.trunc(weeklyMs/1000/60%60)).padStart(2, "0") + ":" +
        String(Math.trunc(weeklyMs/1000%60)).padStart(2, "0")

    function deleteTask(id: string) {
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

    function claimTask(id: string) {
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
            setDailyTasks(dailyTasks => [...dailyTasks, {...task, id: crypto.randomUUID()}])
        } else {
            setCustomTasks(customTasks => [...customTasks, {...task, id: crypto.randomUUID()}])
        }
    }

    function changeDaily() {
        setDaily(true)
    }
    function changeCustom() {
        setDaily(false)
    }

    function resetDailies() {
        setDailyTasks(dailyTasks =>
            dailyTasks.map(task =>
                task.claimed === true
                    ? { ...task, claimed: false }
                    : task
            )
        )
    }

    function resetCustom() {
        let ids:string[] = []

        customTasks.forEach(task => {
            if (task.claimed == true) {
                ids.push(task.id)
            }
        });

        let currDaily = daily
        setDaily(false)

        ids.forEach(id => {
            deleteTask(id);
        });

        setDaily(currDaily)
    }

    return(
        <div className = "todo" style={{zIndex: todoTut ? "1" : "auto"}}>
            {todoTut && <Dinfo setTodoTut={setTodoTut} daily={daily}/>}
            {daily ? (
                <Dailies 
                    dailyTasks={dailyTasks} 
                    deleteTask={deleteTask} 
                    claimTask={claimTask}
                    addTask={addTask}
                    dailyCd={dailyCd}
                    setTodoTut={setTodoTut}/>
            ) : (
                <Custom 
                    customTasks={customTasks} 
                    deleteTask={deleteTask} 
                    claimTask={claimTask}
                    addTask={addTask}
                    weeklyCd={weeklyCd}
                    setTodoTut={setTodoTut}/>
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

function Dailies({dailyTasks, deleteTask, claimTask, addTask, dailyCd, setTodoTut}:
    {dailyTasks: Task[], deleteTask: (id: string) => void, claimTask: (id: string) => void, 
        addTask: (task: {reward: number, goal: string, claimed: boolean}) => void, dailyCd:string,
        setTodoTut: React.Dispatch<React.SetStateAction<boolean>>}
) {
    return(
        <div className="dailies">
            <span className='all'>
                <span className='inner'>
                    <h1>Dailies</h1>
                    <h2>{dailyCd}</h2>
                </span>
            <h2 className='infoButton' onClick={() => setTodoTut(true)}>&#9432;</h2>
            </span>
            <TaskList 
                tasks = {dailyTasks} 
                deleteTask={deleteTask}  
                claimTask={claimTask}
                addTask={addTask}/>
        </div>
    )
}

function Custom({customTasks, deleteTask, claimTask, addTask, weeklyCd, setTodoTut}:
    {customTasks: Task[], deleteTask: (id: string) => void, claimTask: (id: string) => void, 
        addTask: (task: {reward: number, goal: string, claimed: boolean}) => void, weeklyCd:string
        setTodoTut: React.Dispatch<React.SetStateAction<boolean>>}
) {
    return(
        <div className="custom">
            <span className='all'>
                <span className='inner'>
                    <h1>Custom</h1>
                    <h2>{weeklyCd}</h2>
                </span>
            <h2 className='infoButton' onClick={() => setTodoTut(true)}>&#9432;</h2>
            </span>
            <TaskList 
                tasks = {customTasks} 
                deleteTask={deleteTask} 
                claimTask={claimTask}
                addTask={addTask}/>
        </div>
    )
}

function TaskList({tasks, deleteTask, claimTask, addTask}:
    {tasks: Task[], deleteTask: (id: string) => void, claimTask: (id: string) => void, 
        addTask: (task: {reward: number, goal: string, claimed: boolean}) => void}
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
    {tasks: Task[], deleteTask: (id: string) => void, claimTask: (id: string) => void}
) {
    let tasklist:React.ReactNode[] = [];
    tasks.forEach((t) => {
        if (!t.claimed) {
            tasklist.push(
                <Task 
                    key={t.id}
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
    {tasks: Task[], deleteTask: (id: string) => void, claimTask: (id: string) => void}
) {
    let tasklist:React.ReactNode[] = [];
    tasks.forEach((t) => {
        if (t.claimed) {
            tasklist.push(
                <Task 
                    key={t.id}
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
    {task: Task, deleteTask: (id: string) => void, claimTask: (id: string) => void}
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

function Dinfo({setTodoTut, daily}:{setTodoTut: React.Dispatch<React.SetStateAction<boolean>>, daily:boolean}) {
    return(
        <div className='info infoTodo'>
            {/* <div className="infoHighlight"></div> */}
            <div className='infoText'>
                <h1 onClick={() => setTodoTut(false)}>&#x2715;</h1>
                {daily && <p>
                Dailies are for your tasks that are repeated day after day. 
                Daily tasks reset at midnight; claimed tasks will be unclaimed the next day. 
                <br/>
                <br/>
                Each task rewards you with currency that can be spent on wishes. 
                Create your own tasks and specify their reward amount at the bottom.
                </p>}
                {!daily && <p>
                Custom tasks for your standard to-do list. 
                Custom tasks do not reset; at the end of each week, claimed tasks are deleted. 
                <br/>
                <br/>
                Each task rewards you with currency that can be spent on wishes. 
                Create your own tasks and specify their reward amount at the bottom.
                </p>}
            </div>
        </div>
    )
}