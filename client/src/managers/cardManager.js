const apiURL = "/api/flashcards"

export const getFlashCards = () => {
    return fetch(apiURL).then((res)=>res.json())
}

export const newFlashCard = (newCard) => {
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