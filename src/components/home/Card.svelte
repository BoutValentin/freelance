<script>
	export let title = '';
	export let text = '';
	export let add_class = '';
</script>

<div class={`card ${add_class}`}>
	<div class="title bold">
		<p>{title}</p>
	</div>
	<div class="content">
		<p>{text}</p>
	</div>
</div>

<style>
	.card {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-width: 250px;
		max-width: min(calc(100vw - 20px), 330px);
		background-color: var(--main-font-color);
		color: var(--main-bg-color);
		border-radius: 12px;
		font-size: min(18px, max(3.5vmin, 16px));
		padding: 10px;
		margin: 15px 10px;
	}

	.title {
		padding: 0px;
		font-size: 1.3em;
		margin: 10px;
	}

	.title p {
		margin: 0;
		padding: 0;
	}

	.content {
		font-size: 1em;
		line-height: 1.5em;
		text-align: justify;
		padding: 10px;
	}

	@media (min-width: 570px) {
		.card {
            margin: 15px 30px;
		}
	}
</style>
