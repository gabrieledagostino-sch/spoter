<script>
  import { fade } from "svelte/transition";
    import Selector from "../../components/shared/Selector.svelte";
  import Button from "../../components/shared/Button.svelte";

    let choices = [
        'Similar To',
        'Artist',
        'Genre',
        'Random',
    ]

    let value = 0;

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
        <Selector {choices} bind:currchoice={value}/>
    </div>
    <form
        class="
            flex-1
            flex
            flex-col
            justify-evenly
            items-center
        "
    >
        {#if value!=3}
            <span class="" in:fade={{duration:200, delay:15}} out:fade={{duration:200}}>
                <input type="text" class=""> <i class="fas fa-search" />
            </span>
        {:else}
            <div in:fade={{delay:215}} ></div>
        {/if}
        <Button kind="primary" >Discover</Button>
    </form>
</div>