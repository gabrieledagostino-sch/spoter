<script>
    import { slide } from "svelte/transition";

    export let choices=[];
    export let direction = "center";
    
    let show=false;
    let focus=false;
    let mouseTimeout;
    let focusTimeout;

    const showMouse = () => {
        show = true;
        clearTimeout(mouseTimeout);
    };
    const showFocus = () => {
        focus = true;
        clearTimeout(focusTimeout);
    }

    const hideMouse = () => {
        mouseTimeout = setTimeout(() => {
            show = false;
        }, 100);
    };
    const hideFocus = () => {
        focusTimeout = setTimeout(() => {
            focus = false;
        }, 100);
    }
</script>

<div
    class="
        relative
        box-content
        cursor-default
        max-w-full
        w-full
        flex items-center justify-center
    "
    tabindex=0
    on:mouseenter={showMouse}
    on:mouseleave={hideMouse}
    on:focusin={showFocus}
    on:focusout={hideFocus}
    role="button"
>
    <slot />
    {#if (show || focus) && choices.length > 0}
        <div
            class="
                absolute z-50 bottom-0
                min-w-full  w-auto
            "
        >
            <div class="
                    absolute top-full left-1/2 -translate-y-1/2 -translate-x-1/2 z-60
                    w-0 h-0 triangle
                    border-solid border-8 border-transparent border-b-complementaryFG
                "
            ></div>
            <div 
                class="
                    absolute top-2 z-50
                    {direction==="left"?'-right-[0.5rem]':direction==="center"?'left-1/2 -translate-x-1/2':'-left-[0.5rem]'}
                    min-w-full w-auto h-auto
                    bg-complementaryFG text-fg
                    box-border rounded-xl px-2 py-px
                    overflow-hidden
                    choices
                "
                in:slide={{duration:200}}
                out:slide={{duration:200}}
            >
                <div class="
                        relative z-50
                        box-border p-2
                        overflow-y-scroll
                        h-auto w-full max-h-[40vh] 
                        flex flex-col items-center justify-start
                    "
                >
                    {#each choices as choice}
                        <button
                            class="
                                text-bgColor  w-full
                                p-2 border-b-2 border-b-transparent
                                duration-200
                                {!choice.isSvelte || choice.effect?'hover:text-fg':''}
                                {!choice.isSvelte || choice.effect?'hover:border-b-fg':''}
                            "
                            on:click={(ev) => {if(choice.effect) choice.effect(ev, ()=>show=focus=false)}}
                        >
                            {#if choice.isSvelte}
                                <svelte:component this={choice.element} {...choice.props} />
                            {:else}
                                {@html choice.element}
                            {/if}
                        </button>
                    {/each}
                </div>
            </div>
        </div>
    {/if}
</div>
<style>
    .overflow-y-scroll::-webkit-scrollbar-thumb {
        background-color: var(--bgColor); 
        border-radius: 9999px; 
    }
    .overflow-y-scroll::-webkit-scrollbar {
        width: 2px;
    }
    .overflow-y-scroll::-webkit-scrollbar-corner {
        background-color: var(--complementaryFG);
    }
    .choices {
        -webkit-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);  
        -moz-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
        box-shadow: 0px 0px 10px rgba(0,0,0,0.5)
    }
</style>