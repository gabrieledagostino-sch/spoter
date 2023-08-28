<script>
    export let clickable = false
    export let href = '/'
    export let hLabel = 'homepage'

    const handleClick = () => {
        window.location.href = href
    }
</script>

{#if clickable}
    <div role="link" aria-label={`go to ${hLabel}`} on:click={handleClick} on:keypress={handleClick} tabindex=0 class="inline-block hover:bg-glow">
        <img src="/logo/logo.png" alt="logo" />
    </div>
{:else}
    <div class="inline-block">
        <img src="logo/logo.png" alt="logo">
    </div>
{/if}

<style type="postcss">
    img {
        width: var(--width, 64px);
        height: var(--height, 64px);
    }
</style>