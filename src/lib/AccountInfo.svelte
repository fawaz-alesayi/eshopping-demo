<script>
	import { create, test, enforce, only, skipWhen, warn } from 'vest';
	export let incrementStep;
	export let show = true;
	let email, password, confirmPassword;
	let suiteResult;

	const suite = create((data = {}, currentField) => {
		test('username', 'Email is required', () => {
			enforce(data.email).isNotBlank();
		});

		test('password', 'Must be at least 8 charachers', () => {
			enforce(data.password).longerThan(7);
		});

		test('password', 'Password is weak, add a digit', () => {
			warn();
			enforce(data.password).matches(/[0-9]/);
		});

		test('confirm', 'Passwords do not match', () => {
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
		console.log(suiteResult);
	}
</script>

<div class:selected={!show}>
	<fieldset class="form-group">
		<label for="email">Email</label>
		<input type="email" class="form-control" id="email" placeholder="Email" bind:value={email} />
	</fieldset>
	<fieldset class="form-group">
		<label for="password">Password</label>
		<input
			type="password"
			class="form-control"
			id="password"
			placeholder="Password"
			bind:value={password}
		/>
	</fieldset>
	<fieldset class="form-group">
		<label for="confirmPassword">Confirm Password</label>
		<input
			type="password"
			class="form-control"
			id="confirmPassword"
			placeholder="Confirm Password"
			bind:value={confirmPassword}
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
