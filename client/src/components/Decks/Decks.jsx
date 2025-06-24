import { useEffect, useState } from "react"
import { deleteDeck, getDecks } from "../../managers/deckManager.js"
import "./Decks.css"
import { useNavigate } from "react-router-dom"

export const Decks = ({loggedInUser}) => {
    const [allDecks, setAllDecks] = useState([])
    const [userDecks, setUserDecks] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        getDecks().then(deckArray=>{
            setAllDecks(deckArray)
        })
    },[])
    
    useEffect(()=>{
           reFetchDecks()
        },[allDecks, loggedInUser])

    const reFetchDecks = () => {
          getDecks().then(deckArray=>{
          const foundDecks = deckArray.filter(deck=>
                deck.userId === loggedInUser.id
            )
            setUserDecks(foundDecks)})
        }

    const handleDelete = async(deckId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this deck?");
      if (confirmDelete){
        await deleteDeck(deckId)
        reFetchDecks()
      }
    }

    return(
        <div className="details-container">
        <div className="page-container">
        <div className="deck-container">
            {userDecks.map(deck=>
            <div className="card" key={deck.id} value={deck.id}>
                <div className="card-body">
                    <h5 className="card-title">{deck.name}</h5>
                    <p className="card-text">{deck.description}</p>
                    <div className="card-buttons">
                    <button className="btn-flip" onClick={()=>{navigate(`/deck-details/${deck.id}`)}}>View</button>
                    <button className="btn btn-danger" onClick={()=>{handleDelete(deck.id)}}>Delete</button>
                </div>
                </div>
            </div>)}
        </div>
             <div className="new-btn">
              <button className="btn-log" onClick={()=>{navigate("/new-deck")}}
              >➕New Deck
              </button>
            </div>
        </div>
        </div>
    )
}