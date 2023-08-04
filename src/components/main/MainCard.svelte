<script>
    import LoginButton from "../shared/LoginButton.svelte";
    import { tweened } from "svelte/motion";

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
            style="
                transform: rotate({$rotation}turn);
                transform-origin: 49.17% 50.5%;
            " 
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
        width: 50w;
        height: 40vh;
        gap: 10vh;
    }
    .biglogo {
        flex:1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
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
</style>