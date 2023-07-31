<script>
    import LoggedInButton from "./LoggedInButton.svelte";
    import LoginButton from "./LoginButton.svelte";
    export let loggedIn = false;
</script>

{#if loggedIn}
    <LoggedInButton />
{:else}
    <LoginButton />
{/if}
