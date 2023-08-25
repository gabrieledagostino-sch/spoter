<script>

    import Dialog from "../shared/Dialog.svelte"
    import TrackSuggestion from "./TrackSuggestion.svelte";

    export let type = "Similar To";
    export let selected = null;
    export let query;
    let suggestionTimeout;
    let first;

    let choices = [];

    const debouncedRequest = async () => { //search after a timer, if recalled restart timer with new query
        clearInterval(suggestionTimeout)
        first=undefined;
        choices = [{
            isSvelte:false,
            element:`Loading ...`,
            effect:null,
        }]
        suggestionTimeout = setTimeout(async ()=>{
            choices = await fetch('/api/spotify/tracks?'+new URLSearchParams({query}).toString())
                .then(r => r.json())
                .then(arr => {
                    first = arr[0];
                    return arr.map(v =>({
                        isSvelte:true,
                        props:{
                            name:v.name,
                            artists:v.artists,
                            album:v.album,
                            img:v.image
                        },
                        element:TrackSuggestion,
                        effect:(_, stopShow)=>{
                            selected=v;
                            stopShow()
                }}))})
        },500)
    }

</script>
<label
    class="
        w-full
        p-2
        box-border
        bg-white
        flex
        flex-row
        items-center
        justify-center
    "
>
  <Dialog {choices} >
    <input 
        type="text" 
        name="prova"
        class="
            w-full
            text-bgColor
            focus:outline-none
            bg-transparent
        " 
        placeholder="search..."
        bind:value={query} 
        on:input={debouncedRequest}
        autocomplete="off"
    >
  </Dialog>
  <button type="submit" disabled={first === undefined} on:click={()=>selected=first}><i class="fas fa-search"></i></button>
</label>
{#if selected}
    <TrackSuggestion name={selected.name} album={selected.album} artists={selected.artists} img={selected.image} />
{/if}