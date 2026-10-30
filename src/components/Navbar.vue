
<template>
  <nav
    :class="
      DarkMode.isDark
        ? 'bg-ink-950/95 text-white border-white/10'
        : 'bg-white/95 text-gray-900 border-gray-200'
    "
    class="sticky top-0 z-50 w-full max-w-full backdrop-blur-xl border-b-2 border-konoha-500 shadow-[0_2px_20px_-6px_rgba(234,88,12,0.35)]"
  >
    <!-- NAVBAR CONTENT -->
    <div
      class="relative w-full max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-3"
    >
      <!-- LEFT MENU (DESKTOP) -->
      <div class="hidden lg:flex items-center flex-shrink-0">
        <Menu />
      </div>

      <!-- MOBILE MENU BUTTON -->
      <button
        @click="menuOpen = !menuOpen"
        class="lg:hidden flex-shrink-0 text-3xl hover:text-konoha-500 transition"
      >
        ☰
      </button>

      <!-- LOGO -->
      <router-link
        to="/"
        class="flex items-center gap-2 group flex-shrink-0"
      >
        <img
          width="42"
          height="42"
          src="https://images.seeklogo.com/logo-png/21/2/konoha-logo-png_seeklogo-213120.png"
          alt="logo"
          class="transition-transform duration-500 group-hover:rotate-[360deg]"
        />

        <span
          class="title-jutsu text-xl md:text-2xl text-konoha-600"
          :class="DarkMode.isDark ? '!text-konoha-400' : ''"
        >
          KONOHA
        </span>

        <span class="font-jp text-konoha-500/70 text-xs hidden md:inline">
          木ノ葉
        </span>
      </router-link>

      <!-- RIGHT SIDE -->
      <div class="flex items-center gap-3 md:gap-5 flex-shrink-0">

        <!-- DESKTOP SEARCH -->
        <button
          @click="toggleSearch"
          class="hidden md:block text-sm opacity-60 hover:opacity-100 hover:text-konoha-500 transition border p-1.5 px-4 rounded-full whitespace-nowrap"
          :class="DarkMode.isDark ? 'border-white/25' : 'border-gray-300'"
        >
          <i class="bi bi-search px-2"></i>
          Search
        </button>

        <!-- MOBILE SEARCH -->
        <button
          @click="toggleSearch"
          class="md:hidden text-xl hover:text-konoha-500 transition"
        >
          <i class="bi bi-search"></i>
        </button>

        <!-- CART -->
        <button
          id="cart-icon-anchor"
          @click="openCart = true"
          class="relative text-2xl hover:text-konoha-500 transition flex-shrink-0"
        >
          <span
            v-if="cart.totalItems > 0"
            class="absolute -top-2 -right-2 bg-sharingan-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
          >
            {{ cart.totalItems }}
          </span>

          <i class="bi bi-bag"></i>
        </button>

        <!-- DARK MODE -->
        <button
          @click="t.toggleTheme()"
          class="hover:text-konoha-500 transition text-2xl flex-shrink-0"
        >
          <i class="bi bi-moon"></i>
        </button>

        <!-- LOGIN / REGISTER -->
        <div
          v-if="!auth.isLogin"
          class="hidden md:flex gap-2 items-center flex-shrink-0"
        >
          <RouterLink
            to="/login"
            class="border-2 border-konoha-500 text-konoha-600 px-4 py-1 rounded-full hover:bg-konoha-500 hover:text-white transition font-bold text-sm whitespace-nowrap"
            :class="DarkMode.isDark ? '!text-konoha-400' : ''"
          >
            LOGIN
          </RouterLink>

          <RouterLink
            to="/register"
            class="btn-jutsu !px-4 !py-1 !text-sm !rounded-full whitespace-nowrap"
          >
            REGISTER
          </RouterLink>
        </div>

        <!-- USER PROFILE -->
        <div
          v-else
          @click="router.push('/profile')"
          class="pr-2 hidden md:flex items-center gap-1 cursor-pointer hover:text-konoha-500 transition flex-shrink-0"
        >
          <i class="bi bi-person-fill"></i>
          <span class="max-w-28 truncate">
            {{ auth.userInfo.name }}
          </span>
        </div>

        <!-- MOBILE USER ICON -->
        <button
          @click="auth.isLogin ? router.push('/profile') : router.push('/register')"
          class="text-konoha-500 md:hidden text-2xl flex-shrink-0"
        >
          <i class="bi bi-person-fill"></i>
        </button>
      </div>
    </div>

    <!-- MOBILE MENU OVERLAY -->
    <div
      v-if="menuOpen"
      @click="menuOpen = false"
      class="fixed inset-0 bg-black/50 z-[60] lg:hidden"
    ></div>

    <!-- SEARCH OVERLAY -->
    <div
      v-if="searchOpen"
      @click="toggleSearch"
      class="fixed inset-0 bg-black/50 z-[60]"
    ></div>

    <!-- MOBILE SIDEBAR -->
    <div
      class="mobile-sidebar lg:hidden fixed left-0 top-0 w-10/12 max-w-sm h-screen shadow-lg z-[70]"
      :class="{ 'is-open': menuOpen }"
    >
      <aside
        class="py-4 space-y-2 h-full overflow-y-auto bg-stripes-naruto"
        :class="
          DarkMode.isDark
            ? 'bg-ink-950 text-white'
            : 'bg-white text-gray-900'
        "
      >
        <!-- CLOSE BUTTON -->
        <div
          class="flex justify-between items-center px-4 pb-4 border-b border-gray-200"
          :class="DarkMode.isDark ? '!border-white/10' : ''"
        >
          <h1
            class="title-jutsu text-2xl text-konoha-600"
            :class="DarkMode.isDark ? '!text-konoha-400' : ''"
          >
            Menu
          </h1>

          <button
            @click="menuOpen = false"
            class="text-3xl hover:text-sharingan-500 transition"
          >
            ✕
          </button>
        </div>

        <!-- SIDEBAR MENU -->
        <Sidebar />
      </aside>
    </div>

    <!-- SEARCH BAR -->
    <transition name="smooth-search">
      <div
        v-if="searchOpen"
        :class="
          DarkMode.isDark
            ? 'bg-ink-900 text-white'
            : 'bg-white text-gray-900'
        "
        class="absolute top-0 left-0 w-full max-w-full shadow-xl border-t-2 border-konoha-500 z-[80] overflow-hidden"
      >
        <div class="w-full max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8">
          <div class="flex items-center border-b-2 border-konoha-500 pb-4 gap-2">

            <!-- SEARCH INPUT -->
            <input
              v-model="searchStore.search"
              @keyup.enter="handleSearch"
              type="text"
              placeholder="What are you searching for?"
              class="w-full min-w-0 outline-none md:text-2xl text-xl font-light bg-transparent placeholder:text-gray-400"
            />

            <!-- SEARCH BUTTON -->
            <button
              @click="handleSearch"
              class="flex-shrink-0 text-2xl mr-2 hover:scale-110 hover:text-konoha-500 transition duration-300"
            >
              <i class="bi bi-search"></i>
            </button>

            <!-- CLOSE -->
            <button
              @click="searchOpen = false"
              class="flex-shrink-0 text-4xl p-1 px-2 rounded-full hover:bg-sharingan-500/10 hover:text-sharingan-500 transition duration-500"
            >
              ×
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- CART OVERLAY -->
    <div
      v-if="openCart"
      @click="openCart = false"
      class="fixed inset-0 bg-black/40 z-[90]"
    ></div>

    <!-- CART SIDEBAR -->
    <div
      class="fixed top-0 right-0 h-screen w-[85vw] max-w-80 shadow-lg transition-transform duration-300 z-[100]"
      :class="openCart ? 'translate-x-0' : 'translate-x-full'"
    >
      <div
        :class="
          DarkMode.isDark
            ? 'bg-ink-950 text-white'
            : 'bg-white text-gray-900'
        "
        class="h-full flex flex-col"
      >
        <!-- CART HEADER -->
        <div
          class="flex justify-between items-center p-4 border-b-2 border-konoha-500/40"
        >
          <h1
            class="title-jutsu text-xl text-konoha-600"
            :class="DarkMode.isDark ? '!text-konoha-400' : ''"
          >
            Cart ({{ cart.totalItems }})
          </h1>

          <button
            @click="openCart = false"
            class="text-2xl hover:text-sharingan-500 transition"
          >
            ×
          </button>
        </div>

        <!-- CART ITEMS -->
        <div class="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-3">

          <!-- EMPTY CART -->
          <div
            v-if="cart.items.length === 0"
            class="text-center text-gray-400 py-10"
          >
            <i class="bi bi-bag text-4xl block mb-2 text-konoha-400"></i>
            Your cart is empty
          </div>

          <!-- CART ITEM -->
          <div
            v-for="item in cart.items"
            :key="item.id"
            class="flex gap-3 items-center min-w-0"
          >
            <img
              :src="item.image[0]"
              class="w-14 h-16 object-cover rounded-xl flex-shrink-0 border border-konoha-500/30"
            />

            <div class="flex-1 min-w-0">
              <p class="text-xs font-semibold truncate">
                {{ item.type }}
              </p>

              <p class="text-xs text-gray-400">
                x{{ item.quantity }}
              </p>

              <p
                class="text-sm font-bold text-konoha-600"
                :class="DarkMode.isDark ? '!text-konoha-400' : ''"
              >
                ${{
                  (
                    (item.discount > 0
                      ? item.price - (item.price * item.discount) / 100
                      : item.price) * item.quantity
                  ).toFixed(2)
                }}
              </p>
            </div>

            <button
              @click="cart.removeItem(item.id)"
              class="text-gray-400 hover:text-sharingan-500 transition flex-shrink-0"
            >
              <i class="bi bi-x-lg text-sm"></i>
            </button>
          </div>
        </div>

        <!-- CART FOOTER -->
        <div
          v-if="cart.items.length > 0"
          class="p-4 border-t-2 border-konoha-500/40"
        >
          <div class="flex justify-between font-bold mb-3 gap-2">
            <span>Total</span>

            <span
              class="text-konoha-600"
              :class="DarkMode.isDark ? '!text-konoha-400' : ''"
            >
              ${{ cart.totalPrice.toFixed(2) }}
            </span>
          </div>

          <button
            @click="goToCart"
            class="btn-jutsu w-full"
          >
            View Cart
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";

import { useDarkMode } from "../stores/DarkMode";
import { useCart } from "../stores/useCart";
import { useAuth } from "../stores/auth.js";
import { useSearchStore } from "../stores/SearchStore";

import Sidebar from "./SideBar.vue";
import Menu from "./Menu.vue";

// STORES
const auth = useAuth();
const searchStore = useSearchStore();
const DarkMode = useDarkMode();
const cart = useCart();

const router = useRouter();

// STATES
const openCart = ref(false);
const searchOpen = ref(false);
const menuOpen = ref(false);

// SEARCH
const toggleSearch = () => {
  searchOpen.value = !searchOpen.value;
};

const handleSearch = () => {
  if (!searchStore.search.trim()) return;

  searchStore.submitSearch();
  router.push("/shop");

  searchOpen.value = false;
};

// CART
const goToCart = () => {
  openCart.value = false;
  router.push("/cart");
};

// THEME
const t = useDarkMode();
</script>

<style scoped>
/* MOBILE SIDEBAR */
.mobile-sidebar {
  transform: translateX(-100%);
  opacity: 0;
  visibility: hidden;
  transition:
    transform 0.3s ease-in-out,
    opacity 0.3s ease-in-out,
    visibility 0.3s;
}

.mobile-sidebar.is-open {
  transform: translateX(0);
  opacity: 1;
  visibility: visible;
}

/* SEARCH ANIMATION */
.smooth-search-enter-active,
.smooth-search-leave-active {
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
}

.smooth-search-enter-from,
.smooth-search-leave-to {
  opacity: 0;
  transform: translateY(-25px);
}

.smooth-search-enter-to,
.smooth-search-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
