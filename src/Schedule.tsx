import { useState } from "react"
import './Schedule.css'

export default function Schedule() {
    const [blocks, setBlocks] = useState([
        {id:1, name: "string", start: 480, end: 540},
        {id:1, name: "string", start: 3*60, end: 300},
        {id:1, name: "string", start: 15*60, end: 19*60}
    ])

    function addBlock(block){
        setBlocks(blocks => [...blocks, block])
    }

    function deleteBlock(start){
        setBlocks(blocks =>
            blocks.filter(block => block.start != start)
        )
    }

    return(
        <div className = "schedule">
            <Day />
            <div style={{position:'relative'}}>
                <Timeline />
                <Blocks 
                    blocks={blocks}  deleteBlock={deleteBlock}/>
            </div>
            <BlockCreator blocks={blocks} addBlock={addBlock}/>
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
        <div className="hourline">
            <h4>{hour}:00</h4>
            <hr/>
        </div>
    )
}

function Blocks({blocks, deleteBlock}) {

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

function BlockCreator({blocks, addBlock}) {
    const [creating, setCreating] = useState(false)

    return(
        <div className="blockCreator">
            <div className="blockButton" onClick={() => setCreating(true)}>
                <h1>+</h1>
            </div>
            {creating && <BlockInfo blocks = {blocks} addBlock={addBlock} setCreating={setCreating}/>}
        </div>
    )
}

function BlockInfo({blocks, addBlock, setCreating}) {
    const [title, setTitle] = useState<string>("")
    const [start, setStart] = useState<number>()
    const [end, setEnd] = useState<number>()
    const [valid, setValid] = useState<boolean>()

    function toMin(time:string) {
        return(Number(time.split(":")[0]) * 60 + Number(time.split(":")[1]))
    }

    function toHr(min:number) {
        return(String(Math.trunc(min / 60)).padStart(2, "0") + ":" + String(min % 60).padStart(2, "0"))
    }

    function isValid(title, start, end) {
        let v = true
        blocks.forEach((block) => {
            if (start == null || end == null || title == "") {
                v = false
            } else if (end >= block.start && end <= block.end) {
                v = false
            } else if (start >= block.start && start <= block.end) {
                v = false
            } else if (start <= block.start && end>= block.end) {
                v = false
            }
        })

        if (v) {
            addBlock({id:blocks.length+1, name:title, start:start, end:end})
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
                        setTitle(""); setStart(null); setEnd(null)}
                    }>Submit</button>
                    <button onClick = {() =>
                        {setTitle(""); setStart(null); setEnd(null); setCreating(false)}
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