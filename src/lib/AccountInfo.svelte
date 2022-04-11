<script>
	import { create, test, enforce, warn } from 'vest';
	import SuitedInput from './SuitedInput.svelte';
	export let incrementStep;
	export let show = true;
	let email, password, confirmPassword;
	let suiteResult;

	const suite = create((data = {}) => {
		test('email', 'Email is required', () => {
			enforce(data.email).isNotBlank();
			enforce(data.email).matches(/^[^@]+@[^@]+\.[^@]+$/);
		});

		test('password', 'Must be at least 8 charachers', () => {
			enforce(data.password).longerThan(7);
		});

		test('password', 'Password is weak, add a digit', () => {
			warn();
			enforce(data.password).matches(/[0-9]/);
		});

		test('confirmPassword', 'Passwords do not match', () => {
			enforce(data.confirmPassword).equals(data.password);
		});
	});

	$: {
		const result = {
			email,
			password,
			confirmPassword
		};
		suiteResult = suite(result);
		// console.log(suiteResult);
	}
</script>

<div class:selected={!show}>
	<fieldset class="form-group">
		<label for="email">Email</label>
		<SuitedInput
			name="email"
			placeholder={'Email'}
			type={'email'}
			bind:value={email}
			errors={suiteResult.getErrors('email')}
		/>
	</fieldset>
	<fieldset class="form-group">
		<label for="password">Password</label>
		<SuitedInput
			name="password"
			placeholder={'Password'}
			type={'password'}
			bind:value={password}
			errors={suiteResult.getErrors('password')}
		/>
	</fieldset>
	<fieldset class="form-group">
		<label for="confirmPassword">Confirm Password</label>
		<SuitedInput
			placeholder={'Confirm Password'}
			type={'password'}
			bind:value={confirmPassword}
			errors={suiteResult.getErrors('confirmPassword')}
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
