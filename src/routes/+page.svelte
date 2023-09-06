<script>
    import { onMount } from "svelte";
    import Title from "../components/layout/Title.svelte";
    import Logo from "../components/shared/Logo.svelte";
    import ProfileButton from "../components/shared/ProfileButton.svelte";

    onMount(() => {
        if('serviceWorker' in navigator) {
            navigator.serviceWorker.ready
            .then(()=> {
                if('Notification' in window && Notification.permission === 'default') {
                    Notification.requestPermission()
                }
            })
        }
        
    })
</script>
<svelte:head>
    <title>Spoter - Homepage</title>
</svelte:head>
<div
    class="
        w-full
        min-h-full
        bg-bgColor

        lg:w-1/2
        lg:h-1/2
        lg:mx-auto
        lg:my-auto
        lg:bg-mainColor
        flex
        flex-row
        gap-5
        rounded-3xl
        p-10
    "
>

    <div
        class="
            hidden
            flex-1
            sm:flex
            flex-col
            items-center
            justify-center
            w-full
            h-full
            gap-10
        "
    >
        <Title />
        <p
            class="text-complementaryFG"
        >Spoter is a web app that makes discovering new music easy and straigthforward. Just search for a track, an autor or a genre that you like and it will use spotify APIs to make suggestions. It will show a preview and just by swiping left or right you tell your interest. You can then go in your profile and make a playlist out of those interests.</p>
    </div>
    <div
        class="
            flex-1
            flex
            flex-col
            items-center
            justify-center
            w-full
            h-full
            gap-10
        "
    >
        <Logo --width="25vmin" --height="25vmin" />
        <ProfileButton dialog="true" />
    </div>
</div>