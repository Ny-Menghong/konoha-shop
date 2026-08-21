<template>
  <div :class="DarkMode.isDark ? 'bg-gray-950 text-white min-h-screen' : 'bg-gray-50 text-black min-h-screen'">

    <div class="max-w-6xl mx-auto px-4 py-10">
      <span class="tag-ninja mb-2">所持品 · Your Gear</span>
      <h1 class="heading-section mt-2 mb-8">Your <span :class="DarkMode.isDark ? 'text-konoha-400' : 'text-konoha-600'">Cart</span></h1>

      <div v-if="cart.items.length === 0" class="text-center py-24 text-gray-400">
        <i class="bi bi-bag text-6xl mb-4 block text-konoha-400"></i>
        <p class="text-xl font-medium mb-4">Your cart is empty</p>
        <RouterLink to="/shop" class="btn-jutsu">
          Browse Products
        </RouterLink>
      </div>

      <div v-else class="grid lg:grid-cols-3 gap-8">
        <!-- Items -->
        <div class="lg:col-span-2">
          <div :class="DarkMode.isDark ? 'bg-ink-800 border border-white/10' : 'bg-white'" class="rounded-2xl p-5 shadow-sm">
            <CartItem v-for="item in cart.items" :key="item.id" :item="item" />
          </div>

          <button @click="cart.clearCart()" class="mt-4 text-sm text-sharingan-500 hover:underline font-medium">
            Clear all items
          </button>
        </div>

        <!-- Summary -->
        <div>
          <div :class="DarkMode.isDark ? 'bg-ink-800 border-white/10' : 'bg-white border-konoha-200'" class="rounded-2xl p-5 shadow-sm sticky top-24 border-2 bg-stripes-naruto">
            <h2 class="title-jutsu text-lg mb-5">Order <span :class="DarkMode.isDark ? 'text-konoha-400' : 'text-konoha-600'">Summary</span></h2>

            <div class="space-y-3 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-400">Items ({{ cart.totalItems }})</span>
                <span>${{ cart.totalPrice.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Shipping</span>
                <span class="text-konoha-600 font-bold" :class="DarkMode.isDark ? '!text-konoha-400' : ''">Free</span>
              </div>
              <div class="border-t pt-3 flex justify-between font-bold text-base" :class="DarkMode.isDark ? 'border-white/15' : 'border-gray-200'">
                <span>Total</span>
                <span class="text-konoha-600" :class="DarkMode.isDark ? '!text-konoha-400' : ''">${{ cart.totalPrice.toFixed(2) }}</span>
              </div>
            </div>

            <RouterLink to="/checkout">
              <button class="btn-jutsu w-full mt-6 !rounded-xl">
                Proceed to Checkout
              </button>
            </RouterLink>

            <RouterLink to="/shop" class="block text-center text-sm text-gray-400 hover:underline mt-3">
              Continue Shopping
            </RouterLink>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import CartItem from '../components/CartItem.vue'
import { useCart } from '../stores/useCart'
import { useDarkMode } from '../stores/DarkMode'
import { RouterLink } from 'vue-router'

const cart = useCart()
const DarkMode = useDarkMode()
</script>
