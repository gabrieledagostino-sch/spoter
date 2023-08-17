<script>
    import Button from "../../components/shared/Button.svelte";
    import Input from "../../components/shared/Input.svelte";

    export let form;
    
    const fieldError = name => form?.error?.find(v => v.name === name);

</script>
<form 
    action="?/register"
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
    <h1 class="text-bigText font-semibold">Register</h1>
    <Input lbl="Email: " value={form?.email} type="email" name="email" placeholder="email" error={fieldError('email')?.msg} />
    <Input lbl="Username: " value={form?.username} type="text" name="username" placeholder="username" error={fieldError('username')?.msg} />
    <Input lbl="Password: " type="password" name="password" placeholder="password" error={fieldError('password')?.msg} />
    <Input lbl="Confirm Password: " type="password" name="confirm" placeholder="confirm password" error={fieldError('confirm')?.msg} />
    <Button submit={true} kind="primary" ><span>Register</span></Button>
    <Button><span>Login with spotify <i class="fab fa-spotify" /></span></Button>
</form>

<style>
    h1 {
        text-shadow: 1px 0px 4px black;
    }
</style>