<script>
	export let incrementStep;
	export let show = true;
</script>

<div class:selected="{!show}">
	<fieldset class="form-group">
		<label for="email">Email</label>
		<input type="email" class="form-control" id="email" placeholder="Email" />
	</fieldset>
	<fieldset class="form-group">
		<label for="password">Password</label>
		<input type="password" class="form-control" id="password" placeholder="Password" />
	</fieldset>
	<fieldset class="form-group">
		<label for="confirmPassword">Confirm Password</label>
		<input
			type="password"
			class="form-control"
			id="confirmPassword"
			placeholder="Confirm Password"
		/>
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
		display: block;
		margin: auto;
		width: 80%;
		
		background: #0acf83;
		color: white;
	}
</style>
