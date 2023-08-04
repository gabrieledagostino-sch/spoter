<script>
    import Select2 from "../shared/Select2.svelte";
    import ListSong from "./ListSong.svelte";

    let options = ['Latest', 'Session', 'Artist', 'Genre'];
    let label = "Order by:";
</script>

<div class="songs">
    <div class="selectOrdering">
            <Select2 {label} {options} />
    </div>
    <div class="innersongs">
        {#each Array(5).keys() as i}
            <ListSong rNum={i} />    
        {/each}
    </div>
</div>



<style>
    .selectOrdering {
        width: 100%;
        height: 5%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        color: var(--complementaryFG);
    }
    .songs{
        width: 100%;
        height: 100%;
        border: 1px solid var(--complementaryFG);
        border-radius: 20px;
        padding:20px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        overflow-y: hidden;
        gap : 10px;
    }

    .innersongs {
        overflow-y: scroll;
        height: 100%;
        display: grid;
        margin:5% 1%;
        padding: 0 4%;
        grid-template-columns: 0.24fr 0.24fr 0.24fr 0.24fr;
        gap: 5%;
        scrollbar-width: 2px;
    }

    .innersongs::-webkit-scrollbar-track {
        background: var(--bgColor);
        border-radius: 2px;
    }

    .innersongs::-webkit-scrollbar-thumb {
        background-color: var(--complementaryFG); 
        border-radius: 20px; 
    }
    .innersongs::-webkit-scrollbar {
        width: 2px;
    }

</style>