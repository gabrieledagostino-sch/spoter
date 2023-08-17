<script>
    import Button from "../../components/shared/Button.svelte";
    import Input from "../../components/shared/Input.svelte";

    export let form;
    
    const fieldError = name => form?.error.find(v => v.name === name);
    
    console.log(form)
    console.log(form?.remember ? 'on' : '')

</script>
<form 
    action="?/login"
    method="post"
    class="
        flex
        flex-col
        items-center
        justify-center
        h-min-full
        gap-5
        p-5
        rounded-xl
        shadow-md
        m-auto
        bg-mainColor
    "
>
    <h1 class="text-bigText font-semibold">Log In</h1>
    <Input lbl="Username: " value={form?.username} type="text" name="username" placeholder="username" error={fieldError('username')?.msg} />
    <Input lbl="Password: " type="password" name="password" placeholder="password" error={fieldError('password')?.msg} />
    <label>
        <input type="checkbox" name="remember" checked={form?.remember? true : false} />
        <span class="text-complementaryFG">Remember me</span>
    </label>
    <Button submit={true} kind="primary" ><span>Log In</span></Button>
    <Button><span>Login with spotify <i class="fab fa-spotify" /></span></Button>
</form>

<style>
    h1 {
        text-shadow: 1px 0px 4px black;
    }
</style>