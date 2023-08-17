<script>

  import { fade } from "svelte/transition";

  export let type;

</script>
<div>
    <span class="" in:fade={{duration:200, delay:15}} out:fade={{duration:200}}>
        <input type="text" class=""> <i class="fas fa-search" />
    </span>
</div>