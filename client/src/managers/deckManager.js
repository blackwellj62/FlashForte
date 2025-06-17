const apiURL = "/api/decks"

export const getDecks = () => {
    return fetch(apiURL).then((res)=>res.json())
}
