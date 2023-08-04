<script>
    import { createEventDispatcher, onMount } from "svelte";
    import { slide } from "svelte/transition";
    import { clickOutside } from "$lib/clickOutside";
    

    export let options;
    export let label = "";
    let choice = options[0];
    let show = false;
    let button;
    let selectWidth = `0px`;
    let eventDispatcher = createEventDispatcher();

    $: longestWord = options.reduce((p,c) => p.length>c.length?p:c);
    
    onMount(() => {
        choice=longestWord;
        const width = button.offsetWidth;
        selectWidth = `${width}px`;
        button.style.width = selectWidth;
        choice = options[0];
    })

</script>
<label for="select">
    {label} 
</label>
<div class="select" use:clickOutside on:clickedOut={()=>{show=false}}>  
        <button class="selectButton" 
            id="select" 
            bind:this={button}
            on:click={() => show=!show}
        >
            <span>{choice}</span><b>˅</b>
        </button>
    {#if show}
        <div class="options" style="width: {selectWidth}" transition:slide={{duration:100}}>
            {#each options as option}
                <button 
                    class="option" 
                    on:click|self|stopPropagation={() => {
                        if(choice!=option) eventDispatcher('change',option);
                        choice=option; 
                        show=false;
                    }}
                >
                    {option}
                </button>
            {/each}
        </div>
    {/if}
</div>

<style>
    label {
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        padding: 0 15px 0 0px;
        gap: 10px;
    }
    .select{
        width: auto;
        position:relative;
    }
    .selectButton {
        all:unset;
        border: 1px solid var(--complementaryFG);
        background-color: rgba(0,0,0,0.5);
        padding: 10px;
        border-radius: 10px;
        cursor: pointer;
        white-space: pre-wrap;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .options {
        position: absolute;
        top: 100%;
        left: 0;
        display: flex;
        flex-direction: column;
        gap: 5px;
        background-color: var(--bgColor);
        border: 1px solid var(--complementaryFG);
        padding: 10px;
        border-radius: 10px;
        z-index: 5;
    }
    .option {        
        all:unset;
        cursor: pointer;
    }
    .option:hover {
        background: linear-gradient(90deg, rgba(0,0,0,0) ,rgba(255, 255, 255, 0.3), rgba(0, 0, 0, 0));

    }
</style>