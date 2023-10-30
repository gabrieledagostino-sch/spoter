/** @type {import("./$types").PageServerLoad} */
export function load({ locals, cookies }) {
    let logged = false
    if(locals.user) logged = true;
    let autoplay= cookies.get('autoplay') === 'true';
    console.log(autoplay)
    return { 
        autoplay, 
        logged, 
        username:locals.user?.username ?? undefined, 
        country:locals.user?.country?? undefined 
    }
}