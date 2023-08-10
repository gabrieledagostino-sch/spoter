<script>
    import LoggedButton from "./LoggedButton.svelte";
    import LoginButton from "./LoginButton.svelte";

    let logged = false;
</script>

{#if logged}
    <LoggedButton />
{:else}
    <LoginButton />
{/if}