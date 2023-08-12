<script>
    import { createEventDispatcher, onMount } from "svelte";
    import { tweened } from "svelte/motion";
    
    export let choices = [];
    export let currchoice = 0;
    
    let widths = [];
    let left = tweened(0,{duration:200})
    let right= tweened(0,{duration:200})
    let fgColor, mainColor;
    let wrapper;

    const dispatch = createEventDispatcher();

    const click = (choice) => {
        currchoice = choice;
        dispatch("change", {value:choice});
    }
    const animation = (i) => {
        let leftW = widths.reduce((acc, cvl, idx) => idx<i? acc+cvl+gap : acc, gap) - gap/2;
        let rightW = leftW + widths[i] + gap;

        
        left.set(leftW * 100 / wrapper)
        right.set(rightW * 100 / wrapper)
    }

    $: gap = (wrapper - widths.reduce((acc, cvl) => acc+cvl, 0))/(choices.length+1);
    $: animation(currchoice)

    onMount(() => {
        const rootStyles = getComputedStyle(document.documentElement)
        fgColor = rootStyles.getPropertyValue('--fg');
        mainColor=rootStyles.getPropertyValue('--mainColor');
    })

</script>
<div 
    class="wrapper
        box-border
        w-full
        h-auto
        pb-0.5
    "
    bind:clientWidth={wrapper}
    style:background = {
        `linear-gradient(to right, ${mainColor}, ${mainColor} ${$left}%, ${fgColor} ${$left}%, ${fgColor} ${$right}%, ${mainColor} ${$right}%)`
    }
>
    <div 
        class="selects
            flex
            justify-evenly
            p-0
            bg-bgColor
            lg:bg-mainColor
            gap-4
        "
    >
        {#each choices as choice, i}
            <div 
                role="button"
                tabindex=0
                bind:clientWidth={widths[i]}
                on:keypress={() => click(i)}
                on:click={() => click(i)}
                class="choice
                    text-xl
                    text-complementaryFG
                    cursor-pointer
                    duration-200
                "
                class:text-fg={currchoice === i}
            >
                {choice}
            </div>
        {/each}
    </div>
</div>