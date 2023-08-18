import { generateAnonymousToken, search } from '$lib/Spotify';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
    const {access_token, token_type, expires_in, msg,name } = await generateAnonymousToken({ fetch })
    let result = null;
    let firstSong = null;
    console.log(access_token)
    if(access_token)
        result= await search({query:"all star", type:"track", token:access_token, fetch})
    
    return {
        access_token, 
        token_type, 
        expires_in, 
        msg, 
        name, 
        result,
        firstSong:result[0]
    }
}