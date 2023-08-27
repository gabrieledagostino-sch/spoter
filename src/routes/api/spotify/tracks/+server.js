import { json } from "@sveltejs/kit";
import { searchTrack } from "$lib/Spotify";

/** @type {import("./$types").RequestHandler} */
export async function GET({ url, cookies, locals, fetch }) {
    const q = url.searchParams.get('query');
    const token = cookies.get('AccessToken', {path:'/'});
    console.log(locals)
    const {access_token, tracks, message, status } = await searchTrack(
        token,
        fetch,
        q,
        locals.user.country,
    )
    .catch(err => err);
    
    if(message) return json({message}, {status});

    if(access_token) cookies.set('AccessToken', access_token, {
        httpOnly:true,
        secure:true,
        path:'/',
    })
    
    return json(tracks, {status:200})
}