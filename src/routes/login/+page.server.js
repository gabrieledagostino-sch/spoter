import { fail, redirect } from "@sveltejs/kit";
import { setRefreshCookie, setTokenCookie } from "../../lib/Authentication";

/** @type {import('./$types').PageLoad} */
export async function load({ cookies, fetch }) {
    const accessCookie = cookies.get('AccessToken')
    const refreshCookie = cookies.get('RefreshToken')
    let response = await fetch('/api/auth/logout', {
        method:"get",
        headers:{
            "content-type":"application/json",
            "Authorization":accessCookie
        }
    })
    const jsonResp = await response.json()
    if(response.status === 401 && jsonResp.name==='TokenExpiredError') {
        console.log("refresh needed")
        const refreshResponse = await fetch('/api/auth/refresh', {
            method:"get",
            headers:{
                "content-type":"application/json",
                "Authorization":refreshCookie
            }
        })
        console.log(refreshResponse.status)
        if(refreshResponse.status === 200) {
            const rJsonResp = await refreshResponse.json()
            const r = await fetch('/api/auth/logout', {
                method:"get",
                headers:{
                    "content-type":"application/json",
                    "Authorization":`Bearer ${rJsonResp.accessToken}`
                }
            })
        }
    }
    cookies.delete('AccessToken')
    cookies.delete('RefreshToken')
    return {}
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
        
        console.log(jsonResp.refreshToken)
        setTokenCookie({ cookies, token:jsonResp.token })
        setRefreshCookie({ cookies, token:jsonResp.refreshToken }, remember)
        
        throw redirect(303, '/profile')
    }
}