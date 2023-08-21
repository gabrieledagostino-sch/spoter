<script>
  import LoginButton from '../../components/shared/LoginButton.svelte'
  import { goto } from "$app/navigation";

  export let data
  console.log(data)

  const clickHandler = (event) => {
    goto('/api/spotify/login')
  }
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
  <div>
    {#each Object.entries(data.user) as entry}
      <div>{entry}</div>
    {/each}
  </div>
</div>