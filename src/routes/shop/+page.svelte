<script lang="ts">
import ClassicBlackFrame from '$lib/assets/products/classic_black_frame.jpg';
import ModernRoundGlasses from '$lib/assets/products/modern_round_glasses.webp';
import SleekSilverFrame from '$lib/assets/products/sleek_silver_frame.jpg';
import RetroGoldenFrame from '$lib/assets/products/retro_golden_frame.jpg';
import MinimalistWhiteFrame from '$lib/assets/products/minimalist_white_frame.jpg';

let products = [
  { id: 'glasses-1', name: 'Modern Round Glasses', image: ModernRoundGlasses, price: '$120' },
  { id: 'glasses-2', name: 'Retro Gold Frames', image: RetroGoldenFrame, price: '$140' },
  { id: 'glasses-3', name: 'Sleek Silver Frames', image: SleekSilverFrame, price: '$150' },
  { id: 'glasses-4', name: 'Classic Black Frames', image: ClassicBlackFrame, price: '$100' },
  { id: 'glasses-5', name: 'Minimalist White Frames', image: MinimalistWhiteFrame, price: '$130' }
];

let isModalOpen = false;
let modalUrl: string | null = null;

function openPopup(productId: number) {
  // Set the URL for the modal iframe
  modalUrl = `http://127.0.0.1:8000?product=${productId}`;
  // modalUrl = 'https://example.com';
  isModalOpen = true;
}

function closePopup() {
  isModalOpen = false;
  modalUrl = null;
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

  <!-- Modal -->
  {#if isModalOpen}
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      on:click={closePopup}
      role="button"
      tabindex="0"
      on:keydown={(e) => e.key === 'Enter' && closePopup()}
      aria-label="Close modal"
    >
      <div class="relative h-[80%] w-[80%] rounded-lg bg-white shadow-lg">
        <!-- Close Button -->
        <button
          class="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
          on:click={closePopup}
        >
          &times;
        </button>

        <!-- Iframe -->
        <iframe
          src={modalUrl}
          title="Try on glasses preview"
          class="h-full w-full rounded-lg"
          frameborder="0"
        ></iframe>
      </div>
    </div>
  {/if}
</section>

<style>
/* Ensure modal is scrollable if content overflows */
iframe {
  border-radius: inherit;
}
</style>
