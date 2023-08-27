<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    
    export let img = 'https://picsum.photos/64'
    export let name = 'a';
    export let artist = 'a';
    export let addInfo = 'a';
    let hovering = false;
    let playing = false;
</script>

<div 
    class="content
        w-full
        h-full
        shadow-md
        flex
        flex-col
        items-center
        justify-evenly
        rounded-3xl
        bg-[var(--mainColor)]
    "
>
    <div
        class="mainShow
            w-3/4
            h-1/3
            border-2
            border-complementaryFG
            rounded-3xl
            grid
            grid-flow-col
            grid-cols-2
            bg-[var(--bgColor)]
            p-3
        "
    >
        <div
            class="image
                relative
                overflow-hidden
                flex
                box-border
                justify-center
                items-center
                rounded-full
                aspect-square
                my-auto
                mx-auto
                max-h-full
                max-w-full
            "
            role="button"
            tabindex="0"
            on:mouseenter={_ => hovering=true}
            on:mouseleave={_ => hovering=false}
            on:click={_ => {dispatch(playing?'pause':'play'); playing=!playing}}
            on:keypress={_ => {dispatch(playing?'pause':'play'); playing=!playing}}
        >
            {#if hovering}
            <div
                class="
                    z-40
                    opacity-100
                    absolute
                    left-1/2
                    top-1/2
                    -translate-x-1/2
                    -translate-y-1/2
                    w-1/5
                    h-1/5
                "
            >
                {#if playing}
                    <i class="far fa-stop-circle text-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></i>
                {:else}
                     <i class="far fa-play-circle text-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>
                {/if}
            </div>
            {/if}
            <img 
                class="
                    object-cover
                "
                style:opacity={1 - 0.5*hovering}
                src={img} alt="{name}"
            >
        </div>
        <div class="mainInfo
            flex
            flex-col
            w-full
            items-center
            justify-evenly
        ">
            <span class="text-[var(--fg)]">{name}</span>
            <span class="text-gray-400">{artist}</span>
        </div>
    </div>
    <div
        class="additionalInfo
            w-3/4
            h-1/2
            rounded-3xl
            border-2
            border-complementaryFG
            bg-[var(--bgColor)]
            text-[var(--complementaryFG)]
            p-4
        "
    >
        {addInfo}
    </div>
</div>

