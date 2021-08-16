<script>
import { lg_dico } from "/src/utils/locales";
import PartTitle from "/src/components/home/PartTitle.svelte";
import TitleSection from "/src/components/TitleSection.svelte";
import Card from "./Card.svelte";

const DICO_KEY = 'who_i_am';

</script>

<section class="who-i-am">
    <TitleSection title={$lg_dico[DICO_KEY]['title']} />
    <PartTitle title={$lg_dico[DICO_KEY]['prim_text']} />
    <PartTitle title={$lg_dico[DICO_KEY]['questions']} subtitle={$lg_dico[DICO_KEY]['sub_questions']} force_center={true} />
    <div class="card-list">
        <Card title={$lg_dico[DICO_KEY]['fullstack_title']} text={$lg_dico[DICO_KEY]['fullstack_text']} 
        add_class={'other-card-home card-home-right'}/>
        <Card title={$lg_dico[DICO_KEY]['developer_title']} text={$lg_dico[DICO_KEY]['developer_text']} 
        add_class={'center-card-home card-home-left'}/>
        <Card title={$lg_dico[DICO_KEY]['designer_title']} text={$lg_dico[DICO_KEY]['designer_text']} 
        add_class={'other-card-home card-home-left-big'}/>
    </div>
    <div class="last">
        <PartTitle title={$lg_dico[DICO_KEY]['cta']} subtitle={$lg_dico[DICO_KEY]['learn_more']}/>
    </div>
</section>

<style>
    .who-i-am {
        font-size: min(18px, max(3.5vmin, 16px));
    }

    .card-list {
        margin: 20px auto;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: stretch;
        justify-content: center;
    }

    .last {
        margin-bottom: 70px;
    }

    @media (min-width: 1270px) {
        :global(.center-card-home) {
            transform: translateY(-35px);
        }

        :global(.card-home-right) {
            transform: translateY(10px) rotate(-10deg);
        }
        :global(.card-home-left-big) {
            transform: translateY(10px) rotate(10deg);

        }
    }

    @media (max-width: 1271px)  and (min-width: 860px) {
        :global(.card-home-right) {
            transform: rotate(-5deg);
        }
        :global(.card-home-left) {
            transform: rotate(5deg);

        }
    } 

    @media (min-width: 570px) {
		.card-list {
        margin: 70px auto;
    }
	}
</style>