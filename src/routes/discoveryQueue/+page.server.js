import { error } from "@sveltejs/kit"

/** @type {import("./$types").PageServerLoad} */
export async function load({ url, fetch, cookies, locals }) {
    const id = url.searchParams.get('id')
    const query = url.searchParams.get('query')
    const type = url.searchParams.get('type')

    const {recommendations, next } = await fetch('/api/discover/suggestions?' + new URLSearchParams({
        type,id,query 
    }).toString()).then(r => r.json())
    if(recommendations.length == 0) throw error(500, {message:"sorry, no result found for "+type + id??query})
    return {recommendations, next}
}