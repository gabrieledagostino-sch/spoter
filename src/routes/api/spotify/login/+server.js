import { redirect } from "@sveltejs/kit";
import cryptoRandomString from 'crypto-random-string';
import { RequestAuth } from "$lib/Spotify";
// TODO tell browsers not to preload this page
/** @type {import("./$types").RequestHandler} */
export async function GET({ cookies }) {
    const randomString = cryptoRandomString({length:16, type:'url-safe'})
    
    cookies.set('TempID', randomString, {
        httpOnly:true,
        secure:true,
        path:'/',
    })

    throw redirect(307, RequestAuth(randomString))
}