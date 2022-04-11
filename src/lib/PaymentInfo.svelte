<script lang="ts">
	import { create, test, enforce } from 'vest';
	import SuitedInput from './SuitedInput.svelte';

	export let decrementStep = undefined;
	export let show = true;
	export let buttonName = 'Submit';
	let month;
	let year;
	let touchedYear = false;

	export let inputs = {
		creditCardNumber: '',
		cvv: '',
		expirationDate: ''
	};
	$: {
		inputs.expirationDate = month + '/' + year;
	}

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

		test('expirationDate', 'Expiration Date must be in the format MM/YY', () => {
			enforce(data.expirationDate).matches(/^[0-9]{2}\/[0-9]{2}$/);
		});
	});

	$: {
		const result = inputs;
		suiteResult = suite(result);
	}
</script>

<div class:selected={!show} class="paymentInfo">
	<label for="paymentMethod">Credit Card Provider</label>
	<div class="card-group">
		<div class="form-check">
			<input
				class="form-check-input"
				type="radio"
				name="paymentMethod"
				id="paymentMethod1"
				value="mada"
				checked
			/>
			<label class="form-check-label" for="paymentMethod1"> Mada </label>
		</div>
		<div class="form-check">
			<input
				class="form-check-input"
				type="radio"
				name="paymentMethod"
				id="paymentMethod2"
				value="visa"
			/>
			<label class="form-check-label" for="paymentMethod2"> Visa </label>
		</div>
		<div class="form-check">
			<input
				class="form-check-input"
				type="radio"
				name="paymentMethod"
				id="paymentMethod3"
				value="mastercard"
			/>
			<label class="form-check-label" for="paymentMethod3"> MasterCard </label>
		</div>
	</div>
	<fieldset class="form-group">
		<label for="creditCard">Credit Card Number</label>
		<SuitedInput
			type="text"
			name="creditCardNumber"
			bind:value={inputs.creditCardNumber}
			placeholder="5860XXXX..."
			errors={suiteResult.getErrors('creditCardNumber')}
		/>
	</fieldset>
	<div class="grouped">
		<fieldset class="form-group">
			<label for="expiryDate">Expiry Date</label>
			<div class="inline-group">
				<SuitedInput type="text" name={'month'} bind:value={month} placeholder="MM" maxLength={2} />
				<SuitedInput
					type="text"
					name={'year'}
					bind:value={year}
					placeholder="YY"
					maxLength={2}
					bind:inputTouched={touchedYear}
				/>
			</div>
			<p>Must be in MM/YY format</p>
			<!-- {#if touchedYear && suiteResult.getErrors("expirationDate").length > 0}
				<div class="text-error">
					<strong>{suiteResult.getErrors()[0]}</strong>
				</div>
			{/if} -->
		</fieldset>
		<fieldset class="form-group">
			<label for="cvv">CVV</label>
			<SuitedInput
				type="number"
				name={'cvv'}
				bind:value={inputs.cvv}
				placeholder="CVV"
				errors={suiteResult.getErrors('cvv')}
				maxLength={3}
			/>
		</fieldset>
	</div>
	<button class="btn" disabled={suiteResult.hasErrors()} type="submit">{buttonName}</button>
</div>

<style>
	.paymentInfo {
		padding-left: 10px;
	}
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

	.inline-group {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 150px;
	}
</style>
