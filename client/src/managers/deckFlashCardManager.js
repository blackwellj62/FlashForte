const apiURL = "/api/deckflashcard"

export const createDeckFlashCard = (newDeckFlashCard) => {
    return fetch(apiURL,
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newDeckFlashCard)
        }).then((res)=>res.json())
}

export const getDeckFlashCards = () => {
    return fetch(apiURL).then((res)=>res.json())
}

export const deleteDeckFlashCard = (deckFlashCardId) => {
    return fetch(`${apiURL}/${deckFlashCardId}`,
        {
            method: "DELETE"
        })
}