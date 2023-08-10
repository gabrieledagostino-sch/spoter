<script>

</script>

<button
    class="
        hover:scale-110
        duration-100

        bg-fg
        rounded-2xl
        px-4
        py-0.5

        flex
        items-center
        justify-center
        gap-2
        shadow-black
        shadow-2xl
        text-mainColor
        font-mainFont
    "
    on:click={()=>console.log("login")}
>
    <span>Log in with <b>Spotify</b></span>
    <i class="fab fa-spotify"></i>
</button>