<script>
    import { createEventDispatcher, onMount } from "svelte";
    import { tweened } from "svelte/motion";

    export let choices;
    export let idxChoices;
    
    let fgColor;
    let mainColor;
    let right = tweened(0, {duration:200});
    let left = tweened(25, {duration:200});
    let wrapper;
    let height;
    let widths = [];

    $: gap = (wrapper - widths.reduce((acc, cvl) => acc+cvl, 0)) /(widths.length+1);
    $: animation(idxChoices);

    const dispatch = createEventDispatcher();
    const animation = (index) => {

        let leftW = widths.reduce((acc, cvl, idx) => idx < index ? acc + cvl + gap : acc , gap) - gap/2;
        let rightW = leftW + widths[index] + gap ;

        left.set(leftW*100/wrapper);
        right.set(rightW*100/wrapper);
    };

    const click = (choice) => {
        idxChoices = choice.i;

        dispatch("change", {value:choice.lbl});
    };

    onMount(() => {
        const rootStyles = getComputedStyle(document.documentElement);
        fgColor = rootStyles.getPropertyValue('--fg');
        mainColor = rootStyles.getPropertyValue('--mainColor');

        idxChoices = choices[0].i;
    });

</script>
<div class="wrapper"
    bind:clientWidth={wrapper}
    bind:clientHeight={height}
    style:background={`
        linear-gradient(
            to right, ${mainColor}, ${mainColor} ${$left}%, ${fgColor} ${$left}%, ${fgColor} ${$right}%, ${mainColor} ${$right}%
        )
    `}
>
    <div class="selects">
        {#each choices as choice (choice.i) }
            <div 
                bind:clientWidth={widths[choice.i]}
                class="choice" 
                role="button" 
                tabindex="0" 
                on:keypress={() => click(choice)} 
                on:click={() => click(choice)} 
                class:active={idxChoices==choice.i}
            >
                {choice.lbl}
            </div>
        {/each}
    </div>
</div>
<style>
    .wrapper {
        width: 75%;
        height: auto;
        padding-bottom: 2px;
    }

    .selects {
        margin: auto;
        display: flex;
        justify-content: space-evenly;
        padding: 0;
        background-color: var(--mainColor);
    }
    .choice {
        font-size: 18px;
        color : var(--complementaryFG);
        cursor: pointer;
    }
    .active {
        color : var(--fg);
        padding-bottom: 8px;
    }
</style>