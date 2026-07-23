import { useState, useEffect } from 'react'
import ToDo from './ToDo'
import Schedule from './Schedule'
import Alarm from './Alarm'
import Wish from './Wish'
import './App.css'

function Title() {
    return (
        <div className='title'>
            <h1>Wishlog</h1>
        </div>
    )
}

function Sidebar({setPage}:{setPage: React.Dispatch<React.SetStateAction<string>>}) {
    return (
        <div className='sidebar'>
            <h1 onClick={() => setPage("main")}>Home</h1>
            <h1 onClick={() => setPage("alarm")}>Alarm</h1>
            <h1 onClick={() => setPage("wish")}>Wish</h1>
        </div>
    )
}

function CurrencyBar({gems}:{gems: number}) {
    return (
        <div className='currencyBar'>
            {gems}
        </div>
    )
}


type Block = {id: string, name: string, start: number, end: number}

function App() {
    let [page, setPage] = useState<string>("main")
    let [gems, setGems] = useState<number>(0)

    const [blocks, setBlocks] = useState<Block[]>([
        {id:"2", name: "string", start: 3*60, end: 7*60},
        {id:"1", name: "string", start: 480, end: 540},
        {id:"3", name: "test", start: 15*60, end: 19*60}
    ])

    const [now, setNow] = useState<Date>(new Date())

    useEffect(() => {
        const interval = setInterval(
            () => {setNow(new Date())},
            1000
        )

        return () => clearInterval(interval)

    })

    function changeGems(x: number) {
        setGems(gems + x)
    }

    return (
        <div>
            <div hidden = {page === "alarm"}>
                <CurrencyBar gems={gems} /> 
            </div>
            <Sidebar setPage={setPage}/>
            <div hidden={page !== "main"}>
                <Title />
                <Schedule blocks={blocks} setBlocks={setBlocks}/>
                <ToDo changeGems={changeGems} now={now}/>
            </div>
            <div hidden = {page !== "alarm"}>
                <Alarm blocks={blocks} now={now}/>
            </div>
            <div hidden = {page !== "wish"}>
                <Wish gems={gems} changeGems={changeGems}/>
            </div>
        </div>
    );
}

export default App
