<script>
	import { UserEmail } from '/src/utils/mailvalidator';
	import { locale } from '/src/utils/locales';
import { lg_dico } from '/src/utils/locales';
import { ERROR_MESSAGES } from '/src/utils/mailvalidator';


    const FAILED = 'failed';
    const SUCCESS = 'sucess';

	let user = new UserEmail();

	let error_message = [];

    let is_sending = false;
    let status = null;

    let ref_form;

    const go_to_bind = () => {
        window.scrollTo(ref_form.offsetTop, 0);
    }

	const handle_submit_value = async (event) => {
		event.preventDefault();
        is_sending = true;
        status = null;
		if (user.as_empty_value()) {
            error_message = [...user.retrieve_error_message()];
            go_to_bind();
            return;
        }
		if (user.check_honeypot()) {
            return;
        };
		error_message = [ ...user.retrieve_error_message(), ...user.check_email_error() ];
		if (error_message.length > 0) {
            go_to_bind();
            return;
        };
        go_to_bind();
		const rep = await fetch('/api/mailer', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: user.get_user_json_stringify($locale)
		});
        is_sending = false;
		if (!rep.ok) {
			error_message = [ ...error_message, 'mailer_error' ];
            status = FAILED
		} else {
            status = true;
            status = SUCCESS;
        }
		const rep_obj = await rep.json();
		error_message = [...rep_obj.error];
        if (error_message.length <= 0) {
            user = new UserEmail();
        }
	};
</script>

<div class="contact-container">
<div class="contact" bind:this={ref_form}>
    <h4 class="title">{$lg_dico['all']['contact_me']}</h4>
    {#if is_sending}
    <div class="sending">
        <p>{$lg_dico['email']['sending']}</p>
    </div>
{/if}
    {#if status === SUCCESS && !is_sending}
        <div class="success">
            <p>{$lg_dico['email']['success']}</p>
        </div>
    {/if}
    {#if error_message.length > 0}
	<div class="error">
        <ul>
		{#each error_message as e_msg}
			<li>{$lg_dico['error'][e_msg.toLocaleLowerCase()]}</li>
		{/each}
        </ul>
	</div>
    {/if}
	<div class="form">
		<form on:submit={handle_submit_value}>
			<div class="form-row name">
				<label for="name">{$lg_dico['email']['name']}*</label>
				<input
					type="text"
					name="name"
					id="name"
					placeholder={$lg_dico['email']['name'].substring(0, $lg_dico['email']['name'].length - 1)}
					bind:value={user.name}
					required
				/>
			</div>
			<div class="form-row email">
				<label for="email">{$lg_dico['email']['email']}*</label>
				<input
					type="email"
					name="email"
					id="email"
					placeholder={$lg_dico['email']['email'].substring(0, $lg_dico['email']['email'].length - 1)}
					bind:value={user.email}
					required
				/>
			</div>
			<div class="form-row subject">
				<label for="subject">{$lg_dico['email']['subject']}*</label>
				<input
					type="text"
					name="subject"
					id="subject"
					placeholder={$lg_dico['email']['subject'].substring(0, $lg_dico['email']['subject'].length - 1)}
					bind:value={user.subject}
					required
				/>
			</div>
			<div class="form-row content">
				<label for="content">{$lg_dico['email']['email_content']}*</label>
				<textarea id="content" name="content" bind:value={user.content} placeholder={$lg_dico['email']['email_content'].substring(0, $lg_dico['email']['email_content'].length - 1)} required />
			</div>
			<div class="form-row h">
				<label for="nh">NH:</label>
				<input type="text" name="nh" if="nh" placeholder="nh" bind:value={user.nh} />
			</div>
			<div class="form-row submit">
				<input type="submit" value={$lg_dico['email']['submit']} />
			</div>
		</form>
	</div>
</div>
</div>

<style>

    .error, .success, .sending {
        background-color: #ffffff;
        padding: 2em;
        border-radius: 15px;
        color: #cc2936
    }

    .sending {
        color: var(--main-font-color);
    }

    .success {
        color: #6ead44;
    }

    .success p {
        margin: 0;
        text-align: center;
        padding: 0;
    }

    .error ul {
        list-style: inside;
        margin: 0;
        padding: 0;
        line-height: 2.3em;
        font-size: 1.05em;
        font-weight: 500;
    }


    .contact {
        padding: 10px 15px;
        background-color: #000;
        border-radius: 15px;
        color: #fff;
    }

    .contact h4 {
        font-size: 1.7em;
        padding: 0px;
        margin: 10px auto;
        text-align: center;
    }

    .contact {
        max-width: 400px;
        margin: 0 auto;
    }

    .contact-container {
        min-width: min(380px, 100vw);
        width: 100%;
        max-width: 50%;
    }

    .form-row {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        margin: 25px 0px;
    }

    .form-row label {
        padding: 10px 0;
        font-weight: 600;
    }

    .form-row input:valid, .form-row textarea:valid {
        background: none;
        border-bottom: 1px solid #fff;
    }

    .form-row input:blank, .form-row textarea:blank {
        background-color: none;
        border-bottom: 1px solid #fff;
    }

    .form-row input:focus-visible {
        border-color: #FFF;
    }

    .form-row input, .form-row textarea, .form-row input:valid, .form-row textarea:valid
 {
        padding: 10px 5px;
        border: none;
        border-bottom: 1px solid white;
        background: none ;
        color: #fff;
    }

    .form-row textarea {
        min-height: 80px;
    }

    input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color: #fff !important;
}
   

    .form-row.submit input{
        max-width: 280px;
        width: 100%;
        margin: 0 auto;
        background: #fff;
        color: #000;
        font-weight: 600;
        border-radius: 5px;
        cursor: pointer;
    }

	.form-row.h {
		display: none;
		visibility: hidden;
		opacity: 0;
	}


    @media (max-width: 400px) {
		.contact {
            max-width: 100%;
        }

        .contact-container {
            min-width: 100%;
        }
	}

    @media (max-width: 850px) {

        .contact-container {
            min-width: 100%;
        }
	}
</style>
