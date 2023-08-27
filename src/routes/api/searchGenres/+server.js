import { json } from '@sveltejs/kit';
import axios from "axios";
import { load } from 'cheerio'
import https from "https";
const apiUrl = 'https://everynoise.com/everynoise1d.cgi?vector=name&scope=all'

/** @type {import("./$types").RequestHandler} */
export async function GET({ url }) {
    const query = url.searchParams.get('query')
    const limit = url.searchParams.get('limit')

    try {
        const n = Number.parseInt(limit)
        const response = await axios.get(apiUrl, { httpsAgent: new https.Agent({ rejectUnauthorized: false }) });
        const $ = load(response.data);
        
        const genres = []
        let toExit = 0
        let p = 0

        $('table tbody tr').each((_, element) => {
            const genreName = $(element).find('td.note a').text()
            if(p >= limit) toExit=2
            if(toExit == 2) return false
            if(genreName.startsWith(query)) {
                genres.push(genreName)
                toExit = 1
                p++
            }else{
                toExit = toExit==1?2:0
            }
        })
        
        return json(genres, {status:200})
    } catch (error) {
        return json({message:`can't reach website`}, {status:200})
    }
}