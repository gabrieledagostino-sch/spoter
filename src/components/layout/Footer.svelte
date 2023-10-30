<script>
    import { PUBLIC_GHLink } from "$env/static/public";
    import Slider from "../shared/Slider.svelte";
    
    const githubClick = () => {
        window.location = PUBLIC_GHLink;
    }
    export let initialValue;

    const changeHandle = (e) => {
        console.log('changing to' + e.detail.value)
        let value = e.detail.value;
        let expiration = new Date();
        expiration.setTime(expiration.getTime() + 1000*3600)
        let cookie = `autoplay=${value};expires=${expiration.toUTCString()};path=/`
        console.log(cookie)
        document.cookie=cookie;
    }
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
        <Slider fontSize='1rem' label={'AutoPlay'} on:change={changeHandle} initialValue={initialValue}/>
    </div>
</footer>