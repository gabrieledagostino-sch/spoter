import { json } from '@sveltejs/kit';
import { register } from '$lib/Authentication.js';

export async function POST({ request }) {
    const { username, email, password } = await request.json()
    
    const { msg, name } = await register({username,email,password});

    if(msg) return json({msg, name}, {status:400})

    return json({msg:"successo"}, {status:201})
}