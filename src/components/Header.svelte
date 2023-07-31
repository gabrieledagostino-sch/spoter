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
        <ProfileButton loggedIn={false} /> <!-- TODO: login functionality -->
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

        display: flex;
        grid-template-columns: 1fr 1fr 1f;
        align-items: center;
        justify-content: center;
    }
    .profileButton {
        margin-right: 10px;
        display: flex;
        justify-content: right;
    }
    .logo, .profileButton, .title {
        flex:1;
    }
    .title{
        width: 100%;
        text-align: center;
        color: var(--fg);
    }
    p{
        margin:0px;
        padding: 2px 0px;
        font-size: var(--mediumText);
        font-family: var(--logoFont);

        text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.6);
        
    }
</style>