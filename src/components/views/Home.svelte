<script>
	import MeDesk from '/src/components/svg/MeDesk.svelte';
	import { onDestroy } from 'svelte';

	import { lg_dico } from '/src/utils/locales';
	import { locale } from '/src/utils/locales';
import WhoIAm from '/src/components/home/WhoIAm.svelte';
import Promise from '/src/components/home/Promise.svelte';
import Projects from '/src/components/home/Projects.svelte';
import Last from '/src/components/home/Last.svelte';

	// Declare the dico var use to get the languages content
	let dico;

	// Subscribe to the lg_dico store (the one who give us text to our app)
	const unsub_lg_dico = lg_dico.subscribe((dic) => {
		// Using the main key for this components and assign to the dico var
		dico = dic['main'];
	});

	// On the component destroy we unsub from the store
	onDestroy(unsub_lg_dico);
</script>

<div class="home-view">

    <section class="home">
        <div class="text">
            <div class="title-container">
                <p class="title">{@html dico['title']}</p>
                <p class="subtitle">{dico['subtitle']}</p>
            </div>
            <div class="link-container">
                <a class="link" href="/contact">
                    <p>{dico['cta']}</p>
                </a>
            </div>
        </div>
        
        <div class="svg">
            <MeDesk />
        </div>
    </section>
    <WhoIAm />
    <Promise />
<!--     <Projects />
 -->    <Last />
</div>

<style>
    .home-view {
        display: flex;
        flex-direction: column;
        padding: 0px 20px;
        max-width: calc(100vw - 40px);
    }

    .home {
        min-height: calc(100vh - 80px);
    }

    section {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding: 15px;
    }

    section > .text {
        min-width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 60px;
    }

    section > .svg {
        max-width: 550px;
        width: 50%;
    }

    section > .text > .title-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    section > .text > .title-container > p.title {
        /* TODO REPLACE ME */
        font-size: 9vmin;
        text-align: center;
        font-family: "Bitter", serif;
        font-weight: 500;
        letter-spacing: 1px;
        margin-bottom: 0;
        margin-top: auto;
    }

    section > .text > .title-container > p.subtitle {
        /* TODO REPLACE ME */
        font-size: 5vmin;
        text-align: center;
        font-weight: 500;
        letter-spacing: 1px;
        margin-top: 0.6em;
        margin-bottom: 1.5em;
    }

    section > .text > .link-container > a.link {
       text-decoration: underline;
       color: rgb(204, 41, 54);
    }

    section > .text > .link-container > a.link > p{
        /* TODO REPLACE ME */
        font-size: 3.5vmin;
        text-align: center;
        font-weight: 600;
        letter-spacing: 1px;
    }

    @media screen and (max-width: 650px) {
        section {
            flex-direction: column;
            align-items: center;
            justify-content: start;
        }

        section > .text {
            max-width: 100%;
            margin: min(20%, 60px) auto;
        }

        section > .svg {
            max-width: 100%;
            width: 100%;
        }
    }
</style>