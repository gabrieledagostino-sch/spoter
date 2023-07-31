<script>
    import LoginButton from "./LoginButton.svelte";
    import { tweened } from "svelte/motion";
    import { onMount } from "svelte";

    let spinInterval;
    let rotation = tweened(0, {duration:200});

    const startSpin = () => {
        spinInterval = setInterval(()=>{
            rotation.update((n)=>n+1);
        }, 200);
    };
    const stopSpin = () => {
        clearInterval(spinInterval);
        rotation.set(0);
    }

</script>
<div class="content">
    <div class="biglogo">
        <img src="favicon/android-chrome-192x192.png" width=200vh alt="logo" />
        <div class="title">
            <p>Spoter</p>
        </div>
    </div>
    <div class="enter">
        <img 
            src="images/504759.svg" 
            alt="retro record" 
            width=150em 
            style="transform: rotate({$rotation}turn);" 
            on:mouseenter={startSpin}
            on:mouseleave={stopSpin}
        />
        <LoginButton />
    </div>
</div>
<style>
    .content {
        display: flex;
        flex-direction: row;
        gap: 10vh;
    }
    .biglogo {
        flex:1;
    }
    .title{
        width: 100%;
        text-align: center;
        color: var(--fg);
    }
    .title p{
        margin:0px;
        padding: 2px 0px;
        font-size: var(--mediumText);
        font-family: var(--logoFont);
        text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.6);
        
    }
    .enter {
        flex:1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        padding : 10px 20px;
    }

    .disk {
        border: 70px solid black;
        border-radius: 1000px;
    }
</style>