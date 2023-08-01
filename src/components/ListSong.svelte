<script>
    import { tweened } from "svelte/motion";
    import Fa from 'svelte-fa' 
    import { faEllipsisVertical, faPlay, faPlayCircle } from '@fortawesome/free-solid-svg-icons'
    import { onMount } from "svelte";
    export let rNum;
    
    let iconColor = "rgb(255,255,255)";
    let bgColor = "rgb(0,0,0)"
    let scale = tweened(1, {
        duration:100
    });
    onMount(()=>{
        const rootStyles = getComputedStyle(document.documentElement);
        iconColor = rootStyles.getPropertyValue("--complementaryFG");
        bgColor = rootStyles.getPropertyValue("--bgColor");
    });
</script>

<div class="wrapper">
    <div class="content" role="img" on:mouseenter={()=> scale.set(1.1)} on:mouseleave={()=> scale.set(1)} >
        <img 
            src="https://picsum.photos/400?random={rNum}" 
            alt="placeholder"
            style="transform: scale({$scale})"
        />
        <div class="title">
            Nulla sint enim duis ex eiusmod dolore consectetur ut officia. Do velit excepteur esse proident do nisi aliquip. Ex velit labore reprehenderit occaecat exercitation esse id. Occaecat sit exercitation excepteur sint do do aliqua cillum velit. Mollit esse reprehenderit mollit sint. Mollit labore dolore non fugiat incididunt. Velit non et amet aute.
        </div>
        <div class="controls">
            <div class="playButton">
                <Fa size="1.5vw" icon={faPlay} color={iconColor} />
            </div>
            <div class="moreDots">
                <Fa size="1.5vw" icon={faEllipsisVertical} color={iconColor} />
            </div>
        </div>
    </div>
  </div>
  
<style>
    .wrapper {
        width: 100%;
        padding-bottom: 100%; /* 1:1 aspect ratio */
        position: relative;
        border: 1px solid var(--complementaryFG);
        border-radius: 10px;
    }
  
    .content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        aspect-ratio: 1/1;
        overflow: hidden;
        border-radius: 10px;
    }
  
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .controls {
        position:absolute;
        top:75%;
        left:0;
        right:0;
        bottom:0;
        background-color: rgba(0,0,0,0.5);
    }
    
    .playButton {
        position: absolute;
        height: 75%;
        width: 20%;
        right: 10%;
        bottom: 15%;
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .moreDots {
        position: absolute;
        height: 75%;
        width: 20%;
        left:10%;
        bottom:20%;
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .moreDots:hover, .playButton:hover {
        background-image: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 75%);
    }

    .title {
        position:absolute;
        top:0;
        left:0;
        right:0;
        bottom:75%;
        padding: .5vw;
        color: var(--complementaryFG);
        overflow: hidden;
        background-color: rgb(0,0,0,0.5);
        text-overflow: clip;
    }
</style>
  