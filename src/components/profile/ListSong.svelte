<script>
    import { createEventDispatcher } from "svelte";
    import { tweened } from "svelte/motion";
    
    export let text = "Esse sint non ad pariatur consequat irure veniam irure amet laboris voluptate eiusmod. Commodo eiusmod nulla exercitation incididunt esse."
    export let choosen = false;
    export let img
    export let playing = false;

    export const stop = () => playing = false
    export const play = () => playing = true
    export const deselect = () => choosen = false

    const dispatch = createEventDispatcher();
    let offset = tweened(0, {duration:100});
    let rotateX = tweened(0);
    let rotateY = tweened(0);
    let timer;
    let spanRef;

    const startAutoscrollX = () => {
        if(!spanRef) return;
        rotateX.set(textWidthX - spanRef.clientWidth, {duration : speedX})
        clearTimeout(timer)
        timer = setInterval(() => {
            rotateX.set(0, {duration:0})
            rotateX.set(textWidthX - spanRef.clientWidth, {duration:speedX})
        }, speedX + 1000);
    }
    const startAutoscrollY = () => {
        if(!spanRef) return;
        rotateY.set(textWidthY - spanRef.clientHeight, {duration:speedY})
        clearTimeout(timer)
        timer = setInterval(() => {
            rotateY.set(0, {duration:0})
            rotateY.set(textWidthY - spanRef.clientHeight, {duration:speedY})
        }, speedY + 1000);
    }

    const mouseEnter = () => {
        spanRef = spanRef
        offset.set(0.1)
        if(window?.matchMedia("(max-width: 768px)").matches) startAutoscrollX();
        else startAutoscrollY();
    }


    const mouseLeave = () => {
        offset.set(0)
        clearTimeout(timer)
        rotateX.set(0, {duration:500})
        rotateY.set(0, {duration:500})
    }
    
    $: textWidthX = spanRef?.scrollWidth
    $: textWidthY = spanRef?.scrollHeight
    $: speedX = textWidthX*10
    $: speedY = textWidthY*20

</script>


<div 
    role="img"
    class="listSong
        relative
        px-4
        py-1
        m-2
        box-border
        md:aspect-square
        md:py-4
        flex
        flex-row
        md:flex-col
        rounded-2xl
        border-2
        border-complementaryFG
        gap-2
        bg-[rgba(0,0,0,0.4)]
    "
    on:mouseenter={mouseEnter}
    on:mouseleave={mouseLeave}
>
    <div 
        class="bgimage
            absolute
            hidden
            md:block
            top-0
            left-0
            overflow-hidden
            w-full
            h-full
            rounded-2xl
            z-10
        "
    >
        <div class="mask rounded-2xl z-10 absolute w-full h-full top-0 left-0 bg-black opacity-50"></div>
        <img 
            src={img} 
            alt={text}
            class="
                absolute
                top-0
                left-0
                z-0
                w-full
                h-full
                object-cover
                duration-200
            "
            style:transform={`scale(${1+$offset})`}
        />
    </div>
    <div 
        class="choose 
            relative 
            z-20
            flex
            justify-start
            items-center
            "
    >
        {#if choosen}
            <i class="far fa-check-circle" on:click|preventDefault={_=>{choosen=false;dispatch('change',{value:false});}} on:keypress|preventDefault={_=>{choosen=false;dispatch('change',{value:false});}} role="button" tabindex=0 />
        {:else}
            <i class="far fa-circle" on:click|preventDefault={_=>{choosen=true;dispatch('change',{value:true});}} on:keypress|preventDefault={_=>{choosen=true;dispatch('change',{value:true});}} role="button" tabindex=0 />
        {/if}
    </div>
    <div class="info relative z-20 flex-1 flex items-center justify-center overflow-hidden">
        <span
            class="
                inline-block
                absolute
                max-md:whitespace-nowrap
                w-full
                h-full
                text-complementaryFG
            "
            bind:this={spanRef}
            style:transform={`translateX(-${$rotateX}px) translateY(-${$rotateY}px)`}
        >
        {text}
        </span>
    </div>
    <div class="controls relative z-20 flex items-center justify-between gap-4 m-2">
        <i 
            class="
                fas 
                fa-trash
                cursor-pointer
                hover:bg-select
            " 
            role="button" 
            on:click={(e) => dispatch('delete', e)} 
            on:keypress={e => dispatch('delete', e)}
            tabindex=0
        />
    {#if playing}
        
        <i 
            class="
                fas fa-stop
                cursor-pointer
                hover:bg-select
            " 
            role="button"
            on:click={e => {playing=false;dispatch('pause', e)}}
            on:keypress={e => {playing=false;dispatch('pause', e)}}
            tabindex=0
        />
    {:else}
        <i 
            class="
                fas fa-play
                cursor-pointer
                hover:bg-select
            " 
            role="button"
            on:click={e => {playing=true;dispatch('play', e)}}
            on:keypress={e => {playing=true;dispatch('play', e)}}
            tabindex=0
        />
    {/if}
    </div>
</div>