<!-- Modal.svelte -->
<script lang="ts">
	export let isOpen: boolean = false;
	export let tryOnUrl: string = '';

	function closeModal() {
		isOpen = false;
	}
</script>

{#if isOpen}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
		<div class="relative w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg">
			<button
				on:click={closeModal}
				class="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
			>
				&times;
			</button>
			<iframe src={tryOnUrl} class="h-[600px] w-full rounded-lg" />
		</div>
	</div>
{/if}