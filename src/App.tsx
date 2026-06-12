import { useState } from 'react'
import ToDo from './ToDo'
import Schedule from './Schedule'
import Alarm from './Alarm'
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
            <h1 onClick={() => setPage("main")}>main</h1>
            <h1 onClick={() => setPage("alarm")}>alarm</h1>
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

function App() {
    let [page, setPage] = useState<string>("alarm")
    let [gems, setGems] = useState<number>(0)

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
                <Schedule />
                <ToDo changeGems={changeGems}/>
            </div>
            <div hidden = {page !== "alarm"}>
                <Alarm />
            </div>
        </div>
    );
}

export default App
