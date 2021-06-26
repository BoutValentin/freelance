<script>
    import Arrow from "./svg/Arrow.svelte";

    // Avaible position for the arrow components
    const POSITION_CHOICE = ['right', 'left'];
    // Should be right or left
    export let position = 'left';
    // Testing value given in the position props
    if (!POSITION_CHOICE.includes(position)) throw new Error(`Position should be : ${POSITION_CHOICE.join(' or ')}`);
    // Choices which will be listed
    export let choices = [];
    // Testing value given in the choices props
    if (!Array.isArray(choices)) throw new Error(`choices props should be an array of string`);
    // The callback to call on click on a choice
    export let callback = () =>{};
    // Testing value given in the callback props
    if (!callback || typeof callback !== 'function') throw new Error(`callback props should be define and type of function`);
    // Store the currentChoice
    export let currentChoice = choices[0];
    // Boolean enabling the seeChoice droplist
    let seeChoice = false;

    const handleMainClick = () => {
        seeChoice = !seeChoice;
    }

    const handleClick = (choice, event, pos) => {
        currentChoice = choice;
        seeChoice = false;
        callback(choice, event, pos);   
    }
</script>

<div class="arrow-switcher">
    <div class={`content ${position}`}>
        <div class={`main ${position}`}>
            <div class={`arrow ${position} ${seeChoice ? 'down' : ''}`} on:click={handleMainClick}>
                <Arrow />
            </div>
            <p class="light-bold">{currentChoice}</p>
        </div>
        {#if seeChoice}
            <div class="choices">
                {#each choices as choice, idx (idx)} 
                    {#if choice !== currentChoice}
                    <div class="choice">
                        <div class="litle-rounded"></div>
                        <p on:click={(e) => handleClick(choice, e, idx)}>{choice}</p>
                    </div>
                    {/if}
                {/each}
            </div>
        {/if}
    </div>
    <div class="hidden-content">
        <div class={`main ${position}`}>
            <div class={`arrow ${position} ${seeChoice ? 'down' : ''}`} on:click={handleMainClick}>
                <Arrow />
            </div>
            <p>{currentChoice}</p>
        </div>
    </div>
</div>

<style>
    .arrow-switcher {
        position: relative;
        display: flex;
        flex-direction: column;
    }

    .arrow-switcher > .hidden-content {
        visibility: hidden;
    }

    .arrow-switcher > .content {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
    }

    .arrow-switcher > .content.left {
        right: unset;
        left: 0;
    }

    .arrow-switcher > .content > .main, .arrow-switcher > .hidden-content > .main {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    
    .arrow-switcher > .content > .main.right,  .arrow-switcher > .hidden-content > .main.right {
        flex-direction: row-reverse;
    }

    .arrow-switcher > .content > .main > .arrow, .arrow-switcher > .hidden-content > .main > .arrow {
        height: 35px;
        width: 35px;
        margin: auto 15px;
        cursor: pointer;
        transition: transform 0.3s ease;
    }

    .arrow-switcher > .content > .main.right > .arrow.right, .arrow-switcher > .hidden-content > .main.right > .arrow.right {
        transform: rotate(180deg);
    }

    .arrow-switcher > .content > .choices, .arrow-switcher > .hidden-content > .choices {
    }

    .arrow-switcher > .content > .choices > .choice > p{
        cursor: pointer;
    }

    .arrow-switcher > .content > .choices > .choice {
        display: flex;
        align-items: center;
        width: 100%;
    }

    .arrow-switcher > .content.right > .choices > .choice {
        flex-direction: row-reverse;
        margin: auto;
    }

    .arrow-switcher > .content.left > .choices > .choice > p {
        text-align: end;
        align-self: flex-end;
        margin-right: 0;
    }

    .arrow-switcher > .content > .choices > .choice > .litle-rounded {
        height: 6px;
        border-radius: 50px;
        width: 25px;
        background: black;
        margin: auto 20px;
    }

    .down {
        transform: rotate(90deg);
    }

    .arrow-switcher > .content > .main.right > .arrow.right.down, .arrow-switcher > .hidden-content > .main.right > .arrow.right.down {
        transform: rotate(90deg);
    }
</style>
