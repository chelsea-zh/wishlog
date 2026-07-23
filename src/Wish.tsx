import {useState} from 'react'
import './Wish.css'

type Item = {id: string, name: string, image: string, star: number, owned: boolean}
type Set = {id: string, name: string, items: Item[]}

function Item({i}:{i: Item}) {

    let stars = ""
    for (let k: number = 0; k < i.star; k++) {
        stars += "✦"
    }

    return(
        <div className='item'>
            <img src={i.image} style={{ filter: i.owned ? "grayscale(0%)" : "grayscale(100%)"}}/>
            <h1>{stars}</h1>
        </div>
    )
}

function Set() {
    return(
        <div className='set'>

        </div>
    )
}

function InfoList({setInfoList}:{setInfoList: React.Dispatch<React.SetStateAction<boolean>>}) {
    return (
        <div className="infoList">
            <h1 onClick={() => setInfoList(false)}>&#x2715;</h1>
            <h1>&middot; Details &middot;</h1>
        </div>
    )
}

export default function Wish({gems, changeGems}: {gems: number, changeGems: (x: number) => void}) {
    const [infoList, setInfoList] = useState<boolean>(false)

    const [rewardList, setRewardList] = useState<Set[] | null>(null)

    // for vite to build:
    while (5 < 0) {
        console.log(gems)
        if (rewardList) {
            for (const l of rewardList) {
                console.log(l)
            }
            setRewardList(null)
        }
    }

    let testItem : Item = {id: "broidk", name: "test", image: "src/placeholder.png", star: 5, owned: true}

    return(
        <div className='wish'>
            <Item i={testItem}/>
            <div className="bannerName">
                Name of banner<br></br>here idk
            </div>
            <div className = "bannerInfo">
                Guaranteed 4 star or higher in every 10 pull! 
                <span className='infoButton' onClick={() => setInfoList(true)}>&#9432;</span>
            </div>
            <div className="wishButton">
                <div onClick={() => changeGems(-150)}>
                    <h1>&middot;</h1>
                    <h2>Wish x1</h2>
                    <h1>150</h1>
                    <h1>&middot;</h1>
                </div>
                <div onClick={() => changeGems(-1500)}>
                    <h1>&middot;</h1>
                    <h2>Wish x10</h2>
                    <h1>1500</h1>
                    <h1>&middot;</h1>
                </div>
            </div>
            {infoList && <InfoList setInfoList={setInfoList}/>}
        </div>
    )
}