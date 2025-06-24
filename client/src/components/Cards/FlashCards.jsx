import { useEffect, useState } from "react"
import { deleteFlashCard, getFlashCards } from "../../managers/cardManager.js"
import "./FlashCards.css"
import { useNavigate } from "react-router-dom"


export const FlashCards = ({loggedInUser}) => {
    const [allCards, setAllCards] = useState([])
    const [flippedCards, setFlippedCards] = useState({})
    const [userCards, setUserCards] = useState([])
    const navigate = useNavigate()

    
    useEffect(()=>{
        getFlashCards().then(cardArray=>{
            setAllCards(cardArray)
        })
    },[])

    useEffect(()=>{
       reFetchCards()
    },[allCards, loggedInUser])

    const reFetchCards = () => {
      getFlashCards().then(cardArray=>{
      const foundCards = cardArray.filter(card=>
            card.userId === loggedInUser.id
        )
        setUserCards(foundCards)})
    }

    const handleFlip = (cardId) => {
        setFlippedCards((prevState) => ({
          ...prevState,
          [cardId]: !prevState[cardId],
        }));
      };

    const handleDelete = async(flashCardId) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this flashcard?");
      if (confirmDelete){
      await deleteFlashCard(flashCardId)
      reFetchCards()
      }
    }


    return (
      <div className="details-container">
    <div className="page-container">
    <div className="flashcard-container">
      {userCards == "" ? <h1>Looks like you don't have any FlashCards. Try Making some!</h1> : userCards.map((card) => (
        <div key={card.id} className="flip-card">
          <div className={`flip-card-inner ${flippedCards[card.id] ? "flipped" : ""}`}>
            <div className="flip-card-front">
              <div className="card-header">{card.topic.name}</div>
              <div className="card-body">
                <h3 className="card-title">{card.question}</h3>
                <button className="btn-flip" onClick={() => handleFlip(card.id)}>
                  Flip
                </button>
                <div className="card-buttons">
                    <button className="btn btn-warning" onClick={()=>{navigate(`/edit-card/${card.id}`)}}>Edit</button>
                    <button className="btn btn-danger" onClick={()=>{handleDelete(card.id)}}>Delete</button>
                </div>
              </div>
            </div>
            <div className="flip-card-back">
              <div className="card-header">{card.topic.name}</div>
              <div className="card-body">
                <h3 className="card-title">{card.answer}</h3>
                <button className="btn-flip" onClick={() => handleFlip(card.id)}>
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
      <div className="new-btn">
      <button className="btn-log" onClick={()=>{navigate("/new-card")}}>➕New Card</button>
      </div>
      </div>
      </div>
  );
}