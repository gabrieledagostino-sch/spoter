<script>
  import { fade } from "svelte/transition";
    import Selector from "../../components/shared/Selector.svelte";
  import Button from "../../components/shared/Button.svelte";
  import Search from "../../components/discoverSong/Search.svelte";
  import { onMount } from "svelte";

    let choices = [
        'Similar To',
        'Artist',
        'Genre',
        'Random',
    ]

    let value = 1;
    let song;
    let query;
    let resetSearch;

    onMount(() => value=0)
    $: selected = song?.id??song
</script>
<div class="
        box-border
        
        w-full
        min-h-full

        rounded-3xl

        md:mx-[12.5%]
        md:my-[12.5%]
        lg:bg-mainColor
        flex
        flex-col
        justify-evenly
        items-center
    "
>
    <div 
        class="
            flex-1
            flex
            justify-center
            items-center
            w-3/4
        "
    >
        <Selector {choices} bind:currchoice={value} on:change={()=>{query="";resetSearch()}} />
    </div>
    <div class="w-1/2">
        {#if value!=3}
            <span class="" in:fade={{duration:200, delay:15}} out:fade={{duration:200}}>
                <Search bind:reset={resetSearch} bind:type={choices[value]} bind:selected={song} bind:query />
            </span>
        {:else}
            <div in:fade={{delay:215}} ></div>
        {/if}
    </div>
    <form
        class="
            flex-1
            flex
            flex-col
            justify-evenly
            items-center
        "
        action="/discoveryQueue"
        method="get"
    >
        <input type="hidden" name="id" bind:value={selected} />
        <input type="hidden" name="query" bind:value={query} />
        <input type="hidden" name="type" bind:value={choices[value]} />
        <Button kind="primary" submit={true} >Discover</Button>
    </form>
</div>