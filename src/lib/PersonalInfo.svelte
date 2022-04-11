<script lang="ts">
	import { create, test, enforce } from 'vest';
	import SuitedInput from './SuitedInput.svelte';

	export let incrementStep;
	export let decrementStep;
	export let show = true;
	export let inputs = {
		firstName: '',
		lastName: '',
		country: '',
		city: '',
		address: ''
	};

	const countries = ['USA', 'UK', 'Japan'];

	let suiteResult;

	const suite = create((data = {}) => {
		test('firstName', 'First name is required', () => {
			enforce(data.firstName).isNotBlank();
		});

		test('firstName', 'First name must contain only letters', () => {
			enforce(data.firstName).matches(/^[a-zA-Z]+$/);
		});

		test('lastName', 'Last name is required', () => {
			enforce(data.lastName).isNotBlank();
		});

		test('lastName', 'Last name must contain only letters', () => {
			enforce(data.lastName).matches(/^[a-zA-Z]+$/);
		});

		test('country', 'Country is required', () => {
			enforce(data.country).isNotBlank();
		});

		test('country', 'Country must contain only letters', () => {
			enforce(data.country).matches(/^[a-zA-Z]+$/);
		});

		test('city', 'City is required', () => {
			enforce(data.city).isNotBlank();
		});

		test('address', 'Address is required', () => {
			enforce(data.address).isNotBlank();
		});

		test('country', 'Country must be one of the following above', () => {
			enforce(data.country).inside(countries);
		});
	});

	$: {
		const result = inputs;
		suiteResult = suite(result);
		// console.log(suiteResult.getErrors());
	}
</script>

<div class:selected={!show}>
	<fieldset class="form-group">
		<label for="firstName">First Name</label>
		<SuitedInput
			type={'text'}
			name={'firstName'}
			bind:value={inputs.firstName}
			placeholder="First Name"
			errors={suiteResult.getErrors('firstName')}
		/>
	</fieldset>
	<fieldset class="form-group">
		<label for="lastName">Last Name</label>
		<SuitedInput
			type={'text'}
			name={'lastName'}
			bind:value={inputs.lastName}
			placeholder="Last Name"
			errors={suiteResult.getErrors('lastName')}
		/>
	</fieldset>
	<fieldset>
		<label for="country">Country</label>
		<select class="form-control" id="country" name="country" bind:value={inputs.country}>
			<option>Select Country</option>
			{#each countries as country}
				<option>{country}</option>
			{/each}
		</select>
	</fieldset>
	<fieldset>
		<!--City as a text field-->
		<label for="city">City</label>
		<SuitedInput
			type="text"
			name={'city'}
			bind:value={inputs.city}
			placeholder="City"
			errors={suiteResult.getErrors('city')}
		/>
	</fieldset>
	<fieldset>
		<!--Address -->
		<label for="address">Address</label>
		<SuitedInput
			type="text"
			name={'address'}
			bind:value={inputs.address}
			placeholder="Address"
			errors={suiteResult.getErrors('address')}
		/>
	</fieldset>

	<button class="btn" disabled={suiteResult.hasErrors()} on:click|preventDefault={incrementStep}
		>Next</button
	>
</div>

<style>
	.selected {
		display: none;
	}

	fieldset {
		margin-bottom: 1rem;
		border: none;
	}

	.btn {
		display: block;
		margin: auto;
		width: 80%;

		background: #0acf83;
		color: white;
	}
</style>
