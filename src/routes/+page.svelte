<script lang="ts">
	import ClassicBlackFrame from '$lib/assets/products/classic_black_frame.jpg';
	import ModernRoundGlasses from '$lib/assets/products/modern_round_glasses.webp';
	import SleekSilverFrame from '$lib/assets/products/sleek_silver_frame.jpg';
	import JohnDoe from '$lib/assets/humans/john_doe.jpg';
	import SarahSmith from '$lib/assets/humans/sarah_smith.jpg';
	import MichealJohnson from '$lib/assets/humans/micheal_johnson.jpg';

	let products = [
		{ name: 'Classic Black Frames', image: ClassicBlackFrame, link: '/shop#classic-black-frames' },
		{ name: 'Modern Round Glasses', image: ModernRoundGlasses, link: '/shop#modern-round-glasses' },
		{ name: 'Sleek Silver Frames', image: SleekSilverFrame, link: '/shop#sleek-silver-frames' }
	];

	let testimonials = [
		{
			name: 'John Doe',
			image: JohnDoe,
			review:
				'The quality of the glasses is amazing! They fit perfectly, and I love the style. Highly recommend!'
		},
		{
			name: 'Sarah Smith',
			image: SarahSmith,
			review:
				"A great experience from start to finish. The glasses arrived on time, and I couldn't be happier with my purchase!"
		},
		{
			name: 'Michael Johnson',
			image: MichealJohnson,
			review: "Amazing customer service and a fantastic product. I'll be ordering again soon!"
		}
	];

	let offer = {
		title: 'Limited Time Offer!',
		description:
			"Get 20% off your first purchase when you sign up for our newsletter. Don't miss out!",
		buttonText: 'Claim Offer',
		link: '/offer'
	};

	let footerLinks = [
		{ name: 'Privacy Policy', link: '/privacy-policy' },
		{ name: 'Terms of Service', link: '/terms-of-service' },
		{ name: 'Contact Us', link: '/contact' }
	];
</script>

<section class="relative bg-blue-900 py-32 text-white">
	<div class="mx-auto flex max-w-screen-xl flex-col items-center justify-between px-4 md:flex-row">
		<!-- Text Content -->
		<div class="text-center md:text-left">
			<h1 class="mb-6 text-4xl font-extrabold leading-tight md:text-5xl">
				Find the Perfect Pair of Glasses
			</h1>
			<p class="mx-auto mb-6 max-w-lg text-lg md:mx-0">
				Explore our premium collection of stylish glasses. Designed for comfort, clarity, and a
				perfect fit.
			</p>
			<div class="flex justify-center md:justify-start">
				<a
					href="/shop"
					class="rounded-full bg-blue-500 px-6 py-2 text-lg font-semibold text-white transition duration-300 ease-in-out hover:bg-blue-600"
				>
					Shop Now
				</a>
			</div>
		</div>

		<!-- Image Section -->
		<div class="mt-10 md:mt-0">
			<img
				src="/glasses-hero-image.png"
				alt="Stylish Glasses"
				class="mx-auto w-full max-w-md rounded-lg shadow-lg md:mx-0"
			/>
		</div>
	</div>

	<!-- Background Overlay (optional) -->
	<div class="absolute inset-0 bg-black opacity-30"></div>
</section>

<section class="bg-white py-24">
	<div class="mx-auto max-w-screen-xl px-4 text-center">
		<h2 class="mb-12 text-3xl font-extrabold text-blue-900">Our Featured Glasses</h2>

		<div class="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3">
			{#each products as product}
				<div class="overflow-hidden rounded-lg bg-blue-100 shadow-lg">
					<img src={product.image} alt={product.name} class="h-48 w-full object-cover" />
					<div class="p-6">
						<h3 class="mb-4 text-xl font-semibold text-blue-900">{product.name}</h3>
						<a href={product.link} class="font-semibold text-blue-500 hover:text-blue-700">
							View Details
						</a>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="bg-gray-100 py-24">
	<div class="mx-auto max-w-screen-xl px-4 text-center">
		<h2 class="mb-12 text-3xl font-extrabold text-blue-900">What Our Customers Are Saying</h2>

		<div class="flex flex-wrap justify-center gap-12">
			{#each testimonials as testimonial}
				<div class="w-full rounded-lg bg-white p-8 shadow-lg sm:w-80">
					<img
						src={testimonial.image}
						alt={testimonial.name}
						class="mx-auto mb-4 size-20 rounded-full object-cover"
					/>
					<p class="mb-4 text-lg italic text-gray-800">"{testimonial.review}"</p>
					<p class="font-semibold text-blue-900">{testimonial.name}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="bg-blue-900 py-24 text-white">
	<div class="mx-auto max-w-screen-xl px-4 text-center">
		<h2 class="mb-4 text-3xl font-extrabold">{offer.title}</h2>
		<p class="mb-8 text-lg">{offer.description}</p>
		<a
			href={offer.link}
			class="rounded-full bg-blue-500 px-8 py-3 text-lg font-semibold text-white transition duration-300 hover:bg-blue-600"
		>
			{offer.buttonText}
		</a>
	</div>
</section>

<footer class="bg-blue-900 py-12 text-white">
	<div class="mx-auto max-w-screen-xl px-4 text-center">
		<!-- Footer Links -->
		<div class="mb-6">
			<ul class="flex justify-center gap-12">
				{#each footerLinks as link}
					<li>
						<a href={link.link} class="text-white transition duration-300 hover:text-blue-400"
							>{link.name}</a
						>
					</li>
				{/each}
			</ul>
		</div>

		<!-- Copyright Notice -->
		<div class="text-sm text-gray-400">
			&copy; {new Date().getFullYear()} Digi-Glasses. All rights reserved.
		</div>
	</div>
</footer>

<style>
	/* Font styling for the Gilroy font */
	@import url('https://fonts.googleapis.com/css2?family=Gilroy:wght@400;600&display=swap');

	section {
		font-family: 'Gilroy', sans-serif;
	}
</style>
