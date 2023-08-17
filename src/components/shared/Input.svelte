<script>
    export let lbl;
    export let error="";
</script>
<div
    class="flex flex-col w-full"
>
    <label
        class="flex flex-row text-complementaryFG justify-between items-center gap-2 w-full"
    >
        <span clas="flex-1">{lbl}</span>
        <input 
            class="
                box-border
                text-mainColor
                bg-complementaryFG
                rounded-md
                p-0.5
                focus:outline-black
                focus:outline-1
                border-[1px]
            " 
            class:border-red-600={!!error}
            {... $$restProps } 
        />
    </label>
    <span 
        class="
            w-full
            text-center
            text-red-600
            text-smallText
            font-semibold
        "
    >{error}</span>
</div>