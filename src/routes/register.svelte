<script context="module">
	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
	export const prerender = true;
</script>

<script lang="ts">
	import AccountInfo from '$lib/AccountInfo.svelte';
	import PaymentInfo from '$lib/PaymentInfo.svelte';
	import PersonalInfo from '$lib/PersonalInfo.svelte';
	import { accessToken } from '$lib/store';
	import Header from '$lib/Header.svelte';
	import { api } from '$lib/api';

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

	const setAccessToken = (token: string) => {
		accessToken.set(token);
	};

	const handleSubmit = async (e) => {
		const formData = new FormData(e.target);
		const json = Object.fromEntries(formData.entries());
		const registerPayload = {
			email: json.email,
			password: json.password,
			confirmed_password: json.password,
			fname: json.firstName,
			lname: json.lastName,
			country: json.country,
			city: json.city,
			address: json.address,
			card_number: json.creditCardNumber,
			ccv: json.cvv,
			expiry_date: json.month + '/' + json.year
		};

		console.log(registerPayload);

		const result = await api('post', 'sign_up', registerPayload);

		console.log(result);

		if (result.status == 201) {
			const loginPayload = {
				email: json.email,
				password: json.password
			};

			const loginResult = await api('post', 'login', loginPayload);

			console.log(loginResult);

			if (loginResult.status === 201 || loginResult.status === 200) {
				const data = await loginResult.json();
				setAccessToken(data.access_token);
			}

			console.info(
				`POST /login\npayload: ${JSON.stringify(loginPayload)}\nStatus: ${result.status}`
			);
		} else {
			console.info(
				`POST /sign_up\npayload: ${JSON.stringify(registerPayload)}\nStatus: ${result.status}`
			);
		}
	};
</script>

<Header title={'Registration'} />

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
