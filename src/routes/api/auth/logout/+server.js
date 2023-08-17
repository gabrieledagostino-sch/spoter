import { authenticate, logout } from "../../../../lib/Authentication"
import { json } from '@sveltejs/kit'

/** @type {import("./$types").RequestHandler} */
export async function GET({ request }) {
    const accessToken = request.headers.get('Authorization')?.split(' ')[1]
    console.log('called')
    const {msg, name} = await authenticate({accessToken})
    console.log(msg)
    if(msg !== "success") return json({msg, name}, {status:401})
    await logout({accessToken})
    return json({msg:"success"}, {status:200})
}