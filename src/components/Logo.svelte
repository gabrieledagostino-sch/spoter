<script>
    import { goto } from '$app/navigation';
    export let clickable = false;
    export let href = '/';
    export let hLabel = 'homepage';

    const handleClick = () => {
        console.log('at least we are here');
        goto(href);
    }
</script>

{#if clickable}
    <div class="logo clickable" role="link" aria-label={`go to ${hLabel}`} tabindex=0 on:click={handleClick} on:keypress={handleClick} >
        <img src="/logo.png" alt="logo" />
    </div>
{:else}
    <div class="logo">
        <img src="/logo.png" alt="logo" />
    </div>
{/if}

<style>
    :root {
        --smallWidth : 64px;
        --smallHeight : 64px;
        --mediumWidth : 128px;
        --mediumHeight : 128px;

        --width : var(--smallWidth);
        --height : var(--smallHeight);
    }

    .logo {
        display: inline-block;
    }

    img {
        width: var(--width);
        height: var(--height);
    }
    
    .clickable:hover {
        background-color: var(--complementary);
    }
</style>