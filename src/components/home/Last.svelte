<script>
import { lg_dico } from "/src/utils/locales";
import PartTitle from "/src/components/home/PartTitle.svelte";
import { SKILLS } from "$lib/skills";
import RoundedSocial from "/src/components/social/RoundedSocial.svelte";
import { onMount } from "svelte";

const DICO_KEY = "last";

let ref;

onMount(()=> {
    const root = document.documentElement;
    ref.style.setProperty('--trans-x', `${ref.scrollWidth + 200}px`);
    ref.style.setProperty('--trans--x', `-${ref.scrollWidth + 200}px`);

})

</script>

<section class="last">
    <p class="title">{$lg_dico[DICO_KEY]['title']}</p>
    <p class="title bigger">{@html $lg_dico[DICO_KEY]['contact']} </p>

    <PartTitle title={$lg_dico[DICO_KEY]['tools']} />

    <div class="skills" bind:this={ref}>
        {#each SKILLS as skill,i }
            <div class={`skill p${SKILLS.length - i}`} pos={`${SKILLS.length - i}`}>
                <RoundedSocial {...skill} />
            </div>
        {/each}
    </div>
</section>

<style>
    .last {
        font-size: min(18px, max(3.5vmin, 16px));
    }
	p.title {
		font-size: 1.9em;
		line-height: 1/7em;

		text-align: center;
		margin: 15px auto;
		font-weight: 600;
		padding: 15px;
        margin: 0;
	}
    p.bigger {
        margin: 1.5em auto;
        font-size: 2.5em;
    }

    .skills {/* 
        --trans-x: 1000%;
        --trans--x: -1000%; */
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        max-width: 90%;
        margin: 0 auto;
    }

    .skill {            
        margin: 30px;
/*         animation:  15s linear 0s infinite running move;
 */    }

    .skill[pos="0"] {
        animation-delay: 0s;
    }

    .skill[pos="1"] {
        animation-delay: 1s;
    }

    .skill[pos="2"] {
        animation-delay: 2s;
    }

    .skill[pos="3"] {
        animation-delay: 3s;
    }

    .skill[pos="4"] {
        animation-delay: 4s;
    }

    .skill[pos="5"] {
        animation-delay: 5s;
    }

    .skill[pos="6"] {
        animation-delay: 6s;
    }

    .skill[pos="7"] {
        animation-delay: 7s;
    }

    .skill[pos="8"] {
        animation-delay: 8s;
    }

    .skill[pos="9"] {
        animation-delay: 9s;
    }

    @keyframes move {
        0% {
            opacity: 1;
            transform: translateX(0%);
        }
        48% {
            opacity: 1;
            transform: translateX(var( --trans-x));

        }
        49% {
            opacity: 0;
            transform: translateX(var( --trans-x));

        }
        50% {
            opacity: 0;
            transform: translateX(var( --trans--x));
        }
        51% {
            opacity: 1;
            transform: translateX(var( --trans--x));
        }
        100% {
            opacity: 1;
            transform: translateX(0%);
        }
    }

	@media (min-width: 570px) {
		p.title {
			text-align: center;
		}
	}
</style>