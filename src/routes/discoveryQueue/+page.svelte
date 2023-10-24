<script>
    import Card from "../../components/discoverSong/Card.svelte";
    import { onMount } from "svelte";
    import { animate } from "$lib/cardDragging.js";
    import { fly } from "svelte/transition";

    export let data;

    const MIN_CARDS = 5;

    let cards = data?.recommendations??[];
    let next = data?.next;
    let last = 1;
    let audio;
    let fetching = true;
    let dragging = false;

    $: {
        if(!fetching && cards.length < MIN_CARDS && next)
            getMore().finally(() => fetching = false)
    }
    
    $: active = cards[0] ?? undefined;
    $: second = cards[1] ?? undefined;
    $: third  = cards[2] ?? undefined;
    
    $: { console.log(dragging) }

    const swiped = async(e, card) => {
        last = e.detail==='left'?-1:1;
        audio.pause()
        Promise.resolve()
        .then(() => cards = cards.filter(v => v !== active))
        .then(() => fetch('/api/discover/interest', {
            method:"post",
            body:JSON.stringify({direction:e.detail, id:card.id})
        }))
    }

    const getMore = async () => {
        fetch(next).then(r => r.json()).then(j => {
            cards = [...cards, ...j?.recommendations]
            next = j.next
        })
    }   
    
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
        animate('.active');
        audio=new Audio()
        fetching = false
    })

</script>
<svelte:head>Spoter - Discovery</svelte:head>
<div 
    class="
        w-full
        min-h-full
        relative
        overflow-hidden
    "
>
    {#if dragging}

    <div class="
        guide
        absolute
        top-0
        left-0
        w-full
        h-full
        z-10
        flex
        justify-between
        align-bottom
        bg-gradient-to-b from-transparent to-green-500
        "
    >
        <i class="fa-solid fa-heart m-4 text-mainColor"></i>
        <i class="fa-solid fa-xmark m-4 text-mainColor"></i>
    </div>

    {/if}
    {#each cards as card (card.id)}
        <!-- svelte-ignore a11y-no-static-element-interactions -->
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

            on:swiped={(e) => swiped(e, card)}
            on:dragin={()=>dragging=true}
            on:dragout={()=>dragging=false}
            out:fly={{x:last*200, y:-100}}

        >
            <Card on:pause={stopHandle} on:play={() => playHandle(card.preview)} name={card.name} artist={card.artists.join(", ")} img={card.image} addInfo={card.album}/>
        </div>
    {:else}
        <div class="flex-1 text-complementaryFG">
            No more suggestions, try with another query :)
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