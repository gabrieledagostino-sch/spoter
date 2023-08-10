<script>
    import Dialog from "../shared/Dialog.svelte";
    import ProfileButton from "../shared/ProfileButton.svelte";
    import Title from "./Title.svelte";
    
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
        bg-mainColor 
        text-complementaryFG 
        border-b-complementaryFG 
        border-b-2
        items-center
        justify-end
        text-mediumText
        flex
        flex-row
        p-1
        pb-2
    "
>
    <div class="
        title 
        absolute top-0 left-1/2 -translate-x-1/2
    ">
        <Title />
    </div>
    <Dialog {choices} direction={'left'}>
        <i class="
            fa-solid 
            fa-bars
            flex
            justify-end
            mx-2
        "></i>
    </Dialog>
    
</header>