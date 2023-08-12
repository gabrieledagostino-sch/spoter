<script>
  import Logo from "../shared/Logo.svelte";
  import ProfileButton from "../shared/ProfileButton.svelte";
  import Title from "./Title.svelte";

</script>
<header 
    class="
        bg-mainColor 
        text-complementaryFG 
        border-b-complementaryFG 
        border-b-2
        grid
        grid-cols-3
        items-center
        justify-evenly 
        text-mediumText
        p-1
        "
>
    <div >
        <Logo --width="2rem" --height="2rem" clickable={true} />
    </div>
    <Title />
    <div 
        class="
            flex
            justify-end
            mr-4
        "
    >
        <ProfileButton dialog="true" />
    </div>
</header>