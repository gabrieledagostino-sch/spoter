<script>
    import Card from "../../components/discoverSong/Card.svelte";
    import { onMount } from "svelte";
    import { animate } from "$lib/cardDragging.js";
    import { fly } from "svelte/transition";

    let cards = [...Array(40).keys()].map((_,i) => i+1);
    let last = 1;

    $: active = cards[0] ?? undefined;
    $: second = cards[1] ?? undefined;
    $: third  = cards[2] ?? undefined;

    const swiped = async(e) => {
        last = e.detail==='left'?-1:1;
        await Promise.resolve().then(() => cards = cards.filter(v => v !== active))
    }

    onMount(() => {
        animate('.active');
    })
</script>

<div 
    class="
        w-full
        min-h-full
        relative
        overflow-hidden
    "
>
    {#each cards as card (card)}
        <div 
            class="card
                absolute
                w-full
                h-full
                md:w-2/5
                md:h-4/5
                left-1/2
                top-1/2
                cursor-grabbing
                duration-100
            "
            class:active={active === card}
            class:inactive={active !== card}
            class:second={second === card}
            class:third={third === card}

            on:swiped={swiped}
            out:fly={{x:last*200, y:-100}}

        >
            <Card  on:play={_ => console.log(`played ${card}`)} id={card} name={card} artist={card} addInfo="LORE DELLA CANZONE"/>
        </div>
    {/each}
</div>
<style>
    .active {
        z-index: 30;
        --card-x : 0px;
        --card-y : 0px;
        --rot-deg: 0deg;
        -ms-touch-action: none;
        touch-action: none;
        transform:  translateX(calc(-50% + var(--card-x)))
                    translateY(calc(-50% + var(--card-y)))
                    rotate(var(--rot-deg))
    }
    .inactive {
        display: none;
    }
    .second {
        z-index: 20;
        display: block;
        transform:  translateX(calc(-50% + 10px))
                    translateY(calc(-50% + 10px));
    }
    .third {
        z-index: 10;
        display: block;
        transform:  translateX(calc(-50% + 20px))
                    translateY(calc(-50% + 20px));
    }
</style>