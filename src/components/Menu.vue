<template>
  <nav class="px-8 py-4">
    <div class="flex space-x-8">
      <!-- MAIN MENU -->
      <div v-for="cat in categories" :key="cat" class="relative group">
        <!-- Menu Button -->
        <button class="relative text-sm font-bold uppercase tracking-widest opacity-80 hover:opacity-100 pb-1 transition-all" @click="setCategory(cat)">
          {{ cat }}
          <!-- Hover Line -->
          <span class="absolute left-0 bottom-0 h-0.5 w-0 bg-konoha-500 transition-all duration-300 group-hover:w-full"></span>
        </button>
      </div>
    </div>
  </nav>
</template>
<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useMenuFilter } from '../stores/MenuFilter'
import { products } from '../data/products'

const menu = useMenuFilter()
const router = useRouter()

// categories list
const categories = computed(() => [
  'All',
  ...new Set(products.map(p => p.category_for))
])

// set category + navigate
const setCategory = (cat) => {
  menu.setCategory(cat)  
  router.push('/shop')
  console.log('Selected category:', menu.category)
}
</script>