<script>
    import { page } from "$app/stores";
</script>

<div
    class="
        flex
        flex-1
        justify-center
        items-center
        flex-col
    "
>
    <h1>{$page.status} {$page.error.message}</h1>
    <span class="text-6xl">
        <i class="fas fa-exclamation-triangle"></i>
    </span>
</div>