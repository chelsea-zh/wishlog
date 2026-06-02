let daily = false
let dailyTasks = []
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
        </div>
    )
}

function ToDoSelector() {}

function Dailies() {
    return(
       <h1>dailies</h1>
    )
}

function Custom() {
    return(
       <h1>custom</h1>
    )
}

function TaskLisk() {}

function Task() {}

function TaskCreator() {}