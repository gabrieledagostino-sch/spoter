// import prisma from "$lib/prisma";

import { getTrack } from "$lib/Spotify";
import prisma from "$lib/prisma";

/** @type {import("./$types").PageServerLoad} */
export async function load({ locals, cookies, fetch }) {
    const user = locals.user;
    let token = cookies.get('AccessToken', {path:'/'})
    const tracks = await prisma.track.findMany({
        where:{
            discovery:{
                userId:user.id
            }
        },
        distinct:['id']
    })

    let songs = tracks.map(el => getTrack(token, fetch, el.id, user.country).then(el => {
        const {access_token, ...track} = el
        if(access_token) token = access_token
        return track
    }))
    
    return {
        songs,
        user:{
            username:user.username,
            profilePicUrl : user.profilePicUrl,
            nPlaylists : user.nPlaylists,
            nTracke : user.nTracke,
            nInterests: songs.length
        }
    }
}