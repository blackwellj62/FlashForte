import { useEffect, useState } from "react"
import { getDecks } from "../../managers/deckManager.js"
import "./Decks.css"

export const Decks = ({loggedInUser}) => {
    const [allDecks, setAllDecks] = useState([])
    const [userDecks, setUserDecks] = useState([])

    useEffect(()=>{
        getDecks().then(deckArray=>{
            setAllDecks(deckArray)
        })
    },[])

    useEffect(()=>{
            const foundDecks = allDecks.filter(deck=>
                deck.userId === loggedInUser.id
            )
            setUserDecks(foundDecks)
        },[allDecks, loggedInUser])

    return(
        <div className="page-container">
        <div className="deck-container">
            {userDecks.map(deck=>
            <div className="card" key={deck.id} value={deck.id}>
                <div className="card-body">
                    <h5 className="card-title">{deck.name}</h5>
                    <p className="card-text">{deck.description}</p>
                    <div className="card-buttons">
                    <button className="btn btn-primary" >View</button>
                    <button className="btn btn-danger" >Delete</button>
                </div>
                </div>
            </div>)}
        </div>
        </div>
    )
}