import prisma from "$lib/prisma";
import { json } from "@sveltejs/kit";

/** @type {import("./$types").RequestHandler} */
export async function GET({ url, locals}) {
    const track = url.searchParams.get('track')
    const userId = locals.user.id
    
    await prisma.track.update({
        where:{
            id_userId:{
                id:track,
                userId
            }
        },
        data:{
            discoveryId:null
        }
    })
    
    return json({});
}