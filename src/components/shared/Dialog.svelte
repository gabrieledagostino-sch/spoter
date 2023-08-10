<script>
    import { slide } from "svelte/transition";

    export let choices=[];
    export let direction = 'center';
    
    let show=false;
    let mouseTimeout;
    let a;

    const showMouse = () => {
        show = true;
        clearTimeout(mouseTimeout);
    };

    const hideMouse = () => {
        mouseTimeout = setTimeout(() => {
            show = false;
        }, 100);
    };

    $: rightpercent = direction == 'left'?'right-0':(direction == 'right'?'left-0':'')
    $: arrowPos = direction=='left'?'right-0':direction=='right'?'left-0':'left-1/2';
</script>
<div
    class="
        relative
        flex
        justify-center
        items-center
    "
    role="button"
    aria-label="open menu"
    tabindex=0
    on:mouseenter={showMouse} 
    on:mouseleave={hideMouse}
>
    <slot />
    {#if show}
        <div 
            class="
                mt-2
                bg-complementaryFG
                rounded-md
                box-border

                absolute
                top-full
                {rightpercent}
                min-w-full
                w-auto
                h-auto
                
                flex
                flex-col
                justify-center
                items-center

                shadow-black
                shadow-md
            " 
            transition:slide={{duration:200}}
            bind:this={a}
        >
            <div 
                class="
                    content-none
                    border-solid
                    border-8
                    border-transparent
                    border-b-complementaryFG
                    absolute
                    bottom-full
                    {arrowPos}
                    {direction==='right'?'':'-'}translate-x-1/2
                "
                transition:slide={{duration:100, delay:200}} 
            ></div>
            {#each choices as choice}
                <button
                    class="
                        text-center
                        m-2
                        px-0.5
                        py-2
                        w-full
                        text-bgColor
                        {choice.effect !== undefined? `
                            duration-200
                            hover:text-fg
                            curosr-pointer
                        `:''}
                    " 
                    disabled={choice.effect === undefined}
                    on:click={choice.effect}
                >
                    {#if choice.isSvelte}
                        <svelte:component this={choice.element} />
                    {:else}
                        {@html choice.element}
                    {/if}
                </button>
            {/each}
        </div>
    {/if}
</div>