import { SP_CLIENT_ID, SP_SECRET_KEY } from "$env/static/private";
import { assert } from "console";
import { URLSearchParams } from "url";

const authorizeURL = 'https://accounts.spotify.com/authorize?'
const accessTokenURL = 'https://accounts.spotify.com/api/token'
const userInfoURL = 'https://api.spotify.com/v1/me'
const searchURL = 'https://api.spotify.com/v1/search'
const refreshURL = "https://accounts.spotify.com/api/token"
const trackURL = 'https://api.spotify.com/v1/tracks/'
const reccomendationsURL = 'https://api.spotify.com/v1/recommendations'
const callBackURL = 'https://localhost:4173/api/spotify/callback'
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
    scope:'user-read-private user-read-email playlist-modify-public playlist-modify-private'
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
    let newAccess;
    return fetch(url, req)
    .then(async resp => resp.json())
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
    ).then(async json => {
        let tracks = [];
        for(let i = 0; i < json.tracks.items.length; ++i) {
            const el = json.tracks.items[i]
            if(!el.preview_url) el.preview_url = await getTrack(json.access_token??token, fetch, el.id, market).then(el => el.preview)
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

export const searchArtist = (
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
            type:['artist'],
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
        let artists = []
        for (let i = 0; i < json.artists.items.length; i++) {
            const el = json.artists.items[i];
            artists.push({
                id:el.id,
                image:el.images[0]?.url??'null',
                name:el.name,
            })
        }
        return {artists, access_token:json.access_token}
    })
}

export const getTrack = (
    token,
    fetch,
    id,
    country
) => {
    return normalRequest(
        trackURL+id+"?"+new URLSearchParams({market:country}).toString(),
        {method:"get", headers:{Authorization:`Bearer ${token}`}},
        fetch
    ).then(el => ({
        id:el.id,
        name:el.name,
        album:el.album.name,
        artists:el.artists.map(v => v.name),
        preview:el.preview_url,
        image:el.album.images[0].url,
        genres:el.genres,
        access_token:el.access_token,
        uri:el.uri
    }))
}

export const getRecommendations = (
    artists_IDS,
    genres_IDS,
    tracks_IDS,
    market,
    token,
    fetch,
    limit=20
    ) => {
        assert(artists_IDS.length + genres_IDS.length + tracks_IDS.length <= 5)
        return normalRequest(
            reccomendationsURL+"?"+new URLSearchParams({
                limit,
                market,
                seed_tracks:tracks_IDS,
                seed_artists:artists_IDS,
                seed_genres:genres_IDS
            }).toString(),
            {
                method:"get",
                headers:{
                    Authorization:`Bearer ${token}`
                }   
            },
            fetch
        ).then(json => {
            let tracks= [];
            for(let i = 0; i < json.tracks.length; ++i) {
                const el = json.tracks[i]
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

export const createPlaylist = (
    user_id,
    name,
    p,
    token,
    fetch
) => {
    return normalRequest(`https://api.spotify.com/v1/users/${user_id}/playlists`,
        {
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body:JSON.stringify({
                name,
                public:p,
                description:`Playlist created from spoter - ${new Date(Date.now()).toLocaleDateString().replaceAll('/', '-')}`
            })
        },
        fetch
    ).then(json => json.id)
}

export const addSongs = (
    token,
    playlist_id,
    uris,
    fetch
)=>{
    return normalRequest(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
    {
        method:"post",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify({
            uris
        })
    },
    fetch)
}