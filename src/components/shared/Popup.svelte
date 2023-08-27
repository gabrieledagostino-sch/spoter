<script>
    import { createEventDispatcher } from "svelte";
    import { clickOutside } from "$lib/clickOutside";
  import { fade, scale } from "svelte/transition";

    export let show = false;
    export let lbl = "modal dialog"

    const dispatch = createEventDispatcher();

</script>
{#if show}
<div 
    class="mask
        absolute
        top-0
        left-0
        w-screen
        h-screen
        bg-[rgba(0,0,0,0.5)]
    "
    transition:fade
>
    <div 
        class="dialog
            absolute
            bg-mainColor
            box-border
            w-full
            h-full
            md:top-1/2
            md:left-1/2
            md:rounded-2xl
            md:-translate-x-1/2
            md:-translate-y-1/2
            md:w-1/2
            md:h-1/2
            shadow-lg
            flex
            flex-col
            p-5
        "
        role="dialog"
        aria-modal="true"
        tabindex="-1"
        aria-label="{lbl}"
        
        transition:scale

        use:clickOutside
        on:clickedOut={_ => dispatch('close')}
        
    >
        <div 
            class="closebutton
                flex
                justify-end
                text-red-500
            "
        >
            <i 
                class="fa-solid fa-circle-xmark
                " 
                role="button"
                tabindex="0"
                on:click={_ => dispatch('close')}
                on:keypress={_ => dispatch('close')}
            />
        </div>
        <div
            class="flex-1"
        >
            <slot />
        </div>
    </div>

</div>
{/if}