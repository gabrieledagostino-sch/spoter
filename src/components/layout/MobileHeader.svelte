<script>
    import Dialog from "../shared/Dialog.svelte";
    import Title from "./Title.svelte";
    import ProfileButton from "../shared/ProfileButton.svelte";

    export let username
    export let logged
    
    export let choices = [
        {
            element:ProfileButton,
            effect: undefined,
            isSvelte:true,
        }
    ]
    $: buttonChoices = [{
            element:ProfileButton,
            effect: undefined,
            props: { username, logged },
            isSvelte:true,
        }, ...choices] 
</script>
<header
    class="
        relative
        bg-mainColor 
        text-complementaryFG 
        border-b-complementaryFG 
        border-b-2
        items-center
        justify-center
        text-mediumText
        flex
        flex-row
        p-1
    "
>
    <div class="
        title
    ">
        <Title />
    </div>
    <div 
        class="menu
            absolute
            min-h-full
            right-0
            top-0
            aspect-square
            flex
            justify-center
            items-center
        "
    >
        <Dialog choices={buttonChoices} direction={'left'}>
            <i class="
                fa-solid 
                fa-bars
            "></i>
        </Dialog>    
    </div>
</header>