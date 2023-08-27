<script>
  import Card from "../../components/discoverSong/Card.svelte";

  export let data
  console.log(data)
  
  let audio;

  const playHandle = (url) => {
    audio = new Audio(url)
    audio.play()
    audio.loop()
  }

</script>

<div
  class="
    w-full
  "
>

<Card on:play={() => playHandle(data.song.preview)} img={data.song.image} name={data.song.name} artist={data.song.artists.join(", ")} addInfo={data.song.album} />

</div>