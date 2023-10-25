<script>
    import { PUBLIC_GHLink } from "$env/static/public";
    import { autoplay } from "$lib/stores/autoplayStore";
    import Slider from "../shared/Slider.svelte";
    import { onMount } from "svelte";
    let ap = false;
    const githubClick = () => {
        window.location = PUBLIC_GHLink;
    }
    
    $:{
        if(ap) ;
        console.log('footer',ap)
        autoplay.set(ap)
    }
    onMount(() => {
        let unsubscribe= autoplay.subscribe(v => ap=v)
        unsubscribe();
        ap = !(!ap);
        
    })
</script>
<footer
    class="        
        border-t-2
        border-t-complementaryFG
        
        text-complementary
        text-smallText

        w-full
        h-auto
        bg-mainColor

        flex
        flex-row
        items-start
        justify-around
        gap-4
    "
>
    <div></div>
    <div class="git">
        <span>Gabriele D'Agostino</span>
        <i 
            role="link"
            tabindex=0
            aria-label="github @gabbo-sch"
            class="
                fab fa-github
                inline-block p-1 text-mediumText
                hover:bg-glow
            "
            on:click={githubClick}
            on:keypress={githubClick}
        ></i>
    </div>
    <div class="autoplay">
        <Slider fontSize='1rem' label={'AutoPlay'} bind:value={ap} />
    </div>
</footer>