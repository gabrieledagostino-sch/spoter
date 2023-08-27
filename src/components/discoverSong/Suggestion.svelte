<script>
  import ArtistSuggestions from "./ArtistSuggestions.svelte";
import TrackSuggestion from "./TrackSuggestion.svelte";

    export let type;
    export let item;

</script>
{#if type === 'Similar To'}
    <TrackSuggestion name={item.name} artists={item.artists} img={item.image} album={item.album} />
{:else if type === 'Artist'}
    <ArtistSuggestions name={item.name} image={item.image} />
{:else}
    <span>{item}</span>
{/if}