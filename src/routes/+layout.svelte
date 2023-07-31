<svelte:head>
    <title>Spoter - DISCover new music</title>
    <!-- <link rel="stylesheet" href="styles/fontImport.css" /> -->
    <!-- <link rel="stylesheet" href="styles/main.css" /> -->
</svelte:head>
<script>
    import '../styles/fontImport.css';
    import '../styles/main.css';
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