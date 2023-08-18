import { fail, redirect } from "@sveltejs/kit";
import { setRefreshCookie, setTokenCookie } from "$lib/Authentication";

/** @type {import('./$types').PageLoad} */
export async function load({ cookies }) {
    const accessCookie = cookies.get('AccessToken')
    const refreshCookie = cookies.get('RefreshToken')
    
    return {accessCookie, refreshCookie}
}

/** @type {import("./$types").Actions} */
export const actions = {
    login: async ({ request, fetch, cookies }) => {
        const form = await request.formData()
        const {username, password } = Object.fromEntries(form);
        const remember = form.has('remember')
        
        let error = []
        
        if(!username) error.push({ name:'username', msg:'Username Required' })
        if(!password) error.push({ name:'password', msg:'Password Required' })

        if(error.length > 0) return fail(400, {error, username, remember})
        
        const response = await fetch('/api/auth/login', {
            method:"post",
            body:JSON.stringify({username, password, remember}),
            headers:{
                "Content-Type":"application/json",
            },
        })
        const jsonResp = await response.json()
        if(response.status === 400)  return fail(400, {error:[jsonResp], username, remember})
        
        setTokenCookie({ cookies, token:jsonResp.token })
        setRefreshCookie({ cookies, token:jsonResp.refreshToken }, remember)
        
        throw redirect(303, '/profile')
    },
    deleteCookies: async ({ cookies })=>{
        cookies.delete('AccessToken')
        cookies.delete('RefreshToken')
        throw redirect(303, '/login')
    }
}