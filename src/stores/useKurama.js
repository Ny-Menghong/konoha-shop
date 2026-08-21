import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useKurama = defineStore('kurama', () => {
  const flights = ref([])
  let seq = 0

  // Spawn a Kurama flight from a DOM element to the cart icon
  function fly(fromEl) {
    const target = document.getElementById('cart-icon-anchor')
    if (!fromEl || !target) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const from = fromEl.getBoundingClientRect()
    const to = target.getBoundingClientRect()

    flights.value.push({
      id: ++seq,
      fx: from.left + from.width / 2,
      fy: from.top + from.height / 2,
      tx: to.left + to.width / 2,
      ty: to.top + to.height / 2,
    })
  }

  // Called when the flight animation ends — remove fox + bounce cart icon
  function land(id) {
    flights.value = flights.value.filter((f) => f.id !== id)

    const target = document.getElementById('cart-icon-anchor')
    if (target) {
      target.classList.remove('kurama-bump')
      void target.offsetWidth
      target.classList.add('kurama-bump')
      setTimeout(() => target.classList.remove('kurama-bump'), 700)
    }
  }

  return { flights, fly, land }
})
