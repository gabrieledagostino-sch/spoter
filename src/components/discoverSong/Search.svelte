<script>

    import Dialog from "../shared/Dialog.svelte"
    import Suggestion from "./Suggestion.svelte";
    
    
    export let type = "Similar To";
    export let selected = null;
    export let query;
    
    export const reset = ()=>{choices=[],selected=null}

    let suggestionTimeout;
    let first;

    let choices = [];

    const debouncedRequest = async () => { //search after a timer, if recalled restart timer with new query
        clearInterval(suggestionTimeout)
        first=undefined;
        if(query.length() <= 0) {
            choices = [];
            return; 
        }
        choices = [{
            isSvelte:false,
            element:`Loading ...`,
            effect:null,
        }]
        suggestionTimeout = setTimeout(async ()=>{
            choices = await fetch('/api/search?'+new URLSearchParams({type, query, limit:20}).toString())
                .then(r => r.json())
                .then(arr => {
                    first = arr[0];
                    return arr.map(v =>({
                        isSvelte:true,
                        props:{
                            type,
                            item:v
                        },
                        element:Suggestion,
                        effect:(_, stopShow)=>{
                            selected=v;
                            stopShow()
                }}))})
        },500)
    }

</script>
<label
    class="
        w-full
        p-2
        box-border
        bg-white
        flex
        flex-row
        items-center
        justify-center
    "
>
  <Dialog {choices} >
    <input 
        type="text" 
        name="prova"
        class="
            w-full
            text-bgColor
            focus:outline-none
            bg-transparent
        " 
        placeholder="search..."
        bind:value={query} 
        on:input={debouncedRequest}
        autocomplete="off"
    >
  </Dialog>
  <button type="submit" disabled={first === undefined} on:click={()=>selected=first}><i class="fas fa-search"></i></button>
</label>
{#if selected}
    <div>
        <p>Selected {type=='Similar To'?'Track':type} : {selected.name??selected}</p>
    </div>
{/if}