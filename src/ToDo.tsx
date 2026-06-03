import './ToDo.css'

let daily = true

// task = {reward: 100, goal: "string", claimed: false}

let dailyTasks = [
    {reward: 100, goal: "testing", claimed: true},
    {reward: 200, goal: "other test", claimed: false},
    {reward: 100, goal: "test 3", claimed: true},
    {reward: 200, goal: "test 4", claimed: false}
]
let customTasks = []

export default function ToDo() {
    return(
        <div className = "todo">
            {/*use cssgrid with bottom block on left, selector on right ->
            just have them as onclick divs lmao too lazy*/}
            {daily ? (
                <Dailies />
            ) : (
                <Custom />
            )}
            <ToDoSelector />
            <ToDoSelector />
        </div>
    )
}

function ToDoSelector() {
    return(
        <div className="sel">
            <h1>s</h1>
        </div>
    )
}

function Dailies() {
    return(
        <div className="dailies">
            <h1>dailies</h1>
            <TaskList tasks = {dailyTasks} />
        </div>
    )
}

function Custom() {
    return(
       <h1 className="custom">custom</h1>
    )
}

function TaskList({tasks}) {
    return(
        <div className='tasklist'>
            <UnclaimedTasks tasks = {tasks} />
            <ClaimedTasks tasks = {tasks} />
        </div>
    )
}

function UnclaimedTasks({tasks}) {
    let tasklist = [];
    tasks.forEach((t) => {
        if (!t.claimed) {
            tasklist.push(
                <Task task = {t}/>
            )
        }
    });

    return(
        <div className='unclaimed'>
            {tasklist}
        </div>
    )
}

function ClaimedTasks({tasks}) {
    let tasklist = [];
    tasks.forEach((t) => {
        if (t.claimed) {
            tasklist.push(
                <Task task = {t}/>
            )
        }
    });

    return(
        <div className='claimed'>
            {tasklist}
        </div>
    )
}

function Task({task}) {
    return(
        <div className="task">
            <h1> {task.reward} </h1>
            <h1> {task.goal} </h1>
            <button> claim </button>
            <button> delete </button>
        </div>
    )
}

function TaskCreator() {}