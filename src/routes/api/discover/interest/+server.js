import prisma from "$lib/prisma";
import { json } from "@sveltejs/kit"
import jwt from 'jsonwebtoken'
import { COOKIE_SIGNER } from "$env/static/private";
/** @type {import("./$types").RequestHandler} */
export async function POST(event) {
    const { direction, id } = await event.request.json()
    const { id:userId } = event.locals.user

    const session = event.cookies.get('SessionId', {path:'/'})
    const { id:sessionId } = jwt.verify(session, COOKIE_SIGNER, {ignoreExpiration:true})
    
    const newTrack = await prisma.session.findUnique({
        where:{ id:sessionId },
        select:{discoveryId:true}
    }).then(res => {
        let data = {id, userId};
        if(direction === 'right') data = {...data, discoveryId:res.discoveryId}
        return prisma.track.create({ data })
    })
    await prisma.user.update({
        where:{id:userId},
        data:{
            nTracke:{increment:1}
        }
    })

    return json({});
}