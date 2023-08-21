<script>
    import { createEventDispatcher, onMount } from "svelte";

    export let username = 'Prova';
    export let img = "https://picsum.photos/id/684/600/400";
    export let nTracke = 0
    export let nInterests = 0
    export let nExports = 0
    export let nPlaylists = 0
    
    const dispatch = createEventDispatcher();
</script>

<div class="
        h-full
        flex
        flex-col
        justify-evenly
        items-center
        bg-mainColor
        lg:rounded-3xl
        p-4
    "
> 
    <div 
        class="mainInfo
            grid
            grid-flow-col
            md:flex
            md:flex-col
            md:gap-5
            items-center
        "
    >
        <img src="{img}" alt="profile pic"
            class="
                max-h-[25vh]
                object-cover
                rounded-full
                aspect-square
            "
        >
        <div
            class="
                p-7
                flex-1
                flex
                flex-col
                justify-evenly
            "
        >
            <span class="mx-auto">{username}</span>
            <ul class="userInfo text-smallText text-complementaryFG bg-bgColor rounded-2xl p-4">
                <li>
                    <span>Canzoni scoperte</span>
                    <span>{nTracke}</span>
                </li>
                <li>
                    <span>Canzoni interessanti</span>
                    <span>{nInterests}</span>
                </li>
                <li>
                    <span>Canzoni importate su spotify</span>
                    <span>{nExports}</span>
                </li>
                <li>
                    <span>Playlist create</span>
                    <span>{nPlaylists}</span>
                </li>
            </ul>
        </div>
    </div>
        <i class="fa-solid fa-gear my-4" tabindex=0 role="button" on:click={()=>dispatch('settings')} on:keypress={()=>dispatch('settings')} />
</div>
<style>
    li {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 1rem;
    }
    li:first-child {
        text-align: left;
    }
</style>