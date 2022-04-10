<script lang="ts">
	import AccountInfo from '$lib/AccountInfo.svelte';
	import PaymentInfo from '$lib/PaymentInfo.svelte';
	import PersonalInfo from '$lib/PersonalInfo.svelte';

	const steps = ['accountInfo', 'personalInfo', 'paymentInfo'];
	let currentStep = steps[0];

	const incrementStep = () => {
		const index = steps.indexOf(currentStep);
		if (index < steps.length - 1) {
			currentStep = steps[index + 1];
		}
	};

	const decrementStep = () => {
		const index = steps.indexOf(currentStep);
		if (index > 0) {
			currentStep = steps[index - 1];
		}
	};
</script>

<form class="register" action="/users" method="post">
	<AccountInfo {incrementStep} show={currentStep === 'accountInfo'} />
	<PersonalInfo {incrementStep} {decrementStep} show={currentStep === 'personalInfo'} />
	<PaymentInfo {decrementStep} show={currentStep === 'paymentInfo'} />
</form>

<style>
	.register {
		display: flex;
		flex-direction: column;
		max-width: 600px;
		margin: auto;
	}
</style>
