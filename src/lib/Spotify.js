import { SP_CLIENT_ID, SP_SECRET_KEY } from "$env/static/private";

export const generateAnonymousToken = async ({ fetch }) => fetch ('https://accounts.spotify.com/api/token', {
    method:"post",
    body:`grant_type=client_credentials&client_id=${SP_CLIENT_ID}&client_secret=${SP_SECRET_KEY}`,
    headers:{
        "Content-Type":"application/x-www-form-urlencoded"
    }
})
.then(async (result) => {
    if(result.status !== 200) throw new Error(await result.text(), {cause:result.statusText})
    return result.json()
}).catch((err) => {
    return {msg:err.message, name:err.name}
})

export const search = async ({query, type, token, fetch}) => {
    console.log(token)
    return fetch(`https://api.spotify.com/v1/search?q=${query}&type=${type}&market=IT&include_external=audio`, {
        method:"get",
        headers:{
            "Authorization":`Bearer ${token}`,
    }})
    .then(async (result) => {
        if(result.status !== 200) throw new Error(await result.text(), {cause:result.statusText})
        return result.json()})
    .then(result => result.tracks.items.sort((a,b) => b.popularity - a.popularity))
    .catch((err) => {return {msg:err.message, name:err.cause}})
}
