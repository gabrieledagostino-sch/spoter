<script>
    import PlaylistCreation from "../../components/PlaylistCreation.svelte";
    import Profile from "../../components/Profile.svelte";

</script>

<div class="content">
    <PlaylistCreation />
    <Profile />
</div>


<style>
    .content {
        width: 95%;
        height: 80vh;
        display: grid;
        grid-template-columns: 0.67fr 0.33fr;
        gap : 20px;
    }
</style>