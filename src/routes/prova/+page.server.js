import { getTrack } from "$lib/Spotify"
import { error } from "@sveltejs/kit"

/** @type {import("./$types").PageServerLoad} */
export async function load({ url, fetch, cookies, locals }) {
    const token = cookies.get('AccessToken', {path:'/'})
    const songID = url.searchParams.get('song')
    const track = await getTrack(token, fetch, songID, locals.user.country).catch(err=>err)
    
    if(track.message) throw error(track.status, {message:track.message})
    
    if(track.access_token) cookies.set('AccessToken', track.access_token)
    const {access_token, ...song} = track
    return {song}
} 