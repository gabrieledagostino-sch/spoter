<script>
  import { onMount } from "svelte";
    import Select2 from "../shared/Select2.svelte";
    import ListSong from "./ListSong.svelte";

    let options = ['Latest', 'Session', 'Artist', 'Genre']
    let label = 'Order by:';
    let choice;
    let chosen = [];
    let audio


    export let songs;
    $: nChose = chosen.reduce((acc, vl) => vl? acc+1: acc,  0);
    
    const playHandle = (url) => {
        audio.pause()
        audio.setAttribute('src', url);
        audio.loop = true;
        audio.load()
        audio.play()
    }
    const stopHandle = () => {
        audio.pause()
    }
    onMount(() => {
        audio = new Audio()
    })
</script>
<!-- it will essentially be the same on mobile and desktop, the thing that will change is
List song which is already responsive -->
<div 
    class="
        w-full
        max-h-full
        flex
        flex-col
        gap-2
        p-5
        overflow-hidden
        lg:border-2
        lg:border-white
        lg:rounded-2xl
    "
>
    <!-- SELECT FOR ORDERING -->
    <div 
        class="selectOrder
            flex
            justify-evenly
            items-center
        "
    >
        <div class="selectNo flex-1">
            <span>selected : </span><span class="text-white">{nChose}</span>
        </div>
        <div class="w-full flex-1">
            <Select2 {options} {choice} {label} />
        </div>
    </div>
    <!-- SONG DISPLAY -->
    <div 
        class="
            flex-1
            overflow-scroll
            md:grid
            md:grid-cols-4
        "
    >
        {#each songs as song }
            {#await song}
                <ListSong
                    text={'loading ...'}
                />
            {:then value}
                <ListSong
                    img={value.image}
                    text={value.artists.join(", ") + " - " + value.name}
                    bind:chosend={chosen[song]}
                    on:change={e => console.log(`song changed : ${song} ${chosen[song]} ${e.detail.value}`)}
                    on:more={_ => console.log(`more : ${value.id}`)}
                    on:play={() => playHandle(value.preview)}
                    on:pause={stopHandle}
                />
            {/await}
        {/each}
    </div>
    <!-- PLAYLISTCREATION BUTTONS -->
    <div 
        class="playlistcontrols
            w-full
            flex
            flex-row
            justify-evenly
        "
    >
        <button>Create Playlist</button>
        <button>Clear</button>
    </div>
</div>
<style>
    

    .overflow-scroll::-webkit-scrollbar-thumb {
        background-color: var(--complementaryFG); 
        border-radius: 9999px; 
    }
    .overflow-scroll::-webkit-scrollbar {
        width: 2px;
    }
    .overflow-scroll::-webkit-scrollbar-corner {
        background-color: var(--bgColor);
    }
</style>