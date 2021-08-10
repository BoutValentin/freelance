<script>
	import { RS } from '$lib/social';
	import ArrowSwitcher from '../ArrowSwitcher.svelte';
	import Arrow from '../svg/Arrow.svelte';
	import RoundedSocial from '/src/components/social/RoundedSocial.svelte';
	import { lg_dico } from '/src/utils/locales';
</script>

<div class="contact">
	<div class="text">
		<p>{$lg_dico['contact']['dont_like_email']}</p>
		<p class="color">{$lg_dico['contact']['contact_me_here']}</p>
	</div>

	<div class="contact-list">
		{#each RS as rs}
			<div class="round-contact">
				<RoundedSocial {...rs} />
			</div>
		{/each}
	</div>
</div>

<style>
	.contact {
		width: 100%;
		max-width: 50%;
	}

    .text {
        text-align: center;
    }

    .text p {
        font-size: 2em;
        padding: 10px 0px;
        margin: 10px auto;
        text-align: center;
        font-weight: 600;
    }

	.contact-list {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		flex-wrap: wrap;
		margin: 90px auto 50px auto;
	}

	.round-contact {
		margin: auto 35px;
	}

	@media (max-width: 850px) {
        .contact {
            max-width: 100%;
            margin-top: 20px;
        }
        .text {
            width: 100%;
        }
        .text p {
            font-size: 1.7em;
        }
		.round-contact {
			margin: 15px;
		}

        .contact-list {
            margin: 10px auto 10px auto;
        }
	}
</style>
