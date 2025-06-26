import { useEffect, useState } from "react";
import { getTopics } from "../../managers/topicManager.js";
import { getDecks } from "../../managers/deckManager.js";
import { createFlashCard } from "../../managers/cardManager.js";
import { createDeckFlashCard } from "../../managers/deckFlashCardManager.js";
import { useNavigate } from "react-router-dom"

export const NewCard = ({loggedInUser}) => {
    const [allTopics, setAllTopics] = useState([])
    const [allDecks, setAllDecks] = useState([])
    const [userDecks, setUserDecks] = useState([])
    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")
    const [chosenTopic, setChosenTopic] = useState("")
    const [addedDecks, setAddedDecks] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        getTopics().then(topicArray=>{
            setAllTopics(topicArray)
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

    const handleDeckCheck = (event) => {
  const deckId = parseInt(event.target.value);
  if (event.target.checked) {
    setAddedDecks((prev) => [...prev, deckId]);
  } else {
    setAddedDecks((prev) => prev.filter((id) => id !== deckId));
  }
};

const handleSaveButton = async ()=> {
  const newFlashCard = 
  {
    question : question,
    answer : answer,
    userId : loggedInUser.id,
    topicId : parseInt(chosenTopic),
  }
  try{
    const createdCard = await createFlashCard(newFlashCard)
    const flashCardId = createdCard.id

    if(!flashCardId){
      throw new Error("Flashcard ID not returned from server")
    }
    const deckPromises = addedDecks.map((deckId)=>{
      const newDeckFlashCard = 
      {
        deckId : deckId,
        flashCardId : flashCardId
      }
      return createDeckFlashCard(newDeckFlashCard)
    })
    await Promise.all(deckPromises)
    alert("Flashcard saved successfully!")
  } catch (error) {
    console.error("error saving flashcard", error)
    alert("Something went wrong please try again.")
  }
  navigate("/flashcards")
}

  return (
    <div className="form-container">
        <h1>New Flash Card</h1>
        <form onSubmit={handleSaveButton}>
      <div className="row mb-3">
        <label className="col-12 col-sm-2 col-form-label">
          Question:
        </label>
        <div className="col-12 col-sm-10">
          <input type="text" className="form-control"onChange={(event)=>{setQuestion(event.target.value)}} required/>
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-12 col-sm-2 col-form-label">
          Answer:
        </label>
        <div className="col-12 col-sm-10">
          <input type="text" className="form-control" onChange={(event)=>{setAnswer(event.target.value)}} required/>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-4 offset-sm-4">
      <select className="form-select"  aria-label="Default select example" onChange={(event)=>{setChosenTopic(event.target.value)}} required>
        <option value="0">Choose a Topic</option>
        {allTopics.map(topic=>
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
            <input className="form-check-input" type="checkbox" 
            value={deck.id} checked={addedDecks.includes(deck.id)}
            onChange={handleDeckCheck}/>
            <label className="form-check-label" >
              {deck.name}
            </label>
          </div>)}
        </div>
      </div>}
      <button type="submit" className="btn-flip">
        Save
      </button>
      </form>
    </div>
  );
};
