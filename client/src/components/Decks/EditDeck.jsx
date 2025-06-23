import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDeckById, updateDeck } from "../../managers/deckManager.js"
import { deleteDeckFlashCard, getDeckFlashCards } from "../../managers/deckFlashCardManager.js"
import { getFlashCards } from "../../managers/cardManager.js"

export const EditDeck = ({loggedInUser}) => {
    const [deck, setDeck] = useState({})
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
            reFetchDFC()
            }, [deck, loggedInUser]);

            const reFetchDFC = () => {
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
            }
        
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

          const handleInputChange = (event) => {
        const statCopy = {...deck}
        statCopy[event.target.name] = event.target.value
        setDeck(statCopy)
    }

    const handleSaveButton = (deck) => {
        const clone = structuredClone(deck)
        updateDeck(clone)
        navigate(`/deck-details/${deck.id}`)
        
    }

    const handleRemoveButton = async(card) => {
         const confirmDelete = window.confirm("Are you sure you want to remove this flashcard from the deck?");
      if (confirmDelete){
        const deckFlashCardToDelete = currentDeckFlashCard.find(dfc=> dfc.flashCardId === card.id)
        await deleteDeckFlashCard(deckFlashCardToDelete.id)
        reFetchDFC()
      }
    }

    return(
        <div className="form-container">
        <h1>Edit Deck</h1>
      <div className="row mb-3">
        <label className="col-12 col-sm-2 col-form-label">
          Deck Name:
        </label>
        <div className="col-12 col-sm-10">
          <input type="text" name="name"className="form-control" 
          value={deck.name? deck.name : ""} onChange={handleInputChange} />
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-12 col-sm-2 col-form-label">
          Description:
        </label>
        <div className="col-12 col-sm-10">
          <input type="text" name="description"className="form-control" 
          value={deck.description ? deck.description : ""} onChange={handleInputChange}/>
        </div>
      </div>
       <div className="deck-body">
                <div className="flashcard-container">
                {cardsInDeck.map((card) => (
                <div key={card.id} className="flip-card">
                <div className={`flip-card-inner ${flippedCards[card.id] ? "flipped" : ""}`}>
                    <div className="flip-card-front">
                    <div className="card-header">{card.topic.name}</div>
                    <div className="card-body">
                        <h3 className="card-title">{card.question}</h3>
                        <button className="btn btn-primary" onClick={() => handleFlip(card.id)}>
                        Flip
                        </button>
                        <button onClick={()=>{handleRemoveButton(card)}}>Remove from Deck</button>
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
            <div className="new-btn">
                <button type="submit" className="btn-log" onClick={()=>{handleSaveButton(deck)}}> Save</button>
            </div>
    </div>
    </div>
    )
}