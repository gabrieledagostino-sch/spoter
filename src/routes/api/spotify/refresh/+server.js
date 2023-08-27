import { json } from "@sveltejs/kit"
import { refreshToken } from "$lib/Spotify"
import prisma from "$lib/prisma"
import jwt from "jsonwebtoken"

/** @type {import("./$types").RequestHandler} */
export async function GET({ cookies, fetch }) {
   
    const sessId = cookies.get('SessionId')
    const { id } = jwt.decode(sessId, { ignoreExpiration:true })
    const { access_token, status, message } = await prisma.session.findUnique({
        where:{id//:id from jwt.decode(sessId)}
        },
        select:{
            refreshToken:true
        }
    })
    .then(session => refreshToken(session.refreshToken, fetch))
    return json({access_token, status, message}, { status:200, statusText:"success" })
}