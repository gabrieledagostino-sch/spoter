import { json, redirect } from "@sveltejs/kit";
import { getUserInfo, requestAccessToken } from "$lib/Spotify";
import prisma from "$lib/prisma";
import jwt from "jsonwebtoken";
import { COOKIE_SIGNER } from "$env/static/private";

/** @type {import("./$types").RequestHandler} */
export async function GET({ url, cookies, fetch }) {

    const state = url.searchParams.get('state')
    const code = url.searchParams.get('code')
    const error = url.searchParams.get('error')
    console.log(state, code, error)

    //checks if it not a random navigation
    if(!state) throw redirect(307, '/')
    //error from spotify authorization
    if(error) return json({ // FAIL
        message:"Login Failed"
    }, {status:401})

    //crf attack protection
    const storedState = cookies.get('TempID')
    cookies.delete('TempID', {path:'/'})
    console.log(storedState)
    if(storedState !== state) return json({ // FAIL
        message:"Requests ID is unknown"
    }, {status:401})

    //get tokens
    const authTokResp = await requestAccessToken(code, fetch).catch(err => err)
    console.log(authTokResp)
    
    if(authTokResp.status) return json({ // FAIL
        message:authTokResp.message,
    }, {
        status:authTokResp.status
    })

    const { access_token, refresh_token } = authTokResp

    //get user info to update/create them in website db
    const userInfoResp = await getUserInfo(access_token, fetch).catch(err => err)
    
    if(userInfoResp.status) return json({ // FAIL
        message:userInfoResp.message,
        name:userInfoResp.statusText,
    }, {
        status:userInfoResp.status
    })
    const { id, display_name, images, country } = userInfoResp

    let user = await prisma.user.findUnique({
        where:{ id }
    })
    
    const promises = []

    if(user === null) {
        user = await prisma.user.create({
            data:{
                id,
                username:display_name,
                profilePicUrl:images[0]?.url ?? null,
                country
            }
        })
    } else {
        promises.push(prisma.user.update({
            where:{id},
            data:{
                username:display_name,
                country,
                profilePicUrl:images[0]?.url ?? null
            }
        }))
    }
    
    promises.push(prisma.session.updateMany({
        where:{userId:id},
        data:{isValid:false}
    })
    .then(_ => prisma.session.create({ //should check if the ID is already in use, and replace if the session is not valid
        data:{
            refreshToken:refresh_token,
            userId:id,
            id:state,
        }
    }))
    .then(_ => cookies.set(
        'SessionId', 
        jwt.sign(
            {
                id:state,
                userId:id,
            }, 
            COOKIE_SIGNER, 
            {expiresIn:"7 days"}
        ), {
            httpOnly:true,
            secure:true,
            path:'/',
            maxAge: 7 * 24 * 60 * 60,
        }
    )))

    await Promise.all(promises)

    cookies.set('AccessToken', access_token, {
        httpOnly:true,
        secure:true,
        path:'/',
    })
    
    throw redirect(307, '/profile')
}