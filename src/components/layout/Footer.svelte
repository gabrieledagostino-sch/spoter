<script>
    import { faGithub } from "@fortawesome/free-brands-svg-icons";
    import { onMount } from "svelte";
    import Fa from "svelte-fa/src/fa.svelte";
    let mainColor = 'rgb(255,255,255)';
    const githubClick = () => {
        window.location = "https://github.com/gabrieledagostino-sch"
    }
    onMount(()=>{
        const rootStyles = getComputedStyle(document.documentElement);
        mainColor = rootStyles.getPropertyValue("--bgColor").trim();
    
    })
</script>

<footer>
    <p><i>Gabriele D'Agostino</i></p>
    <div class="githubLink" role="link" tabindex=0 aria-label="github @gabbo-sch" on:keypress={githubClick} on:click={githubClick}>
        <Fa icon={faGithub} color={mainColor} />
    </div>
</footer>

<style>
    footer{
        bottom: 0;
        left: 0;
        width: 100%;
        margin: 0 auto;
        display: flex;
        color: var(--complementary);
        border-top: 1px solid var(--complementary);
        background-color: var(--mainColor);
        font-size: var(--smallerText);
        align-items: center;
        justify-content: center;
        gap: 20px;
    }

    p{
        margin: 0;
    }

    .githubLink {
        display: inline-block;
        padding:5px;
    }
    .githubLink:hover {
        background-image: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 70%);
    }
</style>