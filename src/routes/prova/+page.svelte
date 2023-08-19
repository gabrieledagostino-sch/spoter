<script>
  import LoginButton from '../../components/shared/LoginButton.svelte'

  export let data

  const clickHandler = (event) => {
    console.log('clicked')
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
  <button on:click={clickHandler} >send Request</button>
</div>