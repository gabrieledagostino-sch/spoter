<script>
  import Button from "./Button.svelte";


</script>

<form action="api/spotify/login" method="get">
    <Button kind="primary" submit={true}>
        <div
            class="
                flex
                items-center
                justify-center
                gap-2
            "
        >
            <span>Log in with <b>Spotify</b></span>
            <i class="fab fa-spotify" />
        </div>
    </Button>
</form>
