<script>
    import MainCard from "../components/main/MainCard.svelte";
</script>

<div class="content">
    <MainCard />
</div>

<style>
    .content {
        margin: 100px;
        border-radius: 10px;
        border:1px black;
        padding: 10px;
        width: auto;
        height: auto;
        background-color: var(--mainColor);
        color: var(--complementaryFG);
    }
</style>