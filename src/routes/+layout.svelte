<script lang="ts">
	import '../app.css';
	let { children } = $props();
	let isOpen = $state(false);
</script>

<header class="bg-blue-800 py-4 text-white shadow-md">
	<div class="mx-auto flex max-w-screen-xl items-center justify-between px-4">
		<!-- Logo -->
		<div class="flex items-center space-x-4">
			<!-- <img src="/logo.png" alt="Store Logo" class="h-8" /> -->
			<span class="text-2xl font-extrabold text-white">Digi-Glasses</span>
		</div>

		<!-- Navigation -->
		<nav class="hidden space-x-8 md:flex">
			<a href="/" class="text-lg hover:text-blue-300">Home</a>
			<a href="/shop" class="text-lg hover:text-blue-300">Shop</a>
			<a href="/about" class="text-lg hover:text-blue-300">About</a>
			<a href="/contact" class="text-lg hover:text-blue-300">Contact</a>
		</nav>

		<!-- Mobile Menu Icon -->
		<div class="flex items-center md:hidden">
			<button class="text-white" aria-label="Toggle Mobile Menu" onclick={() => (isOpen = !isOpen)}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h16"
					></path>
				</svg>
			</button>
		</div>
	</div>

	<!-- Mobile Menu -->
	{#if isOpen}
		<div class="space-y-4 bg-blue-800 py-4 text-white md:hidden">
			<a href="/" class="block px-4 py-2 hover:bg-blue-700">Home</a>
			<a href="/shop" class="block px-4 py-2 hover:bg-blue-700">Shop</a>
			<a href="/about" class="block px-4 py-2 hover:bg-blue-700">About</a>
			<a href="/contact" class="block px-4 py-2 hover:bg-blue-700">Contact</a>
		</div>
	{/if}
</header>

{@render children()}

<style>
	/* Font styling for the Gilroy font */
	@import url('https://fonts.googleapis.com/css2?family=Gilroy:wght@400;600&display=swap');

	header {
		font-family: 'Gilroy', sans-serif;
	}
</style>
