import { decode } from 'jsonwebtoken'
import prisma from './lib/prisma';

export const handle = async ({event, resolve}) => {
    // console.log(context)
    if(event.url.pathname.startsWith('/api')) {
        console.log(`HOOK : API`)
        return await resolve(event)
    }

    const accessToken = event.cookies.get('AccessToken')?.split(' ')[1]
    const refreshToken = event.cookies.get('RefreshToken')?.split(' ')[1]

    if( !accessToken || !refreshToken ) return await resolve(event)

    const { username } = decode(accessToken)
    const user = await prisma.user.findUnique({
        where:{username},
        select:{
            username:true,
            email: true,
            createdAt: true,
            updateAt : true,
        }
    })

    event.locals.user = user;
    return await resolve(event)
}