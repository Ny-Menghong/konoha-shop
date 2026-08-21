<template>
  <aside class="w-full relative p-4">
    <RouterLink to="/shop" class="btn-jutsu absolute top-4 right-4 !px-4 !py-2 !text-xs">To Shop</RouterLink>
    <div>
      <h3 class="title-jutsu text-xl mb-4 text-konoha-600" :class="DarkMode.isDark ? '!text-konoha-400' : ''">Filters</h3>

      <!-- Category -->
      <div class="mb-5">
        <p class="font-jp text-xs uppercase tracking-[0.25em] text-konoha-500 mb-2">
          Category · 種類
        </p>

        <div class="space-y-1">
          <button
            v-for="cat in categories"
            :key="cat"
            @click="selectedCat = cat"
            class="block text-base w-full text-left hover:pe-1.5 px-3 py-1.5 rounded-lg transition font-medium"
            :class="
              selectedCat === cat
                ? 'bg-konoha-600 text-white shadow-md shadow-konoha-600/30'
                : DarkMode.isDark
                  ? 'hover:bg-white/10'
                  : 'hover:bg-konoha-50'
            "
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <!-- Type -->
      <div class="mb-5">
        <p class="font-jp text-xs uppercase tracking-[0.25em] text-konoha-500 mb-2">
          Type · 型
        </p>

        <div class="space-y-1">
          <button
            v-for="t in types"
            :key="t"
            @click="selectedType = t"
            class="block w-full text-left text-sm px-3 py-1.5 rounded-lg transition font-medium"
            :class="
              selectedType === t
                ? 'bg-konoha-600 text-white shadow-md shadow-konoha-600/30'
                : DarkMode.isDark
                  ? 'hover:bg-white/10'
                  : 'hover:bg-konoha-50'
            "
          >
            {{ t }}
          </button>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed } from "vue"
import { useDarkMode } from "../stores/DarkMode"
import { useMenuFilter } from "../stores/MenuFilter"
import { products } from "../data/products"

const DarkMode = useDarkMode()
const menu = useMenuFilter()

const selectedCat = computed({
  get: () => menu.category,
  set: (val) => menu.setCategory(val)
})

const selectedType = computed({
  get: () => menu.type,
  set: (val) => menu.setType(val)
})

// Categories list
const categories = computed(() => [
  "All",
  ...new Set(products.map((p) => p.category_for))
])

// Types list (depends on selected category)
const types = computed(() => {
  const pool =
    selectedCat.value === "All"
      ? products
      : products.filter((p) => p.category_for === selectedCat.value)

  return ["All", ...new Set(pool.map((p) => p.type))]
})
</script>

<style></style>