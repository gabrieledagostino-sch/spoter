/** @type {import("./$types").PageServerLoad} */
export function load({ locals }) {
    let logged = false
    if(locals.user) logged = true
    return { logged, username:locals.user?.username ?? undefined, country:locals.user?.country?? undefined }
}