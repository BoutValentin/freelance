<script>
import { lg_dico } from "/src/utils/locales";


    let routes = [];
    $: {
       routes = $lg_dico['routes']
    }
</script>

<div class='border-top'></div>
<footer class="footer">
	<div class="me">
		<img src="/images/Me.svg" alt="me" />
		<p>{@html $lg_dico['footer']['mainText']}</p>
	</div>
	<div class="licence">
		<img src="/images/iuristus.png" alt="iuristus logo" />
		<p>{$lg_dico['footer']['licence']}&nbsp;<a rel="external" href="https://iuristus.com" target="_blank"> Iuristus 0</a></p>
	</div>
	<div class="links">
        {#each routes as route }
        <p><a href={route.path}>{route.name}</a> |&nbsp;</p>
        {/each}
		<p>
			<a rel="external" href="https://gitlab.com/BoutValentin/freelance-website" target="_blank"
				>Gitlab Repositories</a
			>
		</p>
	</div>
</footer>

<style>
    .border-top {
        display: block;
        width: 95%;
        margin: 0 auto;
        margin-top: 60px;
        min-height: 5px;
        border-radius: 15px;
        height: 5px;
        background-color: var(--main-font-color);
    }
	footer {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 18px;
		padding-top: 15px;
		width: 100%;
		background-color: var(--main-bg-color);
		color: var(--main-font-color);
		border-radius: 15px 15px 0 0;
        text-align: center;
	}

	.me,
	.licence,
	.links {
        font-weight: 500;
        padding: 0 15px;
		margin: 15px auto;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	:global(.me a),
	.licence a,
	.links a,
	:global(a:visited),
	.licence a:visited,
	.links a:visited {
		color: var(--main-font-color);
	}

	:global(.me a:hover),
	.licence a:hover,
	.links a:hover,
	:global(.me a:visited:hover),
	.licence a:visited:hover,
	.links a:visited:hover {
		color: var(--main-accent-color-1);
	}

	:global(.me a),:global(.me a:visited) {
        text-decoration: none;
        font-weight: 600;
		color: var(--main-accent-color-1);
	}

	.licence a,
	.licence a:visited,
	.licence a:hover,
	.licence a:visited:hover {
        text-decoration: none;
        font-weight: 600;
		color: var(--main-accent-color-2);
	}

	.me img {
		height: 80px;
		margin: auto 2px;
	}

	.licence img {
		height: 50px;
		margin: auto 15px;
	}

	.links {
		flex-wrap: wrap;
	}
</style>
