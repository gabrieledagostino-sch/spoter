<script>
    export let img;
    export let name;
    export let album;
    export let artists = [];
</script>
<div
    class="
        min-w-full
        flex
        flex-row
        justify-start
        box-border
        gap-2
    "
>
    <img 
        src={img}
        alt={name}
        width="64px"
        height="64px"
        class="
            object-scale-down
        "
    />
    <div
        class="
            flex-1
            flex
            flex-col
            justify-center
            items-start
        "
    >
        <span><span>Name : </span><span>{name}</span></span>
        <span class="text-complementary"><span>Album :</span><span>{album}</span></span>
        <span class="text-complementary"><span>Artists :</span><span>{artists.join(", ")}</span></span>
    </div>
</div>