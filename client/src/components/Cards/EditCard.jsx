import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFlashCardById } from "../../managers/cardManager.js";
import { getTopics } from "../../managers/topicManager.js";
import { getDecks } from "../../managers/deckManager.js";
import { getDeckFlashCards } from "../../managers/deckFlashCardManager.js";

export const EditCard = ({loggedInUser}) => {
    const [flashCard, setFlashCard] = useState({})
    const [topics, setTopics] = useState([])
    const [allDecks, setAllDecks] = useState([])
    const [userDecks, setUserDecks] = useState([])
    const [allDeckFlashCards, setAllDeckFlashCards] = useState([])
    const [filteredDeckFlashCards, setFilteredDeckFlashCards] = useState([])
    const [addedDecks, setAddedDecks] = useState([])
    const {cardId} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        getFlashCardById(cardId).then(data=>{
            const cardObj = data
            setFlashCard(cardObj)
        })
    },[cardId])

    useEffect(()=>{
        getTopics().then(topicArray=>{
            setTopics(topicArray)
        })
    },[])

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
    
    useEffect(()=>{
        getDeckFlashCards().then(deckFCArray=>{
            setAllDeckFlashCards(deckFCArray)
        })
    },[])

    useEffect(()=>{
        const foundDeckFC = allDeckFlashCards.filter(deckFC =>
            deckFC.flashCardId == flashCard.id
        )
        setFilteredDeckFlashCards(foundDeckFC)
    },[allDeckFlashCards, flashCard])

    const handleInputChange = (event) => {
        const statCopy = {...flashCard}
        statCopy[event.target.name] = event.target.value
        setFlashCard(statCopy)
    }

    useEffect(() => {
      const initialDeckIds = filteredDeckFlashCards.map(df => df.deckId);
      setAddedDecks(initialDeckIds);
    }, [filteredDeckFlashCards]); 
    
    const handleDeckCheck = (event) => {
      const deckId = parseInt(event.target.value);
      if (event.target.checked) {
        setAddedDecks((prev) => [...prev, deckId]);
      } else {
        setAddedDecks((prev) => prev.filter((id) => id !== deckId));
      }
    };

    
    return(
       <div className="form-container">
        <h1>Edit Flash Card</h1>
      <div className="row mb-3">
        <label className="col-12 col-sm-2 col-form-label">
          Question:
        </label>
        <div className="col-12 col-sm-10">
          <input type="text" className="form-control" name="question" 
          value={flashCard.question ? flashCard.question : ""} onChange={handleInputChange}/>
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-12 col-sm-2 col-form-label">
          Answer:
        </label>
        <div className="col-12 col-sm-10">
          <input type="text" className="form-control" name="answer"
          value={flashCard.answer ? flashCard.answer : ""} onChange={handleInputChange} />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-4 offset-sm-4">
      <select className="form-select" name="topicId" aria-label="Default select example" 
      value={flashCard.topicId ? flashCard.topicId : ""} onChange={handleInputChange}>
        <option value="0">Choose a Topic</option>
        {topics.map(topic=>
        <option value={topic.id}key={topic.id}>{topic.name}</option>
        )}
      </select>
      </div>
      </div>
      {userDecks == "" ? "":
      <div className="row mb-3">
          <h5>Add to Deck?</h5>
        <div className="col-sm-10 offset-sm-1">
            {userDecks.map(deck=>
          <div className="form-check" key={deck.id}>
            <input className="form-check-input"  type="checkbox" 
            checked={addedDecks.includes(deck.id)}
            onChange={handleDeckCheck}
            value={deck.id} />
            <label className="form-check-label" >
              {deck.name}
            </label>
          </div>)}
        </div>
      </div>}
      <button type="submit" className="btn btn-primary" >
        Save
      </button>
    </div>
  );
    
}