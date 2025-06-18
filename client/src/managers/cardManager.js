const apiURL = "/api/flashcards"

export const getFlashCards = () => {
    return fetch(apiURL).then((res)=>res.json())
}

export const createFlashCard = (newCard) => {
    return fetch(apiURL,
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCard)
        }).then((res)=>res.json())
}

export const deleteFlashCard = (flashcardId) => {
    return fetch(`${apiURL}/${flashcardId}`,
        {
            method: "DELETE"
        })
}