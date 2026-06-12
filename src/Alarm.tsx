import { useState, useEffect } from "react";
import './Alarm.css'

export default function Alarm() {
    return(
        <div className="alarm">
            <div className="current">
                <h1>studying</h1>
            </div>

            <div className="start">
                <h1>start</h1>
                <h1>13:12</h1>
            </div>

            <div className="time">
                <h1>15:40</h1>
            </div>

            <div className="end">
                <h1>end</h1>
                <h1>14:12</h1>
            </div>

            <div className="next">
                <h1>Next: idk</h1>
            </div>
        </div>
    )
}