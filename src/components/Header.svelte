<script>
    import Logo from "./Logo.svelte";
    import ProfileButton from "./ProfileButton.svelte";
</script>

<header>
    <div class="logo">
        <Logo --width="32px" --height="32px" clickable={true} href={"/"} hLabel={"Homepage"}/>
    </div>
    <!-- <div class="discoverButton">
        <button>discover</button>
    </div> -->
    <div class="title">
        <p>Spoter</p>
    </div>
    <div class="profileButton">
        <ProfileButton />
    </div>
</header>

<style>
    header {
        background-color: var(--mainColor);
        color: var(--complementaryFG);
        margin: 0px;
        padding: 0px;
        border-bottom: 1px solid var(--complementary);
        font-size: var(--smallText); 

        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;
        justify-content: space-between;
    }
    .profileButton {
        margin-right: 10px;
    }
    .title{
        width: 100%;
        text-align: center;
        color: var(--fg);
    }
    p{
        margin:0px 0px 0px 100px;
        padding: 2px 0px;
        font-size: var(--mediumText);
        font-family: Arial, Helvetica, sans-serif;
        font-weight: 600;
        /* font-family: Georgia, serif;   */
        /* font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif, serif;   */
        /* font-family: Impact, sans-serif; */

        /* text-shadow: 2px 2px 3px rgba(255,255,255,0.2); */
        text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.6);
        
    }
</style>