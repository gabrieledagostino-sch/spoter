// import prisma from "$lib/prisma";

import prisma from "../../lib/prisma";

/** @type {import("./$types").PageServerLoad} */
export async function load({ locals }) {
    const user = locals.user;
    const tracks = await prisma.track.findMany({
        where:{
            discoverySession:{
                user:{
                    id:user.id
                }
            }
        },
        distinct:['id']
    })
    console.log(tracks)
    return {
        tracks,
        user:{
            username:user.username,
            profilePicUrl : user.profilePicUrl,
            nPlaylists : user.nPlaylists,
            nTracke : user.nTracke,
            nInterests: tracks.length
        }
    }
}