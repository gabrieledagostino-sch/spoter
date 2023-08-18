import { fail, redirect } from "@sveltejs/kit"
import { emailValidation, passwordValidation, usernameValidation } from "../../lib/Validation"

/** @type {import("./$types").PageLoad} */
export async function load({ cookies }) {
    const accessCookie = cookies.get('AccessToken')
    const refreshCookie = cookies.get('RefreshToken')
    
    return {accessCookie, refreshCookie}
}

/** @type {import("./$types").Actions} */
export const actions = {
    register: async ({ request, fetch }) => {
        const { email, username, password, confirm } = Object.fromEntries(await request.formData())

        const error=[];
        if(!email) error.push({msg:"Email required", name:"email"})
        if(!username) error.push({msg:"Username required", name:"username"})
        if(!password) error.push({msg:"Password required", name:"password"})
        if(!confirm) error.push({msg:"Confirm Password required", name:"confirm"})
        
        if(error.length > 0) return fail(400, {error, email, username})

        const { msg:eMsg } = emailValidation(email)
        if(eMsg) error.push({msg:eMsg, name:"email"})
        const { msg:uMsg } = usernameValidation(username)
        if(uMsg) error.push({msg:uMsg, name:"username"})
        const { msg:pMsg } = passwordValidation(password)
        if(pMsg) error.push({msg:pMsg, name:"password"})
        if(password !== confirm) error.push({msg:"confirm and password must be equal", name:"confirm"})

        if(error.length > 0) return fail(400, {error, email, username})
        
        const response = await fetch('/api/auth/register', {
            method:"post",
            body:JSON.stringify({username, email, password}),
            headers:{
                "content-type":"application/json",
            }
        })
        
        const jsonResp = await response.json()
        if(response.status === 400)  return fail(400, {error:[jsonResp], username, email})
        
        throw redirect(303, '/login')
    },
    deleteCookies: async ({ cookies })=>{
        cookies.delete('AccessToken')
        cookies.delete('RefreshToken')
        throw redirect(303, '/register')
    }
}