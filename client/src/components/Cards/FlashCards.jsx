import { useEffect, useState } from "react"
import { getFlashCards } from "../../managers/cardManager.js"
import "./FlashCards.css"


export const FlashCards = ({loggedInUser}) => {
    const [allCards, setAllCards] = useState([])
    const [flippedCards, setFlippedCards] = useState({})
    const [userCards, setUserCards] = useState([])

    
    useEffect(()=>{
        getFlashCards().then(cardArray=>{
            setAllCards(cardArray)
        })
    },[])

    useEffect(()=>{
        const foundCards = allCards.filter(card=>
            card.userId === loggedInUser.id
        )
        setUserCards(foundCards)
    },[allCards, loggedInUser])

    const handleFlip = (cardId) => {
        setFlippedCards((prevState) => ({
          ...prevState,
          [cardId]: !prevState[cardId],
        }));
      };


    return (
    <div className="flashcard-container">
      {userCards == "" ? <h1>Looks like you don't have any FlashCards. Try Making some!</h1> : userCards.map((card) => (
        <div key={card.id} className="flip-card">
          <div className={`flip-card-inner ${flippedCards[card.id] ? "flipped" : ""}`}>
            <div className="flip-card-front">
              <div className="card-header">{card.topic.name}</div>
              <div className="card-body">
                <h3 className="card-title">{card.question}</h3>
                <button className="btn btn-primary" onClick={() => handleFlip(card.id)}>
                  Flip
                </button>
                <div className="card-buttons">
                    <button className="btn btn-warning">Edit</button>
                    <button className="btn btn-danger">Delete</button>
                </div>
              </div>
            </div>
            <div className="flip-card-back">
              <div className="card-header">{card.topic.name}</div>
              <div className="card-body">
                <h3 className="card-title">{card.answer}</h3>
                <button className="btn btn-primary" onClick={() => handleFlip(card.id)}>
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}