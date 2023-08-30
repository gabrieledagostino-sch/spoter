<script>
  import Button from "../../components/shared/Button.svelte";

</script>
<div
    class="
        flex
        flex-1
        justify-center
        items-center
        flex-col
    "
>
    <h1>You are offline</h1>
    <p>Please make sure you are online and then reload</p>
    <Button kind={"primary"} submit={false} on:click={window.location.href = '/'}><span>Reload <i class="fa-solid fa-rotate-right"></i></span></Button>
</div>