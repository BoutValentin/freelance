<script>
	import { AVAILABLE_LOCALES, lg_dico, changeLocale, locale } from '/src/utils/locales';
	import ArrowSwitcher from '/src/components/ArrowSwitcher.svelte';
	import { onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Logo from '/src/components/svg/Logo.svelte';
	import Hamburger from '/src/components/svg/Hamburger.svelte';
	import Close from '/src/components/svg/Close.svelte';

	const handleScroll = (e) => {
		console.log(e);
	};

	let route_choice = [];
	let routes = {};
	let routes_revert = {};
	// Subscribe to the lg dico store
	const unsub_lg_dico = lg_dico.subscribe((dic) => {
		// Get only the routes names;
		route_choice = dic['routes'].map((val) => val.name);
		//reduce the root array to create an object of name => path
		routes = dic['routes'].reduce((prevObjet, curr_route) => {
			prevObjet[curr_route.name] = curr_route.path;
			return prevObjet;
		}, {});
		// reduce the root array to create an object of path => name
		routes_revert = dic['routes'].reduce((prevObjet, curr_route) => {
			prevObjet[curr_route.path] = curr_route.name;
			return prevObjet;
		}, {});
	});

	const handleNavigate = (route) => {
		goto(routes[route]);
	};

	// Handle the responsive menu
	let showMenu = false;
	const handleShowMenu = () => (showMenu = true);
	const handleHideMenu = () => (showMenu = false);

	// On Component destroy unsub to the store
	onDestroy(unsub_lg_dico);
</script>

<header on:scroll={handleScroll} class="big-header">
	<ArrowSwitcher
		choices={route_choice}
		callback={handleNavigate}
		currentChoice={routes_revert[$page.path]}
	/>
	<!-- Add Menu slider -->
	<a href="/">
		<div class="title">
			<p>Valentin</p>
			<div class="logo">
				<Logo />
			</div>
			<p>BOUT</p>
		</div>
	</a>
	<ArrowSwitcher
		position="right"
		choices={AVAILABLE_LOCALES.map((l) => l.toLocaleUpperCase())}
		callback={changeLocale}
		currentChoice={$locale.toLocaleUpperCase()}
	/>
	<!-- Add Menu Language -->
</header>

<header class="little-header">
	<div class="hamburger" on:click={handleShowMenu}>
		<Hamburger />
	</div>
	<a href="/">
		<div class="title">
			<p>Valentin</p>
			<div class="logo">
				<Logo />
			</div>
			<p>BOUT</p>
		</div>
	</a>

	{#if showMenu}
		<div class="big-header">
			<div class="header">
				<div class="close" on:click={handleHideMenu}>
					<Close />
				</div>
				<a href="/">
					<div class="title">
						<p>Valentin</p>
						<div class="logo">
							<Logo />
						</div>
						<p>BOUT</p>
					</div>
				</a>
			</div>
			<div class="body">
				<div class="routes">
					{#each route_choice as route}
						<div class="choice">
                            {#if routes_revert[$page.path] === route}
                                <div class="rounded" />
                            {/if}
							<a href={routes[route]}>
								<p>{route}</p>
							</a>
						</div>
					{/each}
				</div>

				<div class="locales">
					{#each AVAILABLE_LOCALES as curr_locale}
						<div class="locale">
                            {#if curr_locale === $locale}
                                <div class="rounded" />
                            {/if}
							<p on:click={() => changeLocale(curr_locale)}>{curr_locale.toLocaleUpperCase()}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</header>
<main>
	<slot />
</main>
<footer />

<style>
	header.little-header {
		display: none;
	}

	header {
		display: flex;
		width: 100%;
		min-width: 100%;
		height: 80px;
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		justify-content: space-between;
		align-items: center;
		background: white;
        z-index: 2;
	}

	header a {
		text-decoration: none;
		color: black;
	}
	header .title {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	header .title .logo {
		height: 50px;
		margin: auto 15px;
	}

	header .title p {
		font-size: 20px;
		letter-spacing: 1px;
		font-weight: 600;
		font-family: 'Bitter', serif;
	}
	main {
		height: 100%;
		width: 100%;
		max-width: 1600px;
		display: flex;
		margin: 80px auto 0;
	}

	@media screen and (max-width: 500px) {
		header.big-header {
			display: none;
		}

		header.little-header,
		.big-header > .header {
			display: grid;
			grid-template-columns: 65px 1fr 65px;
		}

		header .hamburger,
		header .close {
			height: 35px;
			width: 35px;
			margin: 15px;
			cursor: pointer;
			transition: transform 0.3s ease;
		}

		header .hamburger:active,
		header .close:active {
			transform: scale(0.95);
		}

		.big-header {
			position: fixed;
            z-index: 2;
			top: 0;
			right: 0;
			left: 0;
			width: 100%;
			max-width: 100vw;
			background-color: white;
			border-bottom: black 3px solid;
		}

		.big-header > .header {
			height: 80px;
			align-items: center;
		}

		.rounded {
			height: 10px;
			width: 10px;
			background: black;
			border-radius: 50%;
			margin: auto 10px;
		}

		.big-header > .body > .routes {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}

		.big-header > .body > .locales {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-around;
		}

		.big-header .body .locale,
		.big-header .body .choice {
			display: grid;
            grid-template-columns: 30px 100%;
			align-items: center;
		}
        .big-header .body .choice { 
            min-width: 100px;
        }

        .big-header .body .locale > p,
		.big-header .body .choice > a {
            cursor: pointer;
            grid-column: 2 / -1;
            margin: auto;
        }

        .big-header .body .locale > p {
            margin: 15px auto;
        }

	}
</style>
