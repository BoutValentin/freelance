<script>
	
	import ContactAside from '/src/components/contact/ContactAside.svelte';
import ContactComponent from '/src/components/contact/ContactComponent.svelte'
	
</script>

<section class="contact">
	<ContactComponent />
	<ContactAside />
</section>

<style>
	.contact {
		padding: 50px 15px 15px 15px;
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
	}

	@media (max-width: 850px) {
		.contact {
            flex-direction: column;
        }
	}
</style>
