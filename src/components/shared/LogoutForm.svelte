<script>
  import { onMount } from "svelte";

    
    export let accessCookie
    export let refreshCookie
    let hiddenForm;

    onMount(() => {
        if(!accessCookie && !refreshCookie) return;
        fetch('/api/auth/logout', {
            method:"get",
            headers:{
                "content-type":"application/json",
                "Authorization":accessCookie
            }
        })
        .then(r => {
            if(r.status === 401) throw new Error()
            return r.json()
        })
        .catch(_ => fetch('/api/auth/refresh', {
                method:"get",
                headers:{
                    "content-type":"application/json",
                    "Authorization":refreshCookie
                }
            }).then(r => r.json())
            .then(json => fetch('/api/auth/logout', {
                method:"get",
                headers:{
                    "content-type":"application/json",
                    "Authorization":json.accessToken
                }
            })
        ))
        .finally(() => hiddenForm.submit())
    })
</script>

<form action="?/deleteCookies" class="hidden" method="post" bind:this={hiddenForm}></form>