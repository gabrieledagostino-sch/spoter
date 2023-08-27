import { json } from '@sveltejs/kit'
import prisma from '$lib/prisma'
import { getRecommendations } from '$lib/Spotify'
import jwt from 'jsonwebtoken'
import {COOKIE_SIGNER} from "$env/static/private";

/** @type {import("./$types").RequestHandler} */
export async function GET({ url, cookies, locals, fetch }) {
    console.log("sadsads")
    const type = url.searchParams.get('type')
    const query = url.searchParams.get('query')
    const more = url.searchParams.get('more')
    const other = url.searchParams.get('other')?.split(',') ?? []
    let id = url.searchParams.get('id')
    
    let access_token = cookies.get('AccessToken', {path:'/'})
    let session = cookies.get('SessionId', {path:'/'})
    const { id:SessionID } = jwt.verify(session, COOKIE_SIGNER, {ignoreExpiration:true})
    
    const { id:userId, country } = locals.user
    if(!id && type !== 'Random'){ 
        [{id}] = await fetch('/api/search?'+new URLSearchParams({
                type,
                query,
                limit:1,
        })
        ).then(r=> r.json())
        
    }
    console.log("here")
    console.log(id, "iddd")
    
    let recommendations = [];
    const cachedTracks = await prisma.track.findMany({
        where:{userId},
        select:{id:true}
    }).then(arr => arr.map(v => v.id))
    
    if(!more){
        const discoveryQueue = await prisma.discovery.create({
            data:{
                userId
            }
        })
        await prisma.session.update({
            where:{id:SessionID},
            data:{discoveryId:discoveryQueue.id}
        })
    }

    let artists_IDS = [];
    let genres_IDS = [];
    let tracks_IDS = [...other];

    while(recommendations.length < 20) {
        if(type === 'Similar To') tracks_IDS.push(id)
        if(type === 'Artist') artists_IDS.push(id)
        if(type === 'Genre') genres_IDS.push(id)

        let ret = await getRecommendations(artists_IDS, genres_IDS, tracks_IDS, country, access_token, fetch, 20)
        
        if(ret.access_token) {
            access_token = ret.access_token

            cookies.set('AccessToken', access_token, {
                httpOnly:true,
                secure:true,
                path:'/',
            })
        }
        
        artists_IDS = genres_IDS = []
        tracks_IDS =  ret.tracks.slice(0, 4).map(v => v.id)
        console.log(tracks_IDS)
        recommendations= [...recommendations, ...ret.tracks.filter(v => !cachedTracks.includes(v.id))].slice(0, 20)
        if(ret.tracks.length < 20) break;
    }
    let next = '/api/discover/suggestions?'+new URLSearchParams({type, id, other:tracks_IDS, more:true})
    return json({ recommendations, next }, {status:200})
}