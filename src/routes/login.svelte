<script>
	import { api } from '$lib/api';
	import { setAccessToken } from '$lib/auth';
	import { accessTokenStore } from '$lib/store';

	import { create, test, enforce } from 'vest';
	import SuitedInput from '$lib/SuitedInput.svelte';
	let email, password;
	let suiteResult;

	const login = async () => {
		const result = await api('POST', 'login', {
			email,
			password
		});
		if (result.status === 200 || result.status === 201) {
			const data = await result.json();
			setAccessToken(data.access_token, accessTokenStore);
			// redirect to /
			if (window) {
				window.location.href = '/';
			}
		}
	};

	const suite = create((data = {}) => {
		test('email', 'Email is required', () => {
			enforce(data.email).isNotBlank();
			enforce(data.email).matches(/^[^@]+@[^@]+\.[^@]+$/);
		});

		test('password', 'Must be at least 8 charachers', () => {
			enforce(data.password).longerThan(7);
		});
	});

	$: {
		const result = {
			email,
			password
		};
		suiteResult = suite(result);
	}
</script>

<div>
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
	<button class="btn" disabled={suiteResult.hasErrors()} on:click|preventDefault={login}
		>Log in</button
	>
</div>

<style>
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
