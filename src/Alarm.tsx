import { useEffect, useRef } from "react";
import './Alarm.css'

type Block = {id: number, name: string, start: number, end: number}

export default function Alarm({blocks, now}:{blocks:Block[], now:Date}) {

    let next:string = ""
    let current:Block = {id: -1, name:"empty", start:0, end:0}

    current = 
        blocks.find(
            block => block.start <= toMinD(now) && block.end > toMinD(now)
        ) ?? {id: -1, name:"empty", start:0, end:0}

    let nextB:Block = blocks.find(block => block.start > toMinD(now)) ?? {id: -1, name:"empty", start:0, end:0}
    if (nextB.id != -1) {
        next = "Upcoming: " + nextB.name
    } else {
        if (current.id != -1) {
            next = "Last task of the day!"
        } else {
            next = "Done for the day!"
        }
    }

    const prevBlock = useRef(current.id)
    const prevBlockName = useRef(current.name)

    useEffect(() => {
        if (prevBlock.current != current.id) {
            if (prevBlock.current == -1) {
                alert("start " + current.name)
            } else if (prevBlock.current != -1 && current.id != -1) {
                alert("stop " + prevBlockName.current + " and start " + current.name)
            } else {
                alert("stop " + prevBlockName.current)
            }
        }
        
        prevBlock.current = current.id
        prevBlockName.current = current.name
    }, [current.id])

    let hrLeft:number = 0
    let minLeft:number = 0
    let secLeft:number = 0
    let currS:string = ""
    let currE:string = ""
    let currN:string = ""

    if (current.id == -1) {
        hrLeft = 0
        minLeft = 0
        secLeft = 0
        currS = "00:00"
        currE = "00:00"
        currN = ""
    } else {
        hrLeft = Math.trunc((current.end - toMinD(now) - 1) / 60)
        minLeft = (current.end - toMinD(now) - 1) % 60
        secLeft = 60 - now.getSeconds()
        currS = toHr(current.start)
        currE = toHr(current.end)
        currN = current.name
    }

    // if (hrLeft == 0 && minLeft == 0 && secLeft == 1) {
    //     alert("end!")
    // }

    function toHr(min:number) {
        return(String(Math.trunc(min / 60)).padStart(2, "0") + ":" + String(min % 60).padStart(2, "0"))
    }

    function toMinD(date:Date) {
        return(date.getHours() * 60 + date.getMinutes())
    }

    return(
        <div className="alarm">
            <div className="current">
                <h1>{currN}</h1>
            </div>

            <div className="start">
                <h1>start</h1>
                <h1>{currS}</h1>
            </div>

            <div className="time" style={{gridTemplateColumns:
                hrLeft !== 0
                ? (hrLeft > 9
                    ? "5fr 1fr 5fr 1fr 5fr"
                    : "2fr 1fr 4fr 1fr 4fr")
                : "4fr 1fr 4fr"
            }}>
                {(hrLeft !== 0) && <h1>{String(hrLeft)}</h1>}
                {(hrLeft !== 0) && <h1>:</h1>}
                <h1>{String(minLeft).padStart(2, "0")}</h1>
                <h1>:</h1>
                <h1>{String(secLeft).padStart(2, "0")}</h1>
            </div>

            <div className="end">
                <h1>end</h1>
                <h1>{currE}</h1>
            </div>

            <div className="next">
                <h1>{next}</h1>
            </div>
        </div>
    )
}