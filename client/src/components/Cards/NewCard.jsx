import { useEffect, useState } from "react";
import { getTopics } from "../../managers/topicManager.js";
import { getDecks } from "../../managers/deckManager.js";

export const NewCard = ({loggedInUser}) => {
    const [allTopics, setAllTopics] = useState([])
    const [allDecks, setAllDecks] = useState([])
    const [userDecks, setUserDecks] = useState([])

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

  return (
    <div className="form-container">
        <h1>New Flash Card</h1>
      <div className="row mb-3">
        <label className="col-12 col-sm-2 col-form-label">
          Question:
        </label>
        <div className="col-12 col-sm-10">
          <input type="text" className="form-control"/>
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-12 col-sm-2 col-form-label">
          Answer:
        </label>
        <div className="col-12 col-sm-10">
          <input type="text" className="form-control"/>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-4 offset-sm-4">
      <select className="form-select"  aria-label="Default select example">
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
            <input className="form-check-input" type="checkbox" id={deck.id}/>
            <label className="form-check-label" >
              {deck.name}
            </label>
          </div>)}
        </div>
      </div>}
      <button type="submit" className="btn btn-primary">
        Save
      </button>
    </div>
  );
};
