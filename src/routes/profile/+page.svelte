<script>
    import PlaylistCreation from "../../components/profile/PlaylistCreation.svelte";
  import Profile from "../../components/profile/profile.svelte";


</script>

<div 
    class="
        w-full
        min-h-full
        max-h-full
        bg-bgColor
        overflow-hidden
        grid
        grid-flow-row
        grid-rows-[25% 75%]
        md:flex
        md:flex-row
        lg:gap-10
        lg:p-10

    "
>
    <Profile />
    <PlaylistCreation />
</div>

