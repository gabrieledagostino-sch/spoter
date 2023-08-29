import { json } from "@sveltejs/kit";
import { getTrack, searchArtist, searchTrack } from "$lib/Spotify";

/** @type {import("./$types").RequestHandler} */
export async function GET({ url, fetch, cookies, locals }) {
    const type = url.searchParams.get('type')
    const query = url.searchParams.get('query')
    const limit = url.searchParams.get('limit')
    const accessToken = cookies.get('AccessToken', {path:'/'})
    const { country } = locals.user
    let findings = [];
    let err;
    let access_token = null;
    switch(type) {
        case 'Genre' :
            findings = await fetch('/api/searchGenres?'+new URLSearchParams({query, limit})).then(r => r.json())
            break;
        case 'Artist' :
            const r1 = await searchArtist(accessToken, fetch, query, country, limit, 0).catch(err => err)
            if(r1.access_token) access_token = r1.access_token
            if(r1.message) err = r1;
            findings = r1.artists
            break;
        case 'Similar To' :
            const r2 = await searchTrack(accessToken, fetch, query, country, limit, 0).catch(err => err)
            if(r2.access_token) access_token = r2.access_token
            if(r2.message) err = r2;
            findings = r2.tracks
            break;
        default:
            err = {message:'invalid type', status:400}
            break;
    }
    if(access_token)
        cookies.set('AccessToken', access_token, {
            httpOnly:true,
            secure:true,
            path:'/',
        });
    
    if(err) return json({message:err.message}, {status:err.status})
    return json([...findings], {status:200})
}