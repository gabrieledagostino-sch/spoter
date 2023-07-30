<script>
    import Header from "../components/Header.svelte";
    import Footer from "../components/Footer.svelte";
</script>
<div class="content">
    <Header />
    <main>
        <slot />
    </main>
    <Footer />
</div>
<style>
    .content {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }
    main {
        flex:1;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>