<template>
  <div :class="DarkMode.isDark ? 'bg-gray-950 text-white' : 'bg-gray-50 text-black'" class="transition-all duration-500">
    <Banner />

    <!-- Featured Products -->
    <section class="max-w-7xl mx-auto px-4 py-14">
      <div class="flex items-center justify-between mb-8">
        <div>
          <span class="tag-ninja mb-2">新着 · Fresh Gear</span>
          <h2 class="heading-section mt-2">New <span :class="DarkMode.isDark ? 'text-konoha-400' : 'text-konoha-600'">Arrivals</span></h2>
          <p class="text-gray-400 text-sm mt-1">Straight from the Hidden Leaf workshop</p>
        </div>
        <RouterLink to="/shop" class="text-sm font-bold uppercase tracking-widest pb-0.5 border-b-2 transition-all" :class="DarkMode.isDark ? 'text-konoha-400 border-konoha-400 hover:text-konoha-300' : 'text-konoha-600 border-konoha-500 hover:text-konoha-500'">
          View All →
        </RouterLink>
      </div>


      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <ProductCard v-for="p in newArrivals" :key="p.id + p.type" :product="p" />
      </div>
      
      <Gucci/>
      
    </section>

    <!-- Categories Banner -->
    <section class="max-w-7xl mx-auto px-4 pb-14">
      <h2 class="heading-section mb-6">Shop by <span :class="DarkMode.isDark ? 'text-konoha-400' : 'text-konoha-600'">Clan</span></h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div
          v-for="cat in categoryCards"
          :key="cat.label"
          @click="setGender(cat.label)"
          class="relative overflow-hidden rounded-2xl aspect-video group cursor-pointer border-2 border-transparent hover:border-konoha-500 transition-colors shadow-lg"
        >
          <img :src="cat.img" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-5">
            <div>
              <p class="text-konoha-300 text-xs uppercase tracking-[0.25em] font-jp mb-1">{{ cat.sub }}</p>
              <h3 class="title-jutsu text-white text-2xl">{{ cat.label }}</h3>
            </div>
          </div>
        </div>
      </div>
    </section>


  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import Banner from '../components/Banner.vue'
import ProductCard from '../components/ProductCard.vue'
import { products } from '../data/products'
import { useDarkMode } from '../stores/DarkMode'
import Gucci from '../components/Gucci.vue'
import { useMenuFilter } from '../stores/MenuFilter.js'
import { useRouter } from 'vue-router'
const DarkMode = useDarkMode()
const menu = useMenuFilter()
const route = useRouter();
const setGender=(cat)=>{
  menu.setCategory(cat)
  route.push('/shop')
}
const newArrivals = computed(() => products.filter(p => p.isNewIn).slice(0, 8))

const categoryCards = [
  { label: 'Women', sub: 'New Collection', img: 'https://i.pinimg.com/736x/39/86/c6/3986c671083490a0ff14148573ea1875.jpg' },
  { label: 'Men', sub: 'New Collection', img: 'https://i.pinimg.com/1200x/02/1b/97/021b970e3a3e67fe6f64f7990bdaae54.jpg' },
  { label: 'Kids', sub: 'New Collection', img: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600' },
]
</script>
