<script>
    import { tweened } from 'svelte/motion';
    import { sineInOut } from 'svelte/easing';
    
    const scaling = tweened(0, {
        duration: 100,
        easing: sineInOut
    });
    $: style = `
        transform: scale(${1 + 0.1 * $scaling})
    `
</script>

<button on:mouseenter={() => scaling.set(1)} on:mouseleave={() => scaling.set(0)} style={style} >
    <p>Log in with <b>Spotify</b></p> 
    <img src="/spotify_black_logo_icon_147079.svg" alt="spotify logo"/>
</button>

<style>
    button{
        display: flex;
        background-color: var(--fg);
        /* border: 1px solid var(--complementaryFG); */
        border: 0px;
        border-radius: 10px;
        padding: 5px 20px;
        margin: 0;
        font-family: Arial, Helvetica, sans-serif;
        align-items: center;
        justify-content: center;
        gap: 10px;
        /* box-shadow: 1px 1px 4px rgba(255,255,255,0.6); */
        box-shadow: 2px 2px 3px rgba(0 ,0, 0,0.6);
    }

    p{
        border: 0%;
        margin: 0%;
        padding: 0%;
    }

    img {
        padding: 0%;
        border: 0%;
        margin: 0%;
        width: 20px;
    }
</style>