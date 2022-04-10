<script>
	export let decrementStep;
	export let show = true;
</script>

<div class:selected="{!show}">
<fieldset class="form-group">
	<label for="creditCard">Credit Card Number</label>
	<input type="number" class="form-control" id="creditCard" placeholder="5860XXXX" />
</fieldset>
<div class="grouped">
    <fieldset class="form-group">
        <label for="expiryDate">Expiry Date</label>
        <input type="date" class="form-control" id="expiryDate" placeholder="Expiry Date" />
    </fieldset>
    <fieldset class="form-group">
        <label for="cvv">CVV</label>
        <input type="number" class="form-control" id="cvv" placeholder="CVV" />
    </fieldset>
</div>
<button class="btn" type="submit">Submit</button>
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
		margin: auto;
		max-width: 200px;
		background: #0acf83;
		color: white;
	}
</style>
