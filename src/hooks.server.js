import prisma from './lib/prisma';
import { COOKIE_SIGNER } from "$env/static/private";
import jwt from 'jsonwebtoken'

export const handle = async ({event, resolve}) => {
    // console.log(context)
    if(event.url.pathname.startsWith('/api')) {
        //had issues in opera of page prefetching that went bad with spotify o-auth2 architecture
        const purpose = event.request.headers.get('purpose')
        const spurpose = event.request.headers.get('sec-purpose') 
        const xmoz = event.request.headers.get('X-moz') 
        for (const entry of event.request.headers) console.log(entry)
        if(
            purpose?.includes('prefetch') 
            || purpose?.includes('prerender')
            || spurpose?.includes('prefetch')
            || spurpose?.includes('prerender') 
            || xmoz?.includes('prefetch')
        ) {
            return new Response('Can\'t prefetch API endpoints', {status:302, headers:{Location:event.request.url}})
        }
        return await resolve(event)
    }

    const sessId = event.cookies.get('SessionId')
    let userId;
    try {
        ({userId} = jwt.verify(sessId, COOKIE_SIGNER, {
            ignoreExpiration:false
        }))
    } catch (err) {}
    console.log(`userid : ${userId} url : ${event.url.pathname}`)
    if(!userId && event.url.pathname !== '/') return new Response('not Logged in', {status:302, headers:{Location:'/'}}) 
    if(userId && event.url.pathname === '/') return new Response('logged in', {status:302, headers:{Location:'/profile'}})
    if(userId){
        event.locals.user = await prisma.user.findUnique({
            where:{id:userId},
            select:{
                id:true,
                username:true,
                profilePicUrl:true,
                nPlaylists:true,
                nTracke:true,
                nExports:true
            }
        })        
    }
    return await resolve(event)
}