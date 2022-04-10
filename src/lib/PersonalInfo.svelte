<script>
	export let incrementStep;
	export let decrementStep;
	export let show = true;
</script>

<div class:selected={!show}>
<fieldset class="form-group">
	<label for="firstName">First Name</label>
	<input type="text" class="form-control" id="firstName" placeholder="First Name" />
</fieldset>
<fieldset class="form-group">
	<label for="password">Last Name</label>
	<input type="password" class="form-control" id="password" placeholder="Password" />
</fieldset>
<fieldset>
	<!--Country-->
	<label for="country">Country</label>
	<select class="form-control" id="country">
		<option>Select Country</option>
		<option>Saudi Arabia</option>
		<option>USA</option>
		<option>UK</option>
		<option>Japan</option>
	</select>
</fieldset>
<fieldset>
	<!--City as a text field-->
	<label for="city">City</label>
	<input type="text" class="form-control" id="city" placeholder="City" />
</fieldset>
<fieldset>
	<!--Address -->
	<label for="address">Address</label>
	<input type="text" class="form-control" id="address" placeholder="Address" />
</fieldset>
<button class="btn" on:click|preventDefault={incrementStep}>Next</button>
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
