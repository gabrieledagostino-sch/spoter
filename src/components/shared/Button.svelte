<script>
    import { createEventDispatcher } from "svelte";

    export let label = "";
    export let kind = "secondary";
    export let cursor = "pointer"
    export let submit = false;
    let lblColor = kind === "primary"? 'fg' : kind === 'secondary' ? 'fg' : 'complementaryFG';
    let bgColor = kind === "primary" ? 'fg' : kind === 'secondary' ? 'complementaryFG' : 'bgColor';
    let color = kind === "primary"? 'mainColor' : kind==='secondary'? 'mainColor' : 'complementaryFG';

    const dispatch = createEventDispatcher();
</script>
<label>
    <span
        style:color={`var(--${lblColor})`}
    >{label}</span>
    <button
        class="
            px-4
            py-1
            rounded-xl
            shadow-md
            active:opacity-20
            hover:scale-110
            duration-200
        "
        type="{submit?"submit":""}"
        style:color={`var(--${color})`}
        style:background-color={`var(--${bgColor})`}
        style:cursor={cursor}
        on:click={ev => {
            if(!submit) ev.preventDefault()
            dispatch('click')
        }}
    >
    <slot />
</button>
</label>