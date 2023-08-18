<script>
  import Search from "../../components/discoverSong/Search.svelte";

  export let data;
  console.log(data.firstSong)

</script>
<div
    class="
        flex
        flex-col
        w-full
        h-full
        items-center
        justify-evenly
        gap-10
    "
>

    <p>
        {
            data.firstSong.preview_url
        }
    </p>
    <audio controls >
        <source src={data.firstSong.preview_url} />

    </audio>
</div>