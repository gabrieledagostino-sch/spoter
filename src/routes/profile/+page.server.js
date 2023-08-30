import { addSongs, createPlaylist, getTrack } from "$lib/Spotify";
import prisma from "$lib/prisma";

/** @type {import("./$types").PageServerLoad} */
export async function load({ locals, cookies, fetch }) {
    const user = locals.user;
    let token = cookies.get('AccessToken', {path:'/'})
    const tracks = await prisma.track.findMany({
        where:{
            discovery:{
                userId:user.id
            }
        },
        distinct:['id'],
        include:{
            discovery: {
                select:{
                    createdAt:true
                }
            }
        }
    })

    let songs = tracks.map(el => {
            let createdAt = el.discovery.createdAt
            return fetch('/api/spotify/tracks?id='+el.id)
            .then(res => res.json())
            .then(res => {
                const {access_token, ...track} = res
                if(access_token) token = access_token
                return {...track, createdAt}
            })
    })
    
    return {
        songs,
        user:{
            username:user.username,
            profilePicUrl : user.profilePicUrl,
            nPlaylists : user.nPlaylists,
            nTracke : user.nTracke,
            nExports : user.nExports,
            nInterests: songs.length
        }
    }
}

/** @type {import("./$types").Actions} */
export const actions = {
    default: async ({ request, locals, cookies, fetch }) => {
        const data = await request.formData();
        const name = data.get('name')
        const songs = data.get('songs')
        const ids = JSON.parse(songs)
        const p = data.get('public')=='on'
        
        const user = locals.user;
        let token = cookies.get('AccessToken', {path:'/'})

        let chunks = []
        let uri = ids.map(el => getTrack(token, fetch, el, user.country).then(p => p.uri))
        let arr = ids.map(el => prisma.track.update({
            where:{
                id_userId:{
                    id:el,
                    userId:user.id
                }
            },
            data:{
                discoveryId:null
            }
        }));
        arr.push(
            prisma.user.update({
                where: {id:user.id},
                data: {
                    nExports:{increment:ids.length},
                    nPlaylists:{increment:1}
                }
            })
        );

        for (let i = 0; i < uri.length; i += 100) chunks.push(uri.slice(i, i+100))
        
        const playlistId = await createPlaylist(user.id, name, p, token, fetch)
        
        for(const chunk of chunks) {
            await addSongs(token, playlistId, await Promise.all(chunk), fetch)
        }
        
        await Promise.all(arr)
        return {}
    }
}