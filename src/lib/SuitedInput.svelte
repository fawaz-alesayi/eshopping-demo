<script lang="ts">
	let inputTouched;
	export let errors = [];
	export let value;
	export let name = '';
	export let type:
		| 'text'
		| 'password'
		| 'email'
		| 'number'
		| 'tel'
		| 'url'
		| 'search'
		| 'date'
		| 'time'
		| 'datetime-local'
		| 'month'
		| 'week'
		| 'color'
		| 'file'
		| 'range' = 'text';
	export let placeholder = type[0].toUpperCase() + type.slice(1);
	export let minLength = 0;
	export let maxLength = 10;

	function typeAction(node) {
		node.type = type;
	}
</script>

<input
	use:typeAction
	{placeholder}
	bind:value
	{name}
	maxlength={maxLength}
	minlength={minLength}
	on:blur={() => {
		inputTouched = true;
	}}
/>
{#if inputTouched && errors.length > 0}
	{#each errors as error}
		<div class="text-error">
			<strong>{error}</strong>
		</div>
	{/each}
{/if}
