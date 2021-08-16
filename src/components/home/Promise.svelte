<script>
	import { lg_dico } from '/src/utils/locales';

	import TitleSection from '/src/components/TitleSection.svelte';
import PartTitle from '/src/components/home/PartTitle.svelte';

	const promises = new Array(3).fill(undefined).map((_, i) => i + 1);
</script>

<section class="promise">
	<TitleSection title={$lg_dico['promises']['title']} />
	<div class="main">
		<PartTitle title={$lg_dico['promises']['prim_text']}></PartTitle>

		<ol class="listing">
			{#each promises as promise}
				<div class="item">
					<li>{@html $lg_dico['promises'][`prom_${promise}_title`]}</li>
					<p>{@html $lg_dico['promises'][`prom_${promise}_text`]}</p>
				</div>
			{/each}
		</ol>
	</div>
</section>

<style>
    .main {
        font-size: min(18px, max(3.5vmin, 16px));
    }

    .main .listing {
        margin: 30px auto;
        padding: 15px;
        list-style: decimal inside;
    }

    .main .listing .item {
        font-size: 1em;
    }

    .main .listing .item li {
        font-size: 1.2em;
        font-weight: 600;
        line-height: 2.3em;

    }

    .main .listing .item p {
        padding: 15px;
        margin: 15px auto;
        text-align: justify;
        line-height: 2em;
    }
</style>
