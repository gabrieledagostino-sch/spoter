<script>
    import Title from "../components/layout/Title.svelte";
    import Logo from "../components/shared/Logo.svelte";
    import ProfileButton from "../components/shared/ProfileButton.svelte";
</script>
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
        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum laudantium ratione quisquam. Dignissimos laboriosam iste voluptatum mollitia quidem non dolorem, vel placeat ut, cum enim, ea tenetur totam optio? Blanditiis?</p>
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