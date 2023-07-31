<script>
    const githubClick = () => {
        window.location = "https://github.com/gabrieledagostino-sch"
    }
</script>

<footer>
    <p><i>Gabriele D'Agostino</i></p>
    <div class="githubLink" role="link" tabindex=0 aria-label="github @gabbo-sch" on:keypress={githubClick} on:click={githubClick}>
        <img alt="github logo" src="images/githublogo.svg" />
    </div>
</footer>

<style>
    footer{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        margin: 0 auto;
        display: flex;
        color: var(--complementary);
        border-top: 1px solid var(--complementary);
        background-color: var(--mainColor);
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
        height: 100%;
        background-color: var(--complementary);
    }
</style>