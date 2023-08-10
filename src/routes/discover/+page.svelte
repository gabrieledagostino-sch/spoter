<script>
  import { fade } from "svelte/transition";
    import Selector from "../../components/shared/Selector.svelte";

    let choices = [
        'Similar To',
        'Artist',
        'Genre',
        'Random',
    ]

    let value = 0;

</script>
<div class="card
        flex
        flex-col
        justify-evenly
        items-center
        w-full
        h-full
        lg:w-3/4
        lg:h-1/2
        mx-auto
        my-auto
        lg:bg-mainColor
    "
>
    <div 
        class="selector
            w-3/4
            mx-auto
            flex-1
            flex
            justify-center
            items-center
        "
    >
        <Selector {choices} bind:currchoice={value}/>
    </div>
    <form
        class="
            flex
            flex-col
            justify-evenly
            items-center
            flex-1
        "
    >
        {#if value!=3}
            <span class="flex-1" transition:fade>
                <div class="search">
                    <input type="text" class="text-mainColor"> <i class="fas fa-search" />
                </div>
            </span>
        {:else}
            <div class="flex-1"></div>
        {/if}
        <span
            class="w-full flex-1 flex justify-center items-center"
        >
            <button
                type="submit"
                class="
                    bg-fg
                    rounded-xl
                    px-5
                    py-1.5
                    text-mainColor
                    text-mediumText
                    font-bold
                    hover:scale-110
                    duration-200
                "
            >Discover!</button>
        </span>
    </form>
</div>