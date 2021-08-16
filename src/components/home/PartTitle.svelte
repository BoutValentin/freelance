<script>
	export let title = '';
	export let subtitle;
    export let force_center = false;

    function create_class() {
        return `${subtitle ? 'has_subtitle' : ''} ${force_center ? 'force_center' : ''}`;
    }
</script>

<p class={create_class()}>{@html title}</p>
{#if subtitle}
	<p class="subtitle">{@html subtitle}</p>
{/if}

<style>
	p {
		font-size: 1.3em;
		line-height: 2.3em;

		text-align: justify;
		margin: 15px auto;
		font-weight: 600;
		padding: 15px;
	}

    p.force_center {
        text-align: center;
    }

	p.has_subtitle {
		padding-bottom: 0px;
		margin-bottom: 0px;
	}

	.subtitle {
		font-size: 0.9em;
		line-height: 1.7em;

		text-align: center;
		margin: 2px auto;
		font-weight: normal;
		padding: 5px;
	}

	@media (min-width: 570px) {
		p {
			text-align: center;
		}
	}
</style>
