import { SP_CLIENT_ID, SP_SECRET_KEY } from "$env/static/private";
import { URLSearchParams } from "url";

const authorizeURL = 'https://accounts.spotify.com/authorize?'
const accessTokenURL = 'https://accounts.spotify.com/api/token'
const userInfoURL = 'https://api.spotify.com/v1/me'
const searchURL = 'https://api.spotify.com/v1/search'
const refreshURL = "https://accounts.spotify.com/api/token"
const callBackURL = 'https://localhost:5173/api/spotify/callback'


/* 
    Authentication requests
*/

export const RequestAuth = (
    state
) => authorizeURL + new URLSearchParams({
    client_id:SP_CLIENT_ID,
    response_type:'code',
    redirect_uri:callBackURL,
    state,
    scope:'user-read-private user-read-email'
}).toString()

export const requestAccessToken = async (
    token, 
    fetch
) => fetch(
    accessTokenURL, {
        method:"post",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded",
            "Authorization":`Basic ${Buffer.from(`${SP_CLIENT_ID}:${SP_SECRET_KEY}`).toString('base64')}`
        },
        body:new URLSearchParams({
            grant_type:"authorization_code",
            code:token,
            redirect_uri:callBackURL
        }).toString(),
})
.then(resp => resp.json())
.then(json => {
    if(json.error) throw {status:json.error.status, message:json.error.message}
    return json
})

export const getUserInfo = async (
    token,
    fetch
) => fetch(
    userInfoURL,{
        method:"get",
        headers:{
            "Authorization":`Bearer ${token}`
        }
})
.then(resp => resp.json())
.then(json => {
    if(json.error) throw {status:json.error.status, message:json.error.message}
    return json
})

export const refreshToken = async (
    token,
    fetch
) => fetch(
    refreshURL, {
    method:"post",
    body:new URLSearchParams({
        grant_type:"refresh_token",
        refresh_token:token
    }),
    headers:{
        "Content-Type":"application/x-www-form-urlencoded",
        "Authorization":`Basic ${Buffer.from(`${SP_CLIENT_ID}:${SP_SECRET_KEY}`).toString('base64')}`
    }
})
.then(resp => resp.json())
.then(json => {
    if(json.error) throw {status:json.error.status, message:json.error.message}
    return json
})


/*
    Post auth request
*/

const normalRequest = async (
    url,
    req,
    fetch
) => {
    let refreshed = false;
    let newAccess;
    return fetch(url, req)
    .then(resp => resp.json())
    .then(json => {
        if(json.error) throw {status:json.error.status, message:json.error.message}
        return json
    })
    .catch(err => {
        if(err.status === 401) {
            return fetch('/api/spotify/refresh')
            .then(resp => resp.json())
            .then(json => {
                newAccess = json.access_token;
                req.headers.Authorization = `Bearer ${newAccess}`
                return fetch(url, req)
            })
            .then(resp => resp.json())
            .then(json => {
                if(json.error) throw {status:json.error.status, message:json.error.message}
                return {access_token:newAccess,...json}
            })
        }
        throw err;
    })
}

export const searchTrack = (
    token,
    fetch,
    toSearch,
    market,
    limit=-1,
    offset=-1
) => {
    return normalRequest(
        searchURL+"?"+new URLSearchParams({
            q:toSearch,
            type:['track'],
            market,
            limit:limit===-1?20:limit,
            offset:offset===-1?0:offset,
            include_external:"audio"
        }).toString(),
        {
            method:"get",
            headers:{
                Authorization:`Bearer ${token}`
            }
        },
        fetch
    ).then(json => {
        let tracks = [];
        for(let i = 0; i < json.tracks.items.length; ++i) {
            const el = json.tracks.items[i]
            if(el.preview_url)
                tracks.push({
                    id:el.id,
                    name:el.name,
                    album:el.album.name,
                    artists:el.artists.map(v => v.name),
                    preview:el.preview_url,
                    image:el.album.images[0].url
                })
        }
        return {tracks, access_token:json.access_token}
    })
}