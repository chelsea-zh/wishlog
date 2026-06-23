import { useState } from "react"
import './Schedule.css'
import './ToDo.css'

type Block = {id: string, name: string, start: number, end: number}

export default function Schedule({blocks, setBlocks}:{blocks:Block[], setBlocks: React.Dispatch<React.SetStateAction<Block[]>>}) {
    const [schedTut, setSchedTut] = useState<boolean>(false)

    function addBlock(block: Block){
        let added = [...blocks, block]
        let sorted = added.sort((a, b) => a.start - b.start)
        setBlocks(sorted)
    }

    function deleteBlock(start: number){
        setBlocks(blocks =>
            blocks.filter(block => block.start != start)
        )
    }

    return(
        <div className = "scheduleCont" style={{zIndex: schedTut ? "1" : "auto"}}>
            {schedTut && <Sinfo setSchedTut={setSchedTut}/>}
            <div className="schedule">
            <div className="infoButton">
                <h2 onClick={() => setSchedTut(true)}>&#9432;</h2>
            </div>
            <Day />
            <div style={{position:'relative'}}>
                <Timeline />
                <Blocks blocks={blocks}  deleteBlock={deleteBlock}/>
            </div>
            <BlockCreator blocks={blocks} addBlock={addBlock}/>
            </div>
        </div>
    )
}

function Day() {
    let today = new Date();
    let date = String(today.getDate()).padStart(2, '0');
    let month = today.toString().split(" ")[1];
    let day = today.toLocaleDateString('en-US', {weekday:'short'});

    return (
        <div className="day">
            <h1>{date}</h1>
            <h2>{day}</h2>
            <h2>{month}</h2>
        </div>
    );
}

function Timeline() {

    let lines = []

    for (let i = 0; i < 25; i++) {
        lines.push(Hourline(i))
    }

    return(
        lines
    )
}

function Hourline(hour:number) {
    return(
        <div className="hourline" key={hour}>
            <h4>{hour}:00</h4>
            <hr/>
        </div>
    )
}

function Blocks({blocks, deleteBlock}:{blocks:Block[], deleteBlock: (start: number) => void}) {

    let events = blocks.map(block =>
        <div className="block" key={block.id} style={{
            height: `calc(${3 * (block.end/60 - block.start/60)}vh + 2px)`,
            top: `calc(${1.5 + 3 * block.start/60}vh - 1px)`
        }}>
            <h4>{block.name}</h4>
            <h4 
                style={{position:"absolute", right:"0.25rem", top:"0px", cursor:"pointer"}}
                onClick={() => deleteBlock(block.start)}
            >—</h4>
        </div>
    )

    return(
        <div>
            {events}
        </div>
    )
}

function BlockCreator({blocks, addBlock}:{blocks:Block[], addBlock: (block: Block) => void}) {
    const [creating, setCreating] = useState<boolean>(false)

    return(
        <div className="blockCreator">
            <div className="blockButton" onClick={() => setCreating(true)}>
                <h1>+</h1>
            </div>
            {creating && <BlockInfo blocks = {blocks} addBlock={addBlock} setCreating={setCreating}/>}
        </div>
    )
}

function BlockInfo({blocks, addBlock, setCreating}
    :{blocks:Block[], addBlock: (block: Block) => void, setCreating: (creating: boolean) => void}
) {
    const [title, setTitle] = useState<string>("")
    const [start, setStart] = useState<number>(0)
    const [end, setEnd] = useState<number>(0)
    const [valid, setValid] = useState<boolean | null>()

    function toMin(time:string) {
        return(Number(time.split(":")[0]) * 60 + Number(time.split(":")[1]))
    }

    function toHr(min:number) {
        return(String(Math.trunc(min / 60)).padStart(2, "0") + ":" + String(min % 60).padStart(2, "0"))
    }

    function isValid(title:string, start:number, end:number) {
        let v = true
        blocks.forEach((block) => {
            if (start == null || end == null || title == "") {
                v = false
            } else if (end > block.start && end <= block.end) {
                v = false
            } else if (start >= block.start && start < block.end) {
                v = false
            } else if (start <= block.start && end > block.end) {
                v = false
            } else if (end <= start) {
                v = false
            }
        })

        if (v) {
            addBlock({id:crypto.randomUUID(), name:title, start:start, end:end})
            setCreating(false)
            setValid(true)
        } else {
            setValid(false)
        }
    }

    return(
        <div className="blockInfo">
            <span></span>
            <div className="blockForm">
                <form>
                    <h2>Title</h2>
                    <input 
                        type="text"
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}
                    ></input>
                </form>
                <form>
                    <h2>Start Hour</h2>
                    <input 
                        type="time"
                        value={toHr(start)} 
                        onChange={(e) => setStart(toMin(e.target.value))}
                    ></input>
                </form>
                <form>
                <h2>End Hour</h2>
                    <input 
                        type="time"
                        value={toHr(end)} 
                        onChange={(e) => setEnd(toMin(e.target.value))}
                    ></input>
                </form>
                <div>
                    <button onClick = {() =>
                        {isValid(title, start, end);
                        setTitle(""); setStart(0); setEnd(0)}
                    }>Submit</button>
                    <button onClick = {() =>
                        {setTitle(""); setStart(0); setEnd(0); setCreating(false)}
                    }>Cancel</button>
                </div>
                
            </div>
            {valid == false && <div className="blockForm">
                <h1>Invalid Entry or Overlapping Times!</h1>
                <h2>Try again.</h2>
                <button onClick = {() => {setValid(null); setCreating(false)}}>OK</button>
            </div>}
        </div>
    )
}

function Sinfo({setSchedTut}:{setSchedTut: React.Dispatch<React.SetStateAction<boolean>>}) {
    return(
        <div className="info infoSched">
            {/* <div className="infoHighlight"></div> */}
            <div className="infoText">
                <h1 onClick={() => setSchedTut(false)}>&#x2715;</h1>
                <p>
                    This block will display the 24 hours of the current day.
                    Click the "+" in the left corner to add a block of time to your day.
                    Added blocks will be displayed; click the "-" in the right corner to delete one.
                    <br/>
                    <br/>
                    The alarm page will act as a countdown during your added times, as well as notify when a block starts or ends.
                    It will also display the title of the upcoming block at the bottom.
                </p>
            </div>
        </div>
    )
}