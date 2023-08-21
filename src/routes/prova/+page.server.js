/** @type {import("./$types").PageServerLoad} */
export async function load({ cookies, fetch, locals }) {
    const token = cookies.get('AccessToken')
    const track = await fetch('api.spotify.com/v1/search?'
        + new URLSearchParams({
            q:"All star",
            type:['track'],
            include_external:'audio'
        }), {
            headers:{
                "Authorization":`Bearer ${token}`
            }
        }
    ).then(r => r.json())

    return {
        track,
        user:locals.user
    }

}