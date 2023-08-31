<script>
    import { PUBLIC_GHLink } from "$env/static/public";
    const githubClick = () => {
        window.location = PUBLIC_GHLink;
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
        items-center
        justify-center
        gap-4
    "
>
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
</footer>