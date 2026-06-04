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

    function createBlock(title, start, end) {
        addBlock({id:blocks.length+1, name:title, start:start, end:end})
    }

    return(
        <div className = "schedule">
            <Day />
            <div style={{position:'relative'}}>
                <Timeline />
                <Blocks 
                    blocks={blocks} />
            </div>
            <BlockCreator createBlock={createBlock}/>
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
            <h2 style={{
                gridRow: "1 / span 2", 
                textAlign:'center', 
                margin:'auto'}}>{date}</h2>
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

function Blocks({blocks}) {

    let events = blocks.map(block =>
        <div className="block" key={block.id} style={{
            backgroundColor:'cadetblue',
            position:'absolute',
            width:'60%',
            height: `calc(${3 * (block.end/60 - block.start/60)}vh + 2px)`,
            top: `calc(${1.5 + 3 * block.start/60}vh - 1px)`,
            right: '10%'
        }}>
            {block.name}
        </div>
    )

    return(
        <div>
            {events}
        </div>
    )
}

function BlockCreator({createBlock}) {
    const [creating, setCreating] = useState(false)

    return(
        <div className="blockCreator">
            {creating && <BlockInfo createBlock={createBlock} setCreating={setCreating}/>}
            <div className="blockButton" onClick={() => setCreating(true)}>

            </div>
        </div>
    )
}

function BlockInfo({createBlock, setCreating}) {
    const [title, setTitle] = useState<string>("")
    const [start, setStart] = useState<number>()
    const [end, setEnd] = useState<number>()

    function toMin(time:string) {
        return(Number(time.split(":")[0]) * 60 + Number(time.split(":")[1]))
    }

    function toHr(min:number) {
        return(String(Math.trunc(min / 60)).padStart(2, "0") + ":" + String(min % 60).padStart(2, "0"))
    }

    return(
        <div className="blockInfo">
            <span></span>
            <div id="blockForm">
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
                        {createBlock(title, start, end);
                        setTitle(""); setStart(null); setEnd(null); setCreating(false)}
                    }>Submit</button>
                    <button onClick = {() =>
                        {setTitle(""); setStart(null); setEnd(null); setCreating(false)}
                    }>Cancel</button>
                </div>
                
            </div>
        </div>
    )
}