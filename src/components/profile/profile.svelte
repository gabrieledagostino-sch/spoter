<script>
    import { createEventDispatcher, onMount } from "svelte";

    export let username = 'Prova';
    export let img = "https://picsum.photos/id/684/600/400";
    
    const dispatch = createEventDispatcher();
    // const mdUpdate = () => md = window?.matchMedia("(min-width: 768px)").matches;
    // let md = true;
</script>

<!-- <svelte:window on:resize={_ => mdUpdate()} /> -->

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
                    <span>n</span>
                </li>
                <li>
                    <span>Canzoni interessanti</span>
                    <span>n</span>
                </li>
                <li>
                    <span>Canzoni importate su spotify</span>
                    <span>n</span>
                </li>
                <li>
                    <span>Playlist create</span>
                    <span>n</span>
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