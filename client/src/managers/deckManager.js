const apiURL = "/api/decks"

export const getDecks = () => {
    return fetch(apiURL).then((res)=>res.json())
}


export const createDeck = (newDeck) => {
    return fetch(apiURL,
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newDeck)
        }).then((res)=>res.json())
}

export const deleteDeck = (deckId) => {
    return fetch(`${apiURL}/${deckId}`,
        {
            method: "DELETE"
        })
}

export const getDeckById = (deckId) => {
    return fetch(`${apiURL}/${deckId}`).then((res)=>res.json())
}