<script lang="ts">
	import { create, test, enforce } from 'vest';
	import SuitedInput from './SuitedInput.svelte';

	export let decrementStep;
	export let show = true;

	export let inputs = {
		creditCardNumber: '',
		cvv: '',
		expirationDate: ''
	};

	let suiteResult;

	const suite = create((data = {}) => {
		test('creditCard', 'Credit Card Number Required', () => {
			enforce(data.creditCardNumber).isNotBlank();
		});

		test('creditCard', 'Credit Card Number must contain only numbers', () => {
			enforce(data.creditCardNumber).matches(/^[0-9]+$/);
		});

		test('cvv', 'CVV Required', () => {
			enforce(data.cvv).isNotBlank();
		});

		test('cvv', 'CVV must contain only numbers', () => {
			enforce(data.cvv).matches(/^[0-9]+$/);
		});

		test('cvv', 'CVV must be 3 digits', () => {
			enforce(data.cvv).lengthEquals(3);
		});

		test('expirationDate', 'Expiration Date Required', () => {
			enforce(data.expirationDate).isNotBlank();
		});
	});

	$: {
		const result = inputs;
		suiteResult = suite(result);
		console.log(suiteResult.getErrors());
	}
</script>

<div class:selected={!show}>
	<fieldset class="form-group">
		<label for="creditCard">Credit Card Number</label>
		<SuitedInput
			type="text"
			bind:value={inputs.creditCardNumber}
			placeholder="5860XXXX..."
			errors={suiteResult.getErrors('creditCardNumber')}
		/>
	</fieldset>
	<div class="grouped">
		<fieldset class="form-group">
			<label for="expiryDate">Expiry Date</label>
			<SuitedInput
				type="date"
				name={'expiryDate'}
				bind:value={inputs.expirationDate}
				placeholder="Expiry Date"
				errors={suiteResult.getErrors('expirationDate')}
			/>
		</fieldset>
		<fieldset class="form-group">
			<label for="cvv">CVV</label>
			<SuitedInput
				type="number"
				bind:value={inputs.cvv}
				placeholder="CVV"
				errors={suiteResult.getErrors('cvv')}
				maxLength={3}
			/>
		</fieldset>
	</div>
	<button class="btn" disabled={suiteResult.hasErrors()} type="submit">Submit</button>
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
