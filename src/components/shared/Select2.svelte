<script>
    import { slide } from "svelte/transition";
    import { clickOutside } from "../../lib/clickOutside";
    import { createEventDispatcher } from "svelte";

    export let options = [];
    export let label = "label : ";
    export let choice = options[0];

    const dispatch = createEventDispatcher();

    let show = false;
    let id = crypto.randomUUID();
</script>

<div
    class="
        flex
        flex-row
        items-center
        gap-2.5
        w-full
    "
    use:clickOutside
    on:clickedOut={() => show=false}
>
    <label
            for="{id}"
        >
        {label}
    </label>
    <div 
        class="select
            relative
            box-border
            flex-1
            text-complementaryFG
        "
    >
        <button
            class="selectButton
                w-full
                border-2
                border-complementaryFG
                rounded-xl
                p-2.5
                cursor-pointer
                flex
                flex-row
                justify-between
                items-center
                gap-2.5
                bg-bgColor
            "
            id="{id}"
            on:click={() => show=!show}
        >
            <span>{choice}</span><b>˅</b>
        </button>
        {#if show}
            <div 
                class="options
                    z-50
                    bg-bgColor
                    border-2
                    border-complementaryFG
                    rounded-xl
                    w-full
                    p-2.5
                    absolute
                    top-full
                    right-0
                    flex
                    flex-col
                    gap-1
                "
                transition:slide={{duration:100}}
            >
                {#each options as option}
                    <button 
                        class="option
                            cursor-pointer
                            hover:bg-select
                            text-left
                        "
                        on:click|self|stopPropagation={()=> {
                            if(choice!=option) dispatch('change', choice);
                            choice=option
                            show=false
                        }}
                    >
                        {option}
                    </button>
                {/each}
            </div>
        {/if}
    </div>
</div>