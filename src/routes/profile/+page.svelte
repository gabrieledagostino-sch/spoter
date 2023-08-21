<script>
    import PlaylistCreation from "../../components/profile/PlaylistCreation.svelte";
    import Profile from "../../components/profile/profile.svelte";

    export let data
    let user = data.user
    let tracks = data.tracks
    console.log(user)
</script>

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
    <Profile username={user.username} img={user.profilePicUrl ?? undefined} nPlaylists={user.nPlaylists} nTracke={user.nTracke} />
    <PlaylistCreation songs={tracks}/>
</div>

