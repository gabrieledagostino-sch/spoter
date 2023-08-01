<script>
    import Select2 from "./Select2.svelte";

    let options = ['Latest', 'Session', 'Artist', 'Genre'];
    let label = "Order by:";
</script>

<div class="songs">
    <div class="selectOrdering">
            <Select2 {label} {options} />
    </div>
    <div class="innersongs">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium excepturi consectetur magnam explicabo doloremque saepe maiores officiis! Odio dicta nostrum harum earum? Error veniam culpa mollitia accusantium deserunt dicta perferendis!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium excepturi consectetur magnam explicabo doloremque saepe maiores officiis! Odio dicta nostrum harum earum? Error veniam culpa mollitia accusantium deserunt dicta perferendis!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium excepturi consectetur magnam explicabo doloremque saepe maiores officiis! Odio dicta nostrum harum earum? Error veniam culpa mollitia accusantium deserunt dicta perferendis!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium excepturi consectetur magnam explicabo doloremque saepe maiores officiis! Odio dicta nostrum harum earum? Error veniam culpa mollitia accusantium deserunt dicta perferendis!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium excepturi consectetur magnam explicabo doloremque saepe maiores officiis! Odio dicta nostrum harum earum? Error veniam culpa mollitia accusantium deserunt dicta perferendis!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium excepturi consectetur magnam explicabo doloremque saepe maiores officiis! Odio dicta nostrum harum earum? Error veniam culpa mollitia accusantium deserunt dicta perferendis!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium excepturi consectetur magnam explicabo doloremque saepe maiores officiis! Odio dicta nostrum harum earum? Error veniam culpa mollitia accusantium deserunt dicta perferendis!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium excepturi consectetur magnam explicabo doloremque saepe maiores officiis! Odio dicta nostrum harum earum? Error veniam culpa mollitia accusantium deserunt dicta perferendis!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium excepturi consectetur magnam explicabo doloremque saepe maiores officiis! Odio dicta nostrum harum earum? Error veniam culpa mollitia accusantium deserunt dicta perferendis!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium excepturi consectetur magnam explicabo doloremque saepe maiores officiis! Odio dicta nostrum harum earum? Error veniam culpa mollitia accusantium deserunt dicta perferendis!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium excepturi consectetur magnam explicabo doloremque saepe maiores officiis! Odio dicta nostrum harum earum? Error veniam culpa mollitia accusantium deserunt dicta perferendis!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium excepturi consectetur magnam explicabo doloremque saepe maiores officiis! Odio dicta nostrum harum earum? Error veniam culpa mollitia accusantium deserunt dicta perferendis!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium excepturi consectetur magnam explicabo doloremque saepe maiores officiis! Odio dicta nostrum harum earum? Error veniam culpa mollitia accusantium deserunt dicta perferendis!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium excepturi consectetur magnam explicabo doloremque saepe maiores officiis! Odio dicta nostrum harum earum? Error veniam culpa mollitia accusantium deserunt dicta perferendis!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium excepturi consectetur magnam explicabo doloremque saepe maiores officiis! Odio dicta nostrum harum earum? Error veniam culpa mollitia accusantium deserunt dicta perferendis!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium excepturi consectetur magnam explicabo doloremque saepe maiores officiis! Odio dicta nostrum harum earum? Error veniam culpa mollitia accusantium deserunt dicta perferendis!</p>
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
        height: 95%;
    }

    .innersongs::-webkit-scrollbar-track {
        background: var(--bgColor);
        border-radius: 20px;
    }

    .innersongs::-webkit-scrollbar-thumb {
        background-color: var(--complementaryFG); 
        border-radius: 20px; 
    }

    .innersongs {
        scrollbar-width: 5px; 
    }
    .innersongs::-webkit-scrollbar {
        width: 5px;
    }

</style>