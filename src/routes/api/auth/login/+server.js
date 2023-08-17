import { json } from '@sveltejs/kit'
import { login } from '$lib/Authentication'

/** @type {import("./$types").RequestHandler} */
export async function POST({ request }) {
    const { username, password } = await request.json()

    const { token, refreshToken , msg, name } = await login({ username, password })
    console.log(refreshToken)
    if(msg) return json({ msg, name }, { 
        status:400, 
        headers:{
            'Content-Type':'application/json'
        }
    })
    
    return json({token, refreshToken}, {
        headers: {
            'Content-Type':'application/json'
        }
    })
}