import { json, redirect } from "@sveltejs/kit";
import { getUserInfo, requestAccessToken } from "$lib/Spotify";
import prisma from "$lib/prisma";

/** @type {import("./$types").RequestHandler} */
export async function GET({ url, cookies, fetch }) {

    const state = url.searchParams.get('state')
    const code = url.searchParams.get('code')
    const error = url.searchParams.get('error')
    
    //checks if it not a random navigation
    if(!state) throw redirect(307, '/')
    //error from spotify authorization
    if(error) return json({ // FAIL
        message:"Login Failer",
        name:error
    }, {status:401})

    //crf attack protection
    const storedState = cookies.get('TempID')
    cookies.delete('TempId')

    if(storedState !== state) return json({ // FAIL
        message:"Requests ID is unknown",
        name:"Unknown Request"
    }, {status:401})

    //get tokens
    const authTokResp = await requestAccessToken(code, fetch);
    
    if(authTokResp.status) return json({ // FAIL
        message:authTokResp.message,
        name:authTokResp.statusText,
    }, {
        status:authTokResp.status
    })
    const { access_token, refresh_token } = authTokResp

    //get user info to update/create them in website db
    const userInfoResp = await getUserInfo(access_token, fetch)
    
    if(userInfoResp.status) return json({ // FAIL
        message:userInfoResp.message,
        name:userInfoResp.statusText,
    }, {
        status:userInfoResp.status
    })
    const { id, display_name, images } = userInfoResp

    let user = await prisma.user.findUnique({
        where:{ id }
    })
    
    console.log(user)
    const promises = []

    if(user === null) {
        user = await prisma.user.create({
            data:{
                id,
                username:display_name,
                profilePicUrl:images[0]?.url ?? null
            }
        })
    } else {
        promises.push(prisma.user.update({
            where:{id},
            data:{
                username:display_name,
                profilePicUrl:images[0].url ?? null
            }
        }))
    }

    promises.push(prisma.session.updateMany({
        where:{userId:id},
        data:{isValid:false}
    })
    .then(_ => prisma.session.create({
        data:{
            refreshToken:refresh_token,
            userId:id,
        }
    })))

    await Promise.all(promises)

    cookies.set('AccesToken', access_token, {
        httpOnly:true,
        secure:true,
        path:'/',
    })
    
    throw redirect(307, '/profile')
}