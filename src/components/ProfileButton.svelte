<script>
    import LoginButton from "./LoginButton.svelte";
    export let loggedIn = false;
</script>

{#if loggedIn}
     <!-- will be profile button -->
{:else}
    <LoginButton />
{/if}

<style>

</style>