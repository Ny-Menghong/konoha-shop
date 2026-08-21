<template>
  <section :class="DarkMode.isDark ? 'bg-gray-950 text-white' : 'bg-konoha-50 text-gray-900'" class="relative overflow-hidden flex items-center transition-colors duration-500">
    <!-- Soft glow -->
    <div class="chakra-orb w-96 h-96 bg-konoha-500/20 -top-20 -left-20"></div>
    <div v-if="DarkMode.isDark" class="chakra-orb w-80 h-80 bg-sharingan-600/15 bottom-0 right-10"></div>

    <div class="relative max-w-7xl mx-auto px-6 py-14 lg:py-16 grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-10 items-center">
      <!-- LEFT -->
      <div class="space-y-6">
        <span class="tag-ninja">🔥 New Drop · 2026</span>

        <h1 class="title-jutsu text-5xl lg:text-7xl leading-[0.95]">
          Elevate Your
          <br />
          <span :class="DarkMode.isDark ? 'text-konoha-400' : 'text-konoha-600'">Shinobi</span>
          Style
        </h1>

        <p :class="DarkMode.isDark ? 'text-white/70' : 'text-gray-600'" class="text-lg max-w-lg leading-relaxed">
          Gear forged in the Hidden Leaf. Premium streetwear,
          exclusive drops, and delivery faster than a Flying Raijin.
        </p>

        <!-- Buttons -->
        <div class="flex flex-wrap gap-4 pt-2">
          <router-link to="/shop" class="btn-jutsu">
            Shop Now
            <i class="bi bi-arrow-right"></i>
          </router-link>

          <button
            class="btn-scroll"
            :class="DarkMode.isDark ? '!border-white/50 text-white hover:!border-konoha-400 hover:!text-konoha-300' : 'hover:!border-konoha-500 hover:!text-konoha-600'"
          >
            Explore
          </button>
        </div>

        <!-- Stats -->
        <div class="flex gap-10 pt-6">
          <div>
            <h2 class="title-jutsu text-3xl" :class="DarkMode.isDark ? 'text-white' : 'text-gray-900'">10K+</h2>
            <p :class="DarkMode.isDark ? 'text-white/60' : 'text-gray-500'" class="text-sm">Ninja Customers</p>
          </div>

          <div>
            <h2 class="title-jutsu text-3xl" :class="DarkMode.isDark ? 'text-white' : 'text-gray-900'">500+</h2>
            <p :class="DarkMode.isDark ? 'text-white/60' : 'text-gray-500'" class="text-sm">Scrolls & Gear</p>
          </div>

          <div>
            <h2 class="title-jutsu text-3xl text-chakra-500" :class="DarkMode.isDark ? '!text-chakra-300' : ''">4.9★</h2>
            <p :class="DarkMode.isDark ? 'text-white/60' : 'text-gray-500'" class="text-sm">Village Reviews</p>
          </div>
        </div>
      </div>

      <!-- RIGHT -->
      <div class="relative flex justify-center">
        <!-- Image -->
        <Transition name="banner-fade" mode="out-in" class="h-[560px] lg:h-[600px]">
          <img
            :key="currentImage"
            :src="currentImage"
            alt="Shinobi Fashion"
            class="z-10 w-[80%] h-[100%] max-w-md rounded-3xl object-cover shadow-2xl border-4"
            :class="DarkMode.isDark ? 'border-white/10' : 'border-white'"
          />
        </Transition>

        <!-- Dots -->
        <div class="absolute bottom-5 right-0 flex gap-2 z-20">
          <button
            v-for="(img, i) in images"
            :key="img"
            @click="goTo(i)"
            :class="
              i === currentIndex
                ? 'bg-konoha-600 w-6'
                : DarkMode.isDark
                  ? 'bg-white/40 w-2.5 hover:bg-konoha-300'
                  : 'bg-gray-300 w-2.5 hover:bg-konoha-400'
            "
            class="h-2.5 rounded-full transition-all duration-300 cursor-pointer"
          ></button>
        </div>

        <!-- Floating Card -->
        <div class="absolute bottom-5 left-0 bg-white px-5 py-3 rounded-2xl z-20 shadow-xl">
          <p class="text-xs text-gray-500 uppercase tracking-widest">Special Offer</p>
          <h3 class="title-jutsu text-lg text-konoha-600">Up to 50% OFF</h3>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useDarkMode } from '../stores/DarkMode';

const DarkMode = useDarkMode();

const images = [
  'https://i.pinimg.com/736x/b5/ae/4f/b5ae4fa8cb77e57810e9482351e75d31.jpg',
  'https://i.pinimg.com/originals/5f/e7/aa/5fe7aa12c7d80a68bc6111dfda7147f2.png',
];

const currentIndex = ref(0);
const currentImage = computed(() => images[currentIndex.value]);

let timer = null;

function next() {
  currentIndex.value = (currentIndex.value + 1) % images.length;
}

function goTo(i) {
  currentIndex.value = i;
}

onMounted(() => {
  timer = setInterval(next, 10000);
});

onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
});
</script>

<style scoped>
img {
  animation: float 4s ease-in-out infinite;
}
@keyframes float {
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-10px);
  }

  100% {
    transform: translateY(0px);
  }
}

.banner-fade-enter-active,
.banner-fade-leave-active {
  transition: opacity 0.3s ease;
}
.banner-fade-enter-from,
.banner-fade-leave-to {
  opacity: 0.2;
}
</style>
