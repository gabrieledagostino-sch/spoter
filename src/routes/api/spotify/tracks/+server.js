import { json } from "@sveltejs/kit";
import { getTrack, searchTrack } from "$lib/Spotify";

/** @type {import("./$types").RequestHandler} */
export async function GET({ url, cookies, locals, fetch }) {
    const id = url.searchParams.get('id');
    const token = cookies.get('AccessToken', {path:'/'});
    const {country} = locals.user

    let resp = await getTrack(token, fetch, id, country)
    

    return json(resp, {status:resp.status ?? 200})
}