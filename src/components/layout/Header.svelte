<script>
    import DesktopHeader from "./DesktopHeader.svelte";
    import MobileHeader from "./MobileHeader.svelte";

    export let logged
    export let username
    export let choices = [
        {
            isSvelte:false,
            element:`
                <form method="get" action="/profile"><button>profile</button></form>      
            `,
            effect:null
        },
        {
            isSvelte:false,
            element:`
                <form method="get" action="/api/spotify/logout"><button>logout</button></form>
            `,
            effect:null
        }
    ]
</script>
<div class="generalProps">
    <div class="max-md:hidden">
        <DesktopHeader {logged} {username} {choices} />
    </div>
    <div class="md:hidden">
        <MobileHeader {logged} {username} {choices} />
    </div>
</div>
