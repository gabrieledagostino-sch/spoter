import { json } from "@sveltejs/kit"
import { refresh } from "../../../../lib/Authentication"

/** @type {import("./$types").RequestHandler} */
export async function GET({ request }) {
    const reToken = request.headers.get('Authorization')?.split(' ')[1]

    const {msg, name, accessToken, refreshToken} = await refresh({refreshToken:reToken})

    if(msg !== "success") return json({msg, name}, {status:401})
    return json({msg, name, accessToken, refreshToken}, {status:200})
}