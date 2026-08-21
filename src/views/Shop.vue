<template>
  <div
    :class="
      DarkMode.isDark
        ? 'bg-gray-950 text-white min-h-screen'
        : 'bg-gray-50 text-black min-h-screen'
    "
  >
        <div v-if="searchStore.submittedSearch" class="mx-4 my-3">
          <div class="flex items-center border-b-2 border-konoha-500/60 max-w-xl mx-auto">
            <!-- INPUT -->
            <input
              v-model="searchStore.search"
              @keyup.enter="(handleSearch())"
              type="text"
              placeholder="What are you searching for?"
              class="w-full outline-none md:text-xl text-shadow-2xs font-light bg-transparent py-2"
            />
            <!-- SEARCH ICON -->
            <button
              @click="(handleSearch())"
              class="text-2xl mr-5 hover:scale-110 hover:text-konoha-500 transition duration-300"
            >
              <i class="bi bi-search"></i>
            </button>
            <!-- CLOSE -->
            <button
              @click="searchStore.submittedSearch = ''"
              class="text-4xl p-1 px-2 rounded-full hover:bg-sharingan-500/10 hover:text-sharingan-500 transition duration-500"
            >
              ×
            </button>
          </div>
        </div>
    <div class="max-w-7xl mx-auto px-4 py-10">
      <!-- Header -->
      <div class="mb-8">
        <span class="tag-ninja mb-2">商店 · The Armory</span>
        <h1 class="heading-section mt-2">Shop <span :class="DarkMode.isDark ? 'text-konoha-400' : 'text-konoha-600'">All Gear</span></h1>
        <p class="text-gray-400 mt-1">{{ filtered.length }} products in the village vault</p>
      </div>
      <div class="flex gap-6">
        <!-- Filters Sidebar -->
        <aside class="hidden lg:block w-56 flex-shrink-0">
          <div
            :class="DarkMode.isDark ? 'bg-ink-800 border-white/10' : 'bg-white border-konoha-500/20'"
            class="rounded-2xl p-5 sticky top-24 shadow-sm border"
          >
            <h3 class="title-jutsu text-lg mb-4 text-konoha-600" :class="DarkMode.isDark ? '!text-konoha-400' : ''">Filters</h3>
            <!-- Category -->
            <div class="mb-5">
              <p class="font-jp text-xs uppercase tracking-[0.25em] text-konoha-500 mb-2">
                Category
              </p>
              <div class="space-y-1">
                <button
                  v-for="cat in categories"
                  :key="cat"
                  @click="selectedCat = cat"
                  class="block w-full text-left text-sm px-3 py-1.5 rounded-lg transition font-medium"
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
                Type
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

            <!-- New In Only -->
            <label class="flex items-center gap-2 cursor-pointer text-sm mt-2">
              <input type="checkbox" v-model="newInOnly" class="accent-konoha-500 w-4 h-4" />
              New In Only
            </label>
          </div>
        </aside>

        <!-- Main -->
        <div class="flex-1">
          <!-- Mobile Filters + Sort Row -->
          <div class="flex items-center justify-between mb-5 gap-3">
            <select
              v-model="sortBy"
              :class="
                DarkMode.isDark
                  ? 'bg-ink-800 text-white border-white/20'
                  : 'bg-white border-konoha-500/30'
              "
              class="border text-sm px-3 py-2 rounded-full outline-none focus:border-konoha-500 transition"
            >
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="discount">Biggest Discount</option>
            </select>

            <!-- Mobile filter toggles -->
            <div class="lg:hidden flex gap-2 flex-wrap">
              <button
                v-for="cat in categories.slice(1)"
                :key="cat"
                @click="selectedCat = selectedCat === cat ? 'All' : cat"
                class="text-xs px-3 py-1.5 rounded-full border transition font-semibold"
                :class="
                  selectedCat === cat
                    ? 'bg-konoha-600 text-white border-transparent shadow-md shadow-konoha-600/30'
                    : DarkMode.isDark ? 'border-white/20' : 'border-gray-300'
                "
              >
                {{ cat }}
              </button>
            </div>
          </div>

          <!-- Grid -->
          <div
            v-if="filtered.length"
            class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            <ProductCard
              v-for="p in filtered"
              :key="p.id + p.type"
              :product="p"
            />
          </div>
          <div v-else class="text-center py-24 text-gray-400">
            <i class="bi bi-box-seam text-5xl mb-4 block text-konoha-500/50"></i>
            No products found in the vault.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import ProductCard from "../components/ProductCard.vue";
import { products } from "../data/products";
import { useDarkMode } from "../stores/DarkMode";
import { useSearchStore } from "../stores/SearchStore";
import { useMenuFilter } from "../stores/MenuFilter";
const handleSearch = () => {
  if (!searchStore.search.trim()) return;
  searchStore.submitSearch();
};
const DarkMode = useDarkMode();
const searchStore = useSearchStore();
const menu = useMenuFilter();

const sortBy = ref("default");
const newInOnly = ref(false);

// ✅ GLOBAL FILTER STATE (PINIA)
const selectedCat = computed({
  get: () => menu.category,
  set: (val) => menu.setCategory(val),
});

const selectedType = computed({
  get: () => menu.type,
  set: (val) => menu.setType(val),
});

// Categories
const categories = computed(() => [
  "All",
  ...new Set(products.map((p) => p.category_for)),
]);

// Types
const types = computed(() => {
  const pool =
    selectedCat.value === "All"
      ? products
      : products.filter((p) => p.category_for === selectedCat.value);

  return ["All", ...new Set(pool.map((p) => p.type))];
});

// FILTER LOGIC
const filtered = computed(() => {
  let list = [...products];

  // SEARCH
  const search = searchStore.submittedSearch?.toLowerCase().trim();
  if (search) {

    list = list.filter(
      (p) =>
        (p.name ?? "").toLowerCase().includes(search)
    );
  }
  // CATEGORY
  if (selectedCat.value !== "All") {
    list = list.filter((p) => p.category_for === selectedCat.value);
  }
  // TYPE
  if (selectedType.value !== "All") {
    list = list.filter((p) => p.type === selectedType.value);
  }

  // NEW IN
  if (newInOnly.value) {
    list = list.filter((p) => p.isNewIn);
  }

  // SORT
  if (sortBy.value === "price-asc") {
    list.sort((a, b) => a.price - b.price);
  } else if (sortBy.value === "price-desc") {
    list.sort((a, b) => b.price - a.price);
  } else if (sortBy.value === "discount") {
    list.sort((a, b) => b.discount - a.discount);
  }
  return list;
});
</script>
