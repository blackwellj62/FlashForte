import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDeckById } from "../../managers/deckManager.js"
import "./Decks.css"
import { getFlashCards } from "../../managers/cardManager.js"
import { getDeckFlashCards } from "../../managers/deckFlashCardManager.js"

export const DeckDetails = ({loggedInUser}) => {
    const [deck, setDeck] =useState({})
    const [currentDeckFlashCard, setCurrentDeckFlashCard] = useState([])
    const [userCards, setUserCards] = useState([])
    const [cardsInDeck, setCardsInDeck] = useState([])
    const [flippedCards, setFlippedCards] = useState({})
    const {deckId} = useParams()
    const navigate = useNavigate()


    useEffect(()=>{
        getDeckById(deckId).then(data=>{
            const deckObj = data
            setDeck(deckObj)
        })
    },[deckId])

    
    useEffect(() => {
        getDeckFlashCards().then(deckFCArray => {
            const foundDeckFC = deckFCArray.filter(dfc => dfc.deckId === deck.id);
            setCurrentDeckFlashCard(foundDeckFC);

            getFlashCards().then(cardArray => {
            const deckCardIds = foundDeckFC.map(dfc => dfc.flashCardId);
            const matchingCards = cardArray.filter(
                card => deckCardIds.includes(card.id) && card.userId === loggedInUser.id
            );
            setCardsInDeck(matchingCards);
            });
        });
        }, [deck, loggedInUser]);
    
    useEffect(()=>{
        getFlashCards().then(cardArray=>{
      const foundCards = cardArray.filter(card=>
            card.userId === loggedInUser.id
        )
        setUserCards(foundCards)})
       
    },[loggedInUser])

  const handleFlip = (cardId) => {
        setFlippedCards((prevState) => ({
          ...prevState,
          [cardId]: !prevState[cardId],
        }));
      };

    return(
        <div className="details-container">
        <div className="card text-center">
            <div className="card-header">
                <h2>{deck.name}</h2>
            </div>
            <div className="deck-body">
                <div className="flashcard-container">
                {cardsInDeck == "" ? <h1>Looks like you don't have any FlashCards in this Deck. Try Adding some!</h1> : cardsInDeck.map((card) => (
                <div key={card.id} className="flip-card">
                <div className={`flip-card-inner ${flippedCards[card.id] ? "flipped" : ""}`}>
                    <div className="flip-card-front">
                    <div className="card-header">{card.topic.name}</div>
                    <div className="card-body">
                        <h3 className="card-title">{card.question}</h3>
                        <button className="btn-flip" onClick={() => handleFlip(card.id)}>
                        Flip
                        </button>
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
              <button className="btn-log" onClick={()=>{navigate(`/edit-deck/${deck.id}`)}}>Edit Deck</button>
        </div>
        <div className="new-btn">
              <button className="btn-log" onClick={()=>{navigate(`/quiz/${deck.id}`)}}>Quiz Mode</button>
        </div>
        </div>
        </div>
        </div>
    )
}