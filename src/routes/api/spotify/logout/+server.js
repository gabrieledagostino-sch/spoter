import jwt from 'jsonwebtoken'
import { COOKIE_SIGNER } from "$env/static/private";
import { json } from '@sveltejs/kit';
import prisma from '$lib/prisma';

/** @type {import("./$types").RequestHandler} */
export async function GET({ cookies }) {
    const sessId = cookies.get('SessionId', {path:'/'})
    const { id, userId } = jwt.verify(sessId, COOKIE_SIGNER, {
        ignoreExpiration:true,
    })
    await prisma.session.updateMany({
        data:{
            isValid:false
        },
        where:{
            user:{
                id:userId
            },
            id
        }
    })
    cookies.delete('SessionId', {path:'/'})
    cookies.delete('AccessToken', {path:'/'})
    return json({}, {status:302, headers:{Location:'/'}})
}