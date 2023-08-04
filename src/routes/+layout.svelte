<svelte:head>
    <title>Spoter - DISCover new music</title>
</svelte:head>
<script>
    import '../styles/fontImport.css';
    import '../styles/main.css';
    import Header from "../components/layout/Header.svelte";
    import Footer from "../components/layout/Footer.svelte";
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
        display: grid;
        grid-template-rows: 7% 88% 5%;
        min-height: 100vh;
        max-height: 100vh;
        min-width: 100vw;
        max-width: 100vw;
    }
    main {
        flex:1;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>