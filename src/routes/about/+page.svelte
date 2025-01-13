<script lang="ts">
	import ClassicBlackFrame from '$lib/assets/products/classic_black_frame.jpg';
	import ModernRoundGlasses from '$lib/assets/products/modern_round_glasses.webp';
	import SleekSilverFrame from '$lib/assets/products/sleek_silver_frame.jpg';
	import RetroGoldenFrame from '$lib/assets/products/retro_golden_frame.jpg';
	import MinimalistWhiteFrame from '$lib/assets/products/minimalist_white_frame.jpg';


	let products = [
		{ id: 11, name: 'Modern Round Glasses', image: ModernRoundGlasses, price: '$120' },
		{ id: 12, name: 'Retro Gold Frames', image: RetroGoldenFrame, price: '$140' },
		{ id: 13, name: 'Sleek Silver Frames', image: SleekSilverFrame, price: '$150' },
		{ id: 14, name: 'Classic Black Frames', image: ClassicBlackFrame, price: '$100' },
		{ id: 15, name: 'Minimalist White Frames', image: MinimalistWhiteFrame, price: '$130' }
	];

	// Import the ModalPopup package
	import { createModalPopup } from 'popupink';

	// Initialize the modal
	const modal = createModalPopup({
		url: 'http://127.0.0.1:8000/:store_name/:product_slug/',
	});

	function openPopup(productId: number) {
		// Open the modal with dynamic query parameters
		modal.openPopup({ store_name: "DigiStore", product_slug: productId.toString() });
	}
</script>

<section class="bg-white py-24">
	<div class="mx-auto max-w-screen-xl px-4 text-center">
		<h2 class="mb-12 text-3xl font-extrabold text-blue-900">Shop Our Glasses</h2>

		<div class="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3">
			{#each products as product (product.id)}
				<div class="overflow-hidden rounded-lg bg-blue-100 shadow-lg">
					<img src={product.image} alt={product.name} class="h-48 w-full object-cover" />
					<div class="p-6">
						<h3 class="mb-4 text-xl font-semibold text-blue-900">{product.name}</h3>
						<p class="mb-4 text-lg font-semibold text-gray-700">{product.price}</p>
						<button
							class="mb-4 rounded-full bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
							on:click={() => openPopup(product.id)}
						>
							Try On Glasses
						</button>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
