import { useEffect, useState } from "react"
import { getFlashCards } from "../../managers/cardManager.js"
import "./FlashCards.css"


export const FlashCards = () => {
    const [allCards, setAllCards] = useState([])
    const [flippedCards, setFlippedCards] = useState({})

const handleFlip = (cardId) => {
    setFlippedCards((prevState) => ({
      ...prevState,
      [cardId]: !prevState[cardId],
    }));
  };

    useEffect(()=>{
        getFlashCards().then(cardArray=>{
            setAllCards(cardArray)
        })
    },[])
    return (
    <div className="flashcard-container">
      {allCards.map((card) => (
        <div key={card.id} className="flip-card">
          <div className={`flip-card-inner ${flippedCards[card.id] ? "flipped" : ""}`}>
            <div className="flip-card-front">
              <div className="card-header">{card.topic.name}</div>
              <div className="card-body">
                <h5 className="card-title">{card.question}</h5>
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
                <h5 className="card-title">{card.answer}</h5>
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