<template>
  <Teleport to="body">
    <div class="fixed inset-0 pointer-events-none z-[9999]">
      <div
        v-for="f in kurama.flights"
        :key="f.id"
        class="kurama-x"
        :style="{ '--fx': f.fx + 'px', '--tx': f.tx + 'px' }"
      >
        <div
          class="kurama-y"
          :style="{ '--fy': f.fy + 'px', '--ty': f.ty + 'px' }"
          @animationend="kurama.land(f.id)"
        >
          <!-- Chibi Kurama -->
          <svg class="kurama-svg" width="72" height="60" viewBox="0 0 120 100" fill="none">
            <!-- 9 tails -->
            <path d="M52 58 C 34 50, 20 38, 12 18" stroke="#ea580c" stroke-width="7" stroke-linecap="round" />
            <path d="M52 62 C 32 60, 16 52, 6 36" stroke="#ff6b1a" stroke-width="7" stroke-linecap="round" />
            <path d="M52 66 C 33 70, 15 68, 4 56" stroke="#ea580c" stroke-width="7" stroke-linecap="round" />
            <path d="M54 70 C 38 78, 22 82, 10 76" stroke="#ff6b1a" stroke-width="7" stroke-linecap="round" />
            <path d="M56 74 C 46 84, 32 92, 22 90" stroke="#ea580c" stroke-width="6" stroke-linecap="round" />
            <path d="M50 55 C 40 42, 32 30, 30 14" stroke="#ff8a3d" stroke-width="6" stroke-linecap="round" />
            <path d="M53 57 C 37 44, 24 26, 24 8" stroke="#ea580c" stroke-width="5" stroke-linecap="round" />
            <path d="M51 60 C 28 52, 12 34, 10 14" stroke="#ff8a3d" stroke-width="5" stroke-linecap="round" />
            <path d="M53 63 C 26 62, 8 48, 2 30" stroke="#ff6b1a" stroke-width="4.5" stroke-linecap="round" />
            <!-- body -->
            <ellipse cx="72" cy="64" rx="19" ry="14" fill="#ff6b1a" />
            <!-- legs -->
            <rect x="60" y="72" width="7" height="10" rx="3" fill="#ea580c" />
            <rect x="76" y="72" width="7" height="10" rx="3" fill="#ea580c" />
            <!-- head -->
            <circle cx="88" cy="42" r="15" fill="#ff6b1a" />
            <!-- ears -->
            <path d="M77 32 L 74 16 L 87 27 Z" fill="#ea580c" />
            <path d="M99 32 L 103 17 L 89 27 Z" fill="#ea580c" />
            <!-- eyes (sharingan red) -->
            <circle cx="83" cy="41" r="3" fill="#b91c1c" />
            <circle cx="94" cy="41" r="3" fill="#b91c1c" />
            <!-- snout -->
            <circle cx="97" cy="49" r="5" fill="#fff5ec" />
            <circle cx="99" cy="47.5" r="1.8" fill="#1c2939" />
            <!-- whiskers -->
            <path d="M74 45 l -9 -2 M74 49 l -9 2 M102 45 l 9 -2 M102 49 l 9 2" stroke="#1c2939" stroke-width="1.4" stroke-linecap="round" />
          </svg>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { useKurama } from '../stores/useKurama'

const kurama = useKurama()
</script>

<style scoped>
.kurama-x {
  position: fixed;
  left: 0;
  top: 0;
  transform: translateX(var(--fx));
  animation: kurama-fly-x 0.9s cubic-bezier(0.45, 0, 0.55, 1) forwards;
}

.kurama-y {
  position: fixed;
  left: 0;
  top: 0;
  transform: translateY(var(--fy));
  /* arcs upward mid-flight then dives into the cart */
  animation: kurama-fly-y 0.9s cubic-bezier(0.25, -0.45, 0.4, 1) forwards;
}

.kurama-svg {
  transform-origin: center;
  animation: kurama-wiggle 0.9s ease-in-out;
  filter: drop-shadow(0 8px 18px rgba(234, 88, 12, 0.5));
}

@keyframes kurama-fly-x {
  from {
    transform: translateX(var(--fx));
  }
  to {
    transform: translateX(var(--tx));
  }
}

@keyframes kurama-fly-y {
  0% {
    transform: translateY(var(--fy)) scale(1);
  }
  35% {
    transform: translateY(calc((var(--fy) + var(--ty)) / 2 - 140px)) scale(1.15);
  }
  100% {
    transform: translateY(var(--ty)) scale(0.35);
    opacity: 0.85;
  }
}

@keyframes kurama-wiggle {
  0%,
  100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-10deg);
  }
  75% {
    transform: rotate(10deg);
  }
}
</style>
