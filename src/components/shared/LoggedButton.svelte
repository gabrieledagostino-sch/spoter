<script>
    import Dialog from "./Dialog.svelte"

    export let username="username"
    export let profileImg = "images/user-128.svg"
    
    let choices = [
        {
            element:"<span>scelta1</span>", 
            isSvelte:false,
            effect:function(){
                console.log("scelta1")
        }},{
            element:"<span>scelta2</span>", 
            isSvelte:false,
            effect:function(){
                console.log("scelta2")
    }},]
</script>

<Dialog {choices}>
    <button
        class="
            bg-complementaryFG
            rounded-2xl
            font-mainFont
            text-mainColor
            px-4
            py-0.5
            cursor-default
            flex
            items-center
            content-center
            gap-2
            text-mediumText
            shadow-black
            shadow-md

        "
    >
        <span>Logged in as <b>{username}</b></span>
        <img 
            class="
                rounded-full 
                border-2
                border-black 
                border-solid 
                w-5 
                aspect-square
            " 
            src="{profileImg}" 
            alt="profileImage" 
        />
    </button>
</Dialog>