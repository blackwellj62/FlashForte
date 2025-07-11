const apiURL = "/api/topic"

export const getTopics = () => {
    return fetch(apiURL).then((res)=>res.json())
}

export const deleteTopic = (topicId) => {
    return fetch(`${apiURL}/${topicId}`,
       {
            method: "DELETE"
        })
}