<script>
    import Dialog from "../shared/Dialog.svelte";
    import Title from "./Title.svelte";
    import ProfileButton from "../shared/ProfileButton.svelte";
    
    let choices = [
        {
            element:ProfileButton,
            effect: undefined,
            isSvelte:true,
        },
        {
            element:"<span>scelta1</span>", 
            isSvelte:false,
            effect:function(){
                console.log("scelta1")
        }},
        {
            isSvelte:false,
            element:"<span>scelta2</span>", 
            effect:function(){
                console.log("scelta2")
    }},]
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
            right-0
            top-0
            translate-y-3/4
        "
    >
        <Dialog {choices} direction={'left'}>
            <i class="
                fa-solid 
                fa-bars
                mx-4
            "></i>
        </Dialog>    
    </div>
</header>