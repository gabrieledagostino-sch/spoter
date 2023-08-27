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

    $: {
        console.log('fetching')
        if(!fetching && cards.length < MIN_CARDS && next)
            getMore().finally(() => fetching = false)
    }
    
    $: active = cards[0] ?? undefined;
    $: second = cards[1] ?? undefined;
    $: third  = cards[2] ?? undefined;
    

    const swiped = async(e, card) => {
        last = e.detail==='left'?-1:1;
        audio.pause()
        Promise.resolve()
        .then(() => cards = cards.filter(v => v !== active))
        .then(() => fetch('/api/discover/interest', {
            method:"post",
            body:JSON.stringify({direction:e.detail, id:card.id})
        }))
        .then(r => r.json()).then(v => console.log(v))
    }

    const getMore = async () => {
        console.log(cards.length)
        console.log("fetching ..." + next)
        fetch(next).then(r => r.json()).then(j => {
            cards = [...cards, ...j?.recommendations]
            next = j.next
            console.log(... cards.map(v => v.name+'\n'))
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

<div 
    class="
        w-full
        min-h-full
        relative
        overflow-hidden
    "
>
    {#each cards as card (card.id)}
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