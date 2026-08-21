<template>
  <footer class="relative overflow-hidden bg-ink-950 text-white border-t border-konoha-500/30">
    <div class="absolute inset-0 bg-stripes-naruto"></div>
    <span class="font-jp font-black absolute -left-4 bottom-0 text-[12rem] leading-none text-white/[0.02] select-none pointer-events-none hidden md:block">里</span>

    <div class="relative max-w-7xl mx-auto px-6 py-16">
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-10 mb-12">
        <!-- Brand -->
        <div class="col-span-3 md:col-span-1">
          <div class="flex items-center gap-3 mb-4">
            <img width="40" src="https://images.seeklogo.com/logo-png/21/2/konoha-logo-png_seeklogo-213120.png" alt="konoha" class="drop-shadow-[0_0_10px_rgba(255,107,26,0.6)]" />
            <h2 class="title-jutsu text-3xl text-konoha-400">KONOHA SHOP</h2>
          </div>
          <p class="text-xs text-white/50 leading-relaxed mb-6">
            Gear forged in the Hidden Leaf Village. Premium streetwear for modern shinobi — dattebayo.
          </p>
          <div class="flex gap-4">
            <a v-for="social in socials" :key="social" href="#"
              class="w-9 h-9 border border-white/15 rounded-full flex items-center justify-center text-white/40 hover:border-konoha-500 hover:text-konoha-400 hover:shadow-[0_0_16px_rgba(255,107,26,0.5)] transition-all duration-300">
              {{ social[0] }}
            </a>
          </div>
        </div>

        <!-- Links -->
        <div v-for="section in footerLinks" :key="section.title">
          <h4 class="font-jp text-xs tracking-[0.25em] uppercase text-konoha-500 mb-5">{{ section.title }}</h4>
          <ul class="space-y-3">
            <li v-for="link in section.links" :key="link.label">
              <RouterLink :to="link.to" class="text-xs text-white/50 hover:text-konoha-400 transition-colors duration-200">
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Newsletter -->
      <div class="border-t border-white/10 pt-10 mb-10">
        <div class="max-w-md">
          <h4 class="title-jutsu text-xl mb-2">Join the <span class="text-konoha-400">Inner Circle</span></h4>
          <p class="text-xs text-white/40 mb-5">First access to new drops, exclusive offers, and mission intel.</p>
          <div class="flex gap-0">
            <input type="email" placeholder="Your email address"
              class="flex-1 bg-white/5 border border-white/15 rounded-l-full px-4 py-3 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-konoha-500 transition-colors" />
            <button class="bg-konoha-600 hover:bg-konoha-500 text-white px-6 py-3 text-xs tracking-widest uppercase font-bold rounded-r-full transition-all shadow-lg shadow-konoha-600/30">
              Join
            </button>
          </div>
        </div>
      </div>

      <!-- Bottom -->
      <div class="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/10 pt-6">
        <p class="text-xs text-white/30">© 2026 KONOHA SHOP · 木ノ葉隠れの里 · All rights reserved.</p>
        <div class="flex gap-6">
          <a v-for="item in ['Privacy', 'Terms', 'Cookies']" :key="item" href="#"
            class="text-xs text-white/30 hover:text-konoha-400 transition-colors">{{ item }}</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const socials = ['Instagram', 'Pinterest', 'Twitter']

const footerLinks = [
  {
    title: 'Shop',
    links: [
      { label: 'New Arrivals', to: '/shop?filter=new' },
      { label: 'Best Sellers', to: '/shop' },
      { label: 'Sale', to: '/shop?filter=sale' },
      { label: 'Collections', to: '/shop' },
    ]
  },
  {
    title: 'Help',
    links: [
      { label: 'Size Guide', to: '/' },
      { label: 'Shipping Info', to: '/' },
      { label: 'Returns', to: '/' },
      { label: 'Contact Us', to: '/' },
    ]
  },
  {
    title: 'Account',
    links: [
      { label: 'Sign In', to: '/login' },
      { label: 'Register', to: '/register' },
      { label: 'My Orders', to: '/profile' },
      { label: 'Wishlist', to: '/wishlist' },
    ]
  }
]
</script>
