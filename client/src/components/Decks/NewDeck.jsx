import { useState } from "react"
import { createDeck } from "../../managers/deckManager.js"
import { useNavigate } from "react-router-dom"

export const NewDeck = ({loggedInUser}) => {
    const [deckName, setDeckName] = useState("")
    const [description, setDescription] = useState("")
    const navigate = useNavigate()

    const handleSaveButton = () => {
        const newDeck = 
        {
            name : deckName,
            description : description,
            userId : loggedInUser.id
        }
        createDeck(newDeck)
        navigate("/decks")
    }

    return(
        <div className="form-container">
        <h1>New Deck</h1>
        <form onSubmit={handleSaveButton}>
      <div className="row mb-3">
        <label className="col-12 col-sm-2 col-form-label">
          Deck Name:
        </label>
        <div className="col-12 col-sm-10">
          <input type="text" className="form-control" onChange={(event)=>{setDeckName(event.target.value)}} required/>
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-12 col-sm-2 col-form-label">
          Description:
        </label>
        <div className="col-12 col-sm-10">
          <input type="text" className="form-control" onChange={(event)=>{setDescription(event.target.value)}} required/>
        </div>
      </div>
      
      <button type="submit" className="btn-flip">
        Save
      </button>
      </form>
    </div>
    )
}