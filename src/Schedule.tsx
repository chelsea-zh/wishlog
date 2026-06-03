import { useState } from "react"
import './Schedule.css'

type Block = {id:number, name:string, start:number, end:number}

let blocks: Block[] = [
    {id:1, name: "string", start: 8, end: 9}
]

let hourHeight = 2.5

export default function Schedule() {
    return(
        <div className = "schedule">
            <h1>schedule</h1>
            <div><Timeline/></div>
        </div>
    )
}

function Date({date, day}) {
  return (
    <>
      <h2>{date}</h2>
      <h2>{day}</h2>
    </>
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

function Blocks() {

    let events = blocks.map(block =>
        <div className="block" key={block.id}>
            {block.name}
        </div>
    )

    return(
        <div>
            {events}
        </div>
    )
}