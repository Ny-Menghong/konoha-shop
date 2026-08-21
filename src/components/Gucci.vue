<template>
  <div class="relative overflow-hidden rounded-2xl mt-7 bg-ink-950 text-white border-2 border-konoha-500/40 bg-stripes-naruto">
    <div class="chakra-orb w-72 h-72 bg-konoha-600/30 top-0 left-1/4"></div>
    <div class="chakra-orb w-64 h-64 bg-sharingan-600/20 bottom-0 right-1/4"></div>

    <main class="relative flex-1 flex items-center justify-center p-6 md:p-10">
      <div class="relative w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-8">
        <!-- LEFT -->
        <div class="space-y-3 md:w-1/3">
          <span class="tag-ninja">近日公開 · Coming Soon</span>
          <h2 class="title-jutsu text-3xl leading-tight">
            NEW SHOES<br />
            <span class="text-konoha-400">INCOMING DROP</span>
          </h2>
          <p class="font-jp text-xs text-white/50 tracking-[0.3em] uppercase">Categories</p>
          <p class="text-sm text-white/70 leading-relaxed">
            Sneakers collection 2026 — forged with chakra-powered comfort and
            Hidden Leaf craftsmanship.
          </p>
        </div>

        <!-- CENTER PRODUCT -->
        <div class="relative md:w-1/3 flex justify-center items-center py-4">
          <div class="absolute w-80 h-80 bg-konoha-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>

          <img
            :src="products[currentIndex].image"
            class="w-80 h-70 md:w-96 object-contain z-10 transition-all duration-700 hover:scale-105 drop-shadow-2xl"
          />
        </div>
  
        <!-- RIGHT THUMBNAILS -->
        <div class="md:w-1/3 flex justify-end gap-4">
          <div
            v-for="(p, i) in products"
            :key="i"
            @click="changeProduct(i)"
            class="cursor-pointer"
          >
            <img
              :src="p.image"
              class="w-16 h-16 object-contain rounded-xl border-2 transition-all duration-300"
              :class="i === currentIndex ? 'border-konoha-500 scale-110' : 'border-white/20 opacity-50 hover:opacity-100'"
            />
          </div>
        </div>
      </div>
    </main>

    <!-- FOOTER -->
    <footer class="relative text-center pb-12">
      <h1 class="title-jutsu text-4xl md:text-5xl tracking-[0.35em] text-white">KONOHA KICKS</h1>
      <p class="text-xs text-white/60 mt-2 tracking-widest uppercase">Crystal Flash Sneakers · $1090</p>
      <button
        @click="addToBag"
        class="btn-jutsu mt-5 !px-8 !py-3 !text-xs !tracking-[0.2em] uppercase"
      >
        {{ added ? 'ADDED ✓' : 'NOTIFY ME' }}
      </button>
  
      <!-- toast -->
      <p v-if="toast" class="mt-4 text-chakra-300 text-xs font-bold">
        <i class="bi bi-bell"></i> Mission accepted! We'll signal you when the drop lands.
      </p> 
    </footer>
  </div>
</template>

<script setup>
import { ref } from "vue"

const products = ref([
  { image: "https://otakyo.fr/cdn/shop/files/sneakers-naruto-baryon-mode-shippuden-697.webp?v=1748151616" },
  { image: "https://sneakpeek.shoes/cdn/shop/files/comet-lows-x-narutosneak-peek-shoes-3177938.webp?v=1756189000&width=1200" },
  { image: "https://www.daedo.com/cdn/shop/files/Daedo-sportswear-shoes-za2024.png?v=1777380277&width=533" },
])

const currentIndex = ref(0)
const added = ref(false)
const toast = ref(false)

const changeProduct = (i) => {
  currentIndex.value = i
}

const addToBag = () => {
  added.value = true
  toast.value = true

  setTimeout(() => {
    toast.value = false
  }, 2000)
}
</script>

<style scoped>
</style>
