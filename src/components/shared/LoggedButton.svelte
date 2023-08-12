<script>
    import Button from "./Button.svelte";
    import Dialog from "./Dialog.svelte"

    export let username="username"
    export let profileImg = "images/user-128.svg"
    export let dialog = false;
    
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

{#if dialog}
<Dialog {choices}>
    <Button kind={"secondary"} cursor={"default"} >
        <div
            class="
                cursor-default
                flex
                items-center
                content-center
                gap-2
                text-mediumText
            "
        >
            <span>Logged in as <b>{username}</b></span>
            <img 
                src="{profileImg}" 
                alt="profile"
                class= "
                    rounded-full
                    border-2
                    border-black
                    w-5
                    aspect-square
                " 
            />
        </div>
    </Button>
</Dialog>
{:else}
    <Button kind={"secondary"} cursor={"default"} >
        <div
            class="
                cursor-default
                flex
                items-center
                content-center
                gap-2
                text-mediumText
            "
        >
            <span>Logged in as <b>{username}</b></span>
            <img 
                src="{profileImg}" 
                alt="profile"
                class= "
                    rounded-full
                    border-2
                    border-black
                    w-5
                    aspect-square
                " 
            />
        </div>
    </Button>
{/if}