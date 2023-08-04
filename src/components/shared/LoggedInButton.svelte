<script>
    import { slide } from "svelte/transition";
    import { fade } from "svelte/transition";

    export let nomeutente = 'prova';

    let mouseHover = false;
    let focus = false;
    let mouseTimeout;

    const showMouse = () => {
        mouseHover = true;
        clearTimeout(mouseTimeout);
    };

    const hideMouse = () => {
        mouseTimeout = setTimeout(() => {
            mouseHover = false;
        }, 100);
    };
</script>
<div
    class="content"
    role="button"
    tabindex=0
    on:mouseenter={showMouse}
    on:focusin={() => focus=true}
    on:mouseleave={hideMouse}
    on:focusout={() => focus=false}
>
    <div class="button" >
        <p>Logged in as <b>{nomeutente}</b></p> 
        <img src="images/user-128.svg" alt="immagine utente"/>
    </div>
    {#if focus || mouseHover}
    <div class="dialog" transition:slide={{duration:300}} >
        <p>prova</p>
        <div class="arrow" transition:slide={{duration:100, delay:300}}></div>
    </div>
    {/if}
</div>
<style>
    .content {
        position: relative;
    }
    .button {
        background-color: var(--complementaryFG);
        margin: 0px;
        border: 0px;
        border-radius: 10px;
        font-family: var(--mainFont);
        color: var(--mainColor);
        padding : 5px 20px;
        box-shadow: 2px 2px 3px rgba(0 ,0, 0,0.6);
        cursor: default;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 10px;
        font-size: var(--smallerText);
    }

    .button img {
        border-radius: 20px;
        border: 1px solid black;
        width: 20px;
        height: 20px;
    }
    .button p {
        all: unset;
    }

    .dialog {
        margin: 0 auto;
        margin-top: 10px;
        background-color: var(--complementaryFG);
        border-radius: 5px;
        color: var(--mainColor);
        position: absolute;
        top: 100%;
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-shadow: 1px 1px 6px rgba(0 ,0, 0,0.6);
    }
    div.dialog p:hover {
        background: linear-gradient(90deg, rgba(0,0,0,0) ,rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0));
    }

    div.dialog p {
        text-align: center;
        margin: 10px;
        padding : 2px 10px;
        width: 100%;
        cursor: pointer;
    }

    .arrow {
        content: "";
        position: absolute;
        border-style: solid;
        border-width: 10px;
        border-color: transparent transparent var(--complementaryFG) transparent;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
    }

</style>