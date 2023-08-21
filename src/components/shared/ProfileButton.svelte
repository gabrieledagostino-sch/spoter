<script>
    import LoggedButton from "./LoggedButton.svelte";
    import LoginButton from "./LoginButton.svelte";

    export let dialog = false;
    export let choices;
    export let logged = false;
    export let username = "username"
</script>

{#if logged}
    <LoggedButton {dialog} {username} {choices} />
{:else}
    <LoginButton />
{/if}