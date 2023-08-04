<script>
    export let mainColor = `rgb(255,255,255)`;
    export let secondaryColor = `rgb(128,128,128)`;
    export let bgColor = `rgb(0,0,0)`;
    export let id;

    let draggingCard;
</script>
<div 
    class="content" 
    style:background-color={mainColor}
>
    <div class="mainShow" style:background-color={bgColor}>
        <div class="image" style:border-color={mainColor} >
            <img src="https://picsum.photos/400?random={id}" alt="">
        </div>
        <div class="mainInfo">
            <div class="name" style:color={mainColor} >
                Nome
            </div>
            <div class="artist" style:color={secondaryColor} >
                Artista
            </div>
        </div>
    </div>
    <div class="additionalInfo" style:background-color={bgColor}>

    </div>
</div>

<style>
    .content {
        width: 100%;
        height: 100%;
        box-shadow: 1px 1px 4px black;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        border-radius: 25px;
    }

    .mainShow {
        width: 75%;
        height: 33%;
        border: 1px solid var(--complementaryFG);
        display: grid;
        grid-template-columns: 0.6fr 0.4fr;
        border-radius: 25px;
    }
    .additionalInfo{
        width: 75%;
        height: 50%;
        border-radius: 25px;
        border: 1px solid var(--complementaryFG);
    }
    .image {
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        border-radius: 50%;
        aspect-ratio: 1/1;
        margin: 10px auto;
        border: 1px solid;
    }
    .image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .mainInfo {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
    }
    .name {
    
    }
</style>