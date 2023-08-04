<script>
    import { faSearch } from "@fortawesome/free-solid-svg-icons";
    import { onMount } from "svelte";
    import Fa from "svelte-fa";
    import { tweened } from "svelte/motion";
    import Selector from "../shared/Selector.svelte";

    let scale = tweened(1, {duration:100});
    const types = [
        {lbl:'Similar To',  i:0}, 
        {lbl:'Artist',      i:1}, 
        {lbl:'Genre',       i:2}, 
        {lbl:'Random',      i:3}
    ]; 
    
    let fgColor = 'rgb(255,255,255)';

    const scaleUp = () => scale.set(1.1);
    const scaleDown = () => scale.set(1);

    onMount(()=>{
        const rootStyles = getComputedStyle(document.documentElement);
        fgColor = rootStyles.getPropertyValue("--mainColor");
    });

</script>

<div class="content">
    <div class="title">
        <h1>Discover</h1>
    </div>
    <div class="selector">
        <Selector choices={types} />
    </div>
    <form>
        <span>
            <div class="search">
                <input type="text" />
                <Fa icon={faSearch} color={fgColor} />
            </div>
        </span>
        <span>
            <button on:mouseenter={scaleUp} on:mouseleave={scaleDown} type="submit" style="transform: scale({$scale})" >Scopri</button>
        </span>
    </form>
</div>

<style>
    .content{
        width: 50vw;
        height: 33vh;
        margin-top: auto;
        margin: auto;
        background-color: var(--mainColor);
        border-radius: 10px;
        display: grid;
        grid-template-rows: 25% 35% 40%;
    }
    .title{
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--fg);
        font-size: var(--smallText);
        text-shadow: 2px 2px 5px rgba(0,0,0);
    }
    
    .selector {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        color:var(--complementaryFG);    
        
    }
    .content form {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
    }
    .search {
        background-color: white;
        padding: 10px;
        border-radius: 10px;
    }
    .search input {
        all:unset;
        color: var(--mainColor);
    }
    button[type="submit"] {
        border:0;
        background-color: var(--fg);
        border-radius: 10px;
        padding: 10px 20px;
        font-weight: bolder;
        font-size: var(--smallerText);
        

    }
</style>