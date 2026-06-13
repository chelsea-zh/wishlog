import { useState, useEffect } from "react";
import './Alarm.css'

type Block = {id: number, name: string, start: number, end: number}

export default function Alarm({blocks}) {
    const [now, setNow] = useState<Date>(new Date())

    useEffect(() => {
        const interval = setInterval(
            () => {setNow(new Date())},
            1000
        )

        return () => clearInterval(interval)

    })

    let next:Block
    let current:Block
    let started:boolean = false

    blocks.forEach(block => {
        if (block.start <= toMinD(now)) {
            started = true
            if (block.end > toMinD(now)) {
                current = block
            } else {
                current = null
            }
        }
        if (block.start > toMinD(now)) {
            if (started) {
                next = block
                started = false
            }
        }
    });

    if (started) {
        next = {id: 0, name: "dw", start: 0, end: 0}
    }

    let hrLeft:number = 0
    let minLeft:number = 0
    let secLeft:number = 0
    let currS:string = ""
    let currE:string = ""
    let currN:string = ""

    if (current == null) {
        hrLeft = 0
        minLeft = 0
        secLeft = 0
        currS = "00:00"
        currE = "00:00"
        currN = ""
    } else {
        hrLeft = (current.end - toMinD(now) - 1) / 60
        minLeft = (current.end - toMinD(now) - 1) % 60
        secLeft = 60 - now.getSeconds()
        currS = toHr(current.start)
        currE = toHr(current.end)
        currN = current.name
    }

    function toMin(time:string) {
        return(Number(time.split(":")[0]) * 60 + Number(time.split(":")[1]))
    }

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

            <div className="time">
                <h1>{String(hrLeft)}:{String(minLeft).padStart(2, "0")}:{String(secLeft).padStart(2, "0")}</h1>
            </div>

            <div className="end">
                <h1>end</h1>
                <h1>{currE}</h1>
            </div>

            <div className="next">
                <h1>Next: {next.name}</h1>
            </div>
        </div>
    )
}