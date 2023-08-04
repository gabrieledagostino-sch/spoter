<script>
    import { onMount } from "svelte";
    import { animate } from "../../lib/cardDragging";
    import Card from "./Card.svelte";
    import { fade, fly, slide } from "svelte/transition";

    let cards = [
        {id : 0},
        {id : 1},
        {id : 2},
        {id : 3},
        {id : 4},
    ];
    let last = 1;

    
    const swiped = async (e) => {
        console.log(e.detail);
        last = e.detail==='left'?-1:1
        await Promise.resolve().then(()=>{cards = cards.filter(v => v !== active)});
    };

    onMount(()=>{
        animate('.active');
    });

    $: active = cards[0] ?? undefined;
    $: second = cards[1] ?? undefined;
    $: third = cards[2] ?? undefined;

    $: console.log(`active : ${active?.id} second : ${second?.id} third : ${third?.id}`)
</script>
<div 
    class="content"
    >
    {#each cards as card (card.id)}
        <div 
            class="card" 
            class:active={active.id === card.id}
            class:inactive={active.id !== card.id}
            class:second={second?.id === card.id}
            class:third={third?.id === card.id}
            on:swiped={swiped}
            out:fly={{x:last*200, y:-100}}
        >
            <Card />
        </div>
    {/each}
</div>

<style>
    .content {
        width: 100%;
        height: 100%;
        position: relative;
    }
    .active {
        z-index: 2;
        --card-x : 0px;
        --card-y : 0px;
        --rot-deg: 0deg;
        transform: translateX(calc(-50% + var(--card-x))) translateY(calc(-50% + var(--card-y))) rotate(var(--rot-deg));
    }
    .card {
        position: absolute;
        width: 40%;
        height: 90%;
        left: 50%;
        top : 50%;
    }
    .card:hover {
        cursor: grabbing;
    }
    .inactive {
        visibility: hidden;
        transform: translateX(calc(-50%)) translateY(calc(-50%));
    }
    .second {
        z-index: 1;
        visibility: visible;
        transform: translateX(calc(-50% + 10px)) translateY(calc(-50% + 10px));
    }
    .third {
        z-index: 0;
        visibility: visible;
        transform: translateX(calc(-50% + 20px)) translateY(calc(-50% + 20px));
    }
</style>