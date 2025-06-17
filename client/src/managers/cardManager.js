const apiURL = "/api/flashcards"

export const getFlashCards = () => {
    return fetch(apiURL).then((res)=>res.json())
}