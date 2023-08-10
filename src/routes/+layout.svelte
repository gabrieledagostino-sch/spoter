<script>
  import "../app.postcss";
  import Footer from "../components/layout/Footer.svelte";
  import Header from "../components/layout/Header.svelte";
</script>

<div class="h-screen w-screen flex flex-col">
    <Header />
    <main class="flex-1 flex justify-center items-center">
        <slot />
    </main>
    <Footer />
</div>
