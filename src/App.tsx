import { useState } from 'react'
import ToDo from './ToDo'
import Schedule from './Schedule';
import './App.css'

function Title() {
    return (
        <div className='title'>
            <h1>Wishlog</h1>
        </div>
    )
}

function Sidebar() {
    return (
        <div className='sidebar'>
            <h1>Sidebar</h1>
        </div>
    )
}

function CurrencyBar({gems}) {
    return (
        <div className='currencyBar'>
            {gems}
        </div>
    )
}

function App() {
    let [gems, setGems] = useState(0)

    function changeGems(x) {
        setGems(gems + x)
    }

    return (
        <div>
            <CurrencyBar gems={gems}/>
            <Sidebar />
            <Title />
            <Schedule />
            <ToDo changeGems={changeGems}/>
        </div>
    );
}

export default App
