<script>
  import { onMount } from "svelte";
    import Select2 from "../shared/Select2.svelte";
    import ListSong from "./ListSong.svelte";
  import Popup from "../shared/Popup.svelte";
  import Button from "../shared/Button.svelte";

    let options = ['Session', 'Artist', 'Name']
    let sortings = [
        (a,b) => { let va = Date.parse(a.createdAt), vb=Date.parse(b.createdAt); return va - vb },
        (a,b) => { let va = a.artists.join(', '), vb = b.artists.join(', '); return va.localeCompare(vb)},
        (a,b) => { return a.name.localeCompare(b.name)}
    ]
    let label = 'Order by:'
    let choice
    let listSongs = []
    let audio
    let playing
    let deselect = {}
    let selected = new Set()
    $: nChose = selected.size
    let playlistPopup = false;

    export let songs;
    
    const playHandle = (url) => {
        if(playing) listSongs[playing].stop()
        audio.pause()
        audio.setAttribute('src', url);
        audio.loop = true;
        audio.load()
        audio.play()
        playing = url
    }
    const stopHandle = () => {
        playing = null
        audio.pause()
    }
    const selectHandle = async (e) => {
        songs = await Promise.all(songs)
        .then(arr => {
            let newArr = arr
            switch (e.detail) {
                case 'Session':
                    newArr = arr.sort(sortings[0])
                    break;
                case 'Artist':
                    newArr = arr.sort(sortings[1])
                    break;
                case 'Name':
                    newArr = arr.sort(sortings[2])
                    break
            }
            return newArr.map(v => Promise.resolve(v))
        })
    }
    const changeHandle = (e, o) => {
        if(e.detail.value) {
            selected.add(JSON.stringify(o))
        }else{
            selected.delete(JSON.stringify(o))
        }
        selected = selected
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
            <Select2 {options} {choice} {label} on:change={selectHandle} />
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
                    bind:this={listSongs[value.preview]}
                    on:more={_ => console.log(`more : ${value.id}`)}
                    on:play={() => playHandle(value.preview)}
                    on:pause={stopHandle}
                    on:change={(e) => changeHandle(e, {id:value.id, name:value.name})}
                    bind:deselect={deselect[value.id]}
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
        <button 
            disabled={nChose === 0} 
            on:click={() => playlistPopup=true}
        >Create Playlist</button>
        <Popup lbl="Create Playlist" 
            bind:show={playlistPopup} 
            on:close={() => playlistPopup=false}
        >
            <form class="flex flex-col items-center gap-2 min-w-full max-h-full" method="post" action="?playlist">
                <p>Create Playlist</p>
                <input required type="text" name="name" placeholder="Playlist Name">
                <div class="overflow-scroll flex-1 bg-bgColor text-complementaryFG p-3 rounded-md flex flex-col min-w-full max-h-[50%]">
                    {#each selected as s}
                        <p>{JSON.parse(s).name}</p>
                    {/each}
                </div>
                <label>public : <input type="checkbox" name="public"></label>
                <div>
                    <Button kind="secondary" submit="true" ><span>Create</span></Button>
                </div>
                <input type="hidden" name="songs" value="{JSON.stringify([...selected.entries()].map(m => JSON.parse(m[0]).id))}">
            </form>
        </Popup>
        <button on:click={() => {selected.forEach(v => deselect[JSON.parse(v).id]()); selected = new Set()}}>Clear</button>
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