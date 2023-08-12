<script>
  import DesktopHeader from "./DesktopHeader.svelte";
  import MobileHeader from "./MobileHeader.svelte";

</script>
<div class="generalProps">
    <div class="max-md:hidden">
        <DesktopHeader />
    </div>
    <div class="md:hidden">
        <MobileHeader />
    </div>
</div>
