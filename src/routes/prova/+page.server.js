
/** @type {import("./$types").PageServerLoad} */
export async function load({ url }) {
    return {...url.searchParams}
}