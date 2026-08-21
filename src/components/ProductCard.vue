<template>
  <div
    ref="cardRef"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
    @click="goToDetail"
    class="relative group rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 hover:-translate-y-1.5 border border-transparent hover:border-konoha-500/50"
    :class="[
      DarkMode.isDark
        ? 'bg-ink-800 text-white'
        : 'bg-white text-black',

      isVisible
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-10'
    ]"
    style="box-shadow: 0 2px 12px rgba(10,8,13,0.08)"
  >
    <!-- Image Container -->
    <div class="relative overflow-hidden aspect-[3/4]">
      <img
        :src="hovered && product.image[1] ? product.image[1] : product.image[0]"
        :alt="product.type"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <!-- Badges -->
      <div class="absolute top-3 left-3 flex flex-col gap-1">
        <span
          v-if="product.isNewIn"
          class="bg-ink-950/90 backdrop-blur text-konoha-400 border border-konoha-500/40 text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider"
        >
          New In
        </span>

        <span
          v-if="product.discount > 0"
          class="bg-sharingan-600 text-white text-xs px-2.5 py-0.5 rounded-full font-bold"
        >
          -{{ product.discount }}%
        </span>
      </div>

      <!-- Quick Add Button -->
      <div
        class="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
      >
        <button
          @click.stop="addToCart($event)"
          class="w-full py-3 bg-konoha-600 text-white text-sm font-bold tracking-widest uppercase transition hover:bg-konoha-500"
        >
          + Add to Cart
        </button>
      </div>

      <!-- Wishlist -->
      <button
        class="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition hover:scale-110 hover:bg-sharingan-500 hover:text-white"
      >
        <i class="bi bi-heart text-gray-600 text-sm"></i>
      </button>
    </div>

    <!-- Info -->
    <div class="p-3">
      <p class="text-xs line-clamp-1 text-gray-400 uppercase tracking-wider font-semibold mb-1">
        {{ product.name }}
      </p>
      <p class="text-sm font-medium truncate">
        {{ product.category_for }} · {{ product.type }}
      </p>

      <div class="flex items-center gap-2 mt-1">
        <span
          v-if="product.discount > 0"
          class="text-gray-400 line-through text-xs"
        >
          ${{ product.price }}
        </span>

        <span
          class="font-bold text-sm"
          :class="product.discount > 0 ? 'text-sharingan-500' : ''"
        >
          ${{ discountedPrice }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useDarkMode } from '../stores/DarkMode'
import { useCart } from '../stores/useCart'
import { useToast } from 'vue-toastification'
import { useAuth } from '../stores/auth'
import { useKurama } from '../stores/useKurama'

const props = defineProps({
  product: Object
})

const auth = useAuth()
const DarkMode = useDarkMode()
const cart = useCart()
const kurama = useKurama()
const router = useRouter()
const toast = useToast()

const hovered = ref(false)

const cardRef = ref(null)
const isVisible = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
      }
    },
    {
      threshold: 0.2
    }
  )

  if (cardRef.value) {
    observer.observe(cardRef.value)
  }
})

const goToDetail = () => {
  router.push(`/product/${props.product.id}`)
}

const discountedPrice = computed(() => {
  const p = props.product

  return p.discount > 0
    ? (p.price - (p.price * p.discount) / 100).toFixed(2)
    : p.price.toFixed(2)
})

const addToCart = (e) => {
  if (!auth.isLogin) {
    router.push('/register')
    toast.error(
      'Our application require you to have acc(just example acc)',
      {
        timeout: 2000,
        position: 'bottom-right',
        pauseOnHover: true,
        closeOnClick: false,
        draggable: true,
        
      }
    )

    return
  }

  cart.addItem(props.product)

  kurama.fly(e?.currentTarget)

  toast.success(`${props.product.item} added to cart 🛒`, {
    timeout: 2000,
    position: 'bottom-right',
    pauseOnHover: true,
    closeOnClick: true,
    draggable: true
  })
}
</script>