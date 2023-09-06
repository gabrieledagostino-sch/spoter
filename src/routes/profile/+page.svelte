<script>
    import { onMount } from "svelte";
    import PlaylistCreation from "../../components/profile/PlaylistCreation.svelte";
    import Profile from "../../components/profile/profile.svelte";

    export let data
    export let form
    let user = data.user
    let songs = data.songs

    
    console.log(form)
    onMount(() => {
        if(document) document.addEventListener('load', ()=>{
            if(Notification?.permission === 'granted' && form?.url) {
                const title = `Playlist ${form?.name} created`
                const body = `Tap this notification to open on spotify`
                const icon = `/logo/logo.png`
                const data = {url:form?.url}
                const notification = new Notification(title, {body, icon, data})
            }
        })
    })
</script>
<svelte:head>
    <title>Spoter - Profile</title>
</svelte:head>
<div 
    class="
        w-full
        min-h-full
        max-h-full
        bg-bgColor
        overflow-hidden
        grid
        grid-flow-row
        grid-rows-[25% 75%]
        md:flex
        md:flex-row
        lg:gap-10
        lg:p-10

    "
>
    <Profile nInterests={user.nInterests} username={user.username} img={user.profilePicUrl ?? undefined} nPlaylists={user.nPlaylists} nTracke={user.nTracke} nExports={user.nExports} />
    <PlaylistCreation {songs}/>
</div>

