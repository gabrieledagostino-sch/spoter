<script>
    import LoggedButton from "./LoggedButton.svelte";
    import LoginButton from "./LoginButton.svelte";

    export let dialog = false;

    let logged = false;
</script>

{#if logged}
    <LoggedButton {dialog} />
{:else}
    <LoginButton />
{/if}