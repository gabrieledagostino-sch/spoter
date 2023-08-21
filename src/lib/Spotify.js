import { SP_CLIENT_ID, SP_SECRET_KEY } from "$env/static/private";
import { URLSearchParams } from "url";

const authorizeURL = 'https://accounts.spotify.com/authorize?'
const accessTokenURL = 'https://accounts.spotify.com/api/token'
const userInfoURL = 'https://api.spotify.com/v1/me'
const refreshURL = "https://accounts.spotify.com/api/token"
const callBackURL = 'https://localhost:5173/api/spotify/callback'

export const RequestAuth = (
    state
) => authorizeURL + new URLSearchParams({
    client_id:SP_CLIENT_ID,
    response_type:'code',
    redirect_uri:callBackURL,
    state,
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
.then(async resp => {
    if(resp.status !== 200) return { statusText:resp.statusText, status:resp.status, message:(await resp.json()).error.message}
    return resp.json()
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
.then(async resp => {
    if(resp.status !== 200) return { status:resp.status, statusText:resp.statusText, message:(await resp.json()).error.message }
    return resp.json()
})

export const refreshToken = async (
    token
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
.then(async resp => {
    if(resp.status !== 200) return { status:resp.status, statusText:resp.statusText, message:(await resp.json()).error.message }
    return resp.json()
})