<script lang="ts">
	export let inputTouched = false;
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
	export let placeholder;
	export let minLength = 0;

	// default maxLength according to the HTML spec
	const MAX_LENGTH = 524288;
	export let maxLength = MAX_LENGTH;

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
	<div class="text-error">
		<strong>{errors[0]}</strong>
	</div>
{/if}
