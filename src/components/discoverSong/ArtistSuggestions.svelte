<script>
    export let name;
    export let image;
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
        src={image}
        alt={name}
        width="64px"
        height="64px"
        class="object-scale-down"
    />
    <div class="flex-1 flex justify-center items-start">
        <span>{name}</span>
    </div>
</div>