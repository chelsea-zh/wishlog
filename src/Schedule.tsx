import { useState } from "react"
import './Schedule.css'

export default function Schedule() {
    const [blocks, setBlocks] = useState([
        {id:1, name: "string", start: 8, end: 9},
        {id:1, name: "string", start: 3, end: 5},
        {id:1, name: "string", start: 15, end: 19}
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
                    blocks={blocks} />
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
            height: `calc(${3 * (block.end - block.start)}vh + 2px)`,
            top: `calc(${1.5 + 3 * block.start}vh - 1px)`,
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