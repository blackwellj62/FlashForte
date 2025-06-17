const apiURL = "/api/topic"

export const getTopics = () => {
    return fetch(apiURL).then((res)=>res.json())
}
