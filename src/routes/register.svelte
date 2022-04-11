<script lang="ts">
	import AccountInfo from '$lib/AccountInfo.svelte';
	import PaymentInfo from '$lib/PaymentInfo.svelte';
	import PersonalInfo from '$lib/PersonalInfo.svelte';
	import { onMount } from 'svelte';

	const steps = ['accountInfo', 'personalInfo', 'paymentInfo'];
	let currentStep = steps[0];

	const registerEndpoint = import.meta.env.VITE_BACKEND + '/register';

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

	const handleSubmit = async (e) => {
		const formData = new FormData(e.target);
		const json = Object.fromEntries(formData.entries());
		const payload = {
			email: json.email,
			password: json.password,
			confirmPassword: json.password,
			fname: json.firstName,
			lname: json.lastName,
			country: json.country,
			city: json.city,
			address: json.address,
			card_number: json.creditCardNumber,
			expiry_date: json.month + '/' + json.year
		};

		const result = await fetch(registerEndpoint, {
			method: 'POST',
			body: JSON.stringify(payload),
			headers: {
				'X-Requested-With': 'XMLHttpRequest'
			}
		});

		console.log(result);
	};
</script>

<form class="register" on:submit|preventDefault={handleSubmit} method="post">
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
