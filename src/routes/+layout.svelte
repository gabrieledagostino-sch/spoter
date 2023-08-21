<script>
  import "../app.postcss";
  import Footer from "../components/layout/Footer.svelte";
  import Header from "../components/layout/Header.svelte";

  export let data;
</script>

<div class="min-h-screen max-h-screen min-w-screen max-w-screen flex flex-col">
    <Header logged={data.logged} username={data.username} />
    <main class="flex-grow flex justify-stretch items-stretch overflow-hidden">
        <slot />
    </main>
    <Footer />
</div>
