<script>
	export let title = '';
</script>

<div class="title">
	<div class="round" />
	<h2>{title}</h2>
</div>

<style>
    .title {
        font-size: min(25px, max(9vmin, 18px));
        display: flex;
        align-items: center;
    }

    .round {
        height: 20px;
        width: 20px;
        flex-shrink: 0;
        border-radius: 50%;
        border: 4px solid var(--main-font-color);
        margin: auto 15px;
    }

    h2 {
        text-transform: uppercase;
        font-size: 1em;
    }
</style>
