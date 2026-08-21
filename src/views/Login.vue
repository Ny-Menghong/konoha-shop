<template>
  <div
    :class="DarkMode.isDark ? 'bg-gray-950 text-white' : 'bg-gray-50 text-black'"
    class="min-h-screen flex items-center justify-center px-4"
  >

    <!-- Card -->
    <div
      :class="DarkMode.isDark ? 'bg-ink-800 border-white/10' : 'bg-white border-konoha-200'"
      class="w-full max-w-md rounded-2xl shadow-xl p-8 border-t-4 !border-t-konoha-500"
    >

      <!-- Back -->
      <RouterLink
        to="/"
        class="text-konoha-600 hover:text-konoha-500 inline-flex items-center gap-2 mb-4 text-sm font-bold"
        :class="DarkMode.isDark ? '!text-konoha-400' : ''"
      >
        <i class="bi bi-arrow-bar-left"></i>
        Back to Home
      </RouterLink>

      <!-- Title -->
      <h1 class="title-jutsu text-3xl mb-1">
        Welcome <span :class="DarkMode.isDark ? 'text-konoha-400' : 'text-konoha-600'">back</span>
      </h1>

      <p class="text-sm text-gray-400 mb-6">
        Sign in to continue your mission, shinobi.
      </p>

      <!-- Form -->
      <div class="space-y-4">

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium mb-1">
            Email
          </label>

          <input
            v-model="email"
            type="email"
            placeholder="you@example.com"
            class="w-full border rounded-xl px-4 py-3 text-sm outline-none transition focus:border-konoha-500 focus:ring-2 focus:ring-konoha-500/20"
            :class="
              DarkMode.isDark
                ? 'bg-white/5 border-white/15 text-white placeholder-gray-500'
                : 'bg-gray-50 border-gray-200'
            "
          />
        </div>

        <!-- Password -->
        <div>
          <label class="block text-sm font-medium mb-1">
            Password
          </label>

          <div class="relative">

            <input
              v-model="password"
              :type="showPass ? 'text' : 'password'"
              placeholder="••••••••"
              class="w-full border rounded-xl px-4 py-3 text-sm outline-none transition pr-10 focus:border-konoha-500 focus:ring-2 focus:ring-konoha-500/20"
              :class="
                DarkMode.isDark
                  ? 'bg-white/5 border-white/15 text-white placeholder-gray-500'
                  : 'bg-gray-50 border-gray-200'
              "
            />

            <!-- Show Password -->
            <button
              @click="showPass = !showPass"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <i :class="showPass ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
            </button>

          </div>
        </div>

        <!-- Remember -->
        <div class="flex justify-between items-center text-sm">

          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              v-model="remember"
              class="accent-konoha-500 w-4 h-4"
            />
            Remember me
          </label>

          <a href="#" class="text-konoha-600 hover:text-konoha-500 font-bold" :class="DarkMode.isDark ? '!text-konoha-400' : ''">
            Forgot password?
          </a>

        </div>

        <!-- Login Button -->
        <button
          @click="login"
          class="btn-jutsu w-full"
        >
          Sign In
        </button>

        <!-- Test Account -->
        <div class="rounded-xl border-2 border-dashed p-4 transition" :class="DarkMode.isDark ? 'border-konoha-500/40 bg-konoha-500/5' : 'border-konoha-500/50 bg-konoha-50'">
          <div class="flex items-center justify-between mb-1.5">
            <p class="text-xs font-bold uppercase tracking-widest text-konoha-600" :class="DarkMode.isDark ? '!text-konoha-400' : ''">
              <i class="bi bi-lightning-charge-fill"></i>
              Test Account
            </p>
            <span class="font-jp text-[10px] uppercase tracking-widest opacity-40">体験 · Demo</span>
          </div>

          <p class="text-xs font-mono mb-3" :class="DarkMode.isDark ? 'text-white/60' : 'text-gray-500'">
            {{ auth.testUser.email }}&nbsp;/&nbsp;{{ auth.testUser.password }}
          </p>

          <div class="flex gap-2">
            <button
              @click="fillTestForm"
              class="flex-1 text-xs font-bold py-2 rounded-lg border-2 border-konoha-500 text-konoha-600 hover:bg-konoha-500 hover:text-white transition cursor-pointer"
              :class="DarkMode.isDark ? '!text-konoha-400 hover:!text-white' : ''"
            >
              <i class="bi bi-input-cursor-text"></i>
              Fill Form
            </button>
            <button
              @click="loginTestUser"
              class="flex-1 text-xs font-bold py-2 rounded-lg bg-konoha-600 text-white hover:bg-konoha-500 transition shadow-md shadow-konoha-600/30 cursor-pointer"
            >
              <i class="bi bi-rocket-takeoff"></i>
              Instant Login
            </button>
          </div>
        </div>

      </div>

      <!-- Register -->
      <p class="text-center text-sm text-gray-400 mt-6">
        Don't have an account?

        <RouterLink
          to="/register"
          class="text-konoha-600 hover:text-konoha-500 font-bold" :class="DarkMode.isDark ? '!text-konoha-400' : ''"
        >
          Sign up
        </RouterLink>
      </p>

    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useDarkMode } from '../stores/DarkMode'
import { useAuth } from '../stores/auth'

const DarkMode = useDarkMode()
const auth = useAuth()
const toast = useToast()

const email = ref('')
const password = ref('')
const remember = ref(false)
const showPass = ref(false)
// Login Function
const login = () => {
  // Validation
  if (!email.value || !password.value) {
    toast.error('Please fill all fields')
    return
  }

  // Login
  auth.login(
    email.value,
    password.value
  )
  // Remember Me
  if (remember.value) {
    localStorage.setItem('rememberEmail', email.value)
  } else {
    localStorage.removeItem('rememberEmail')
  }
}

// Test account: fill the form with demo credentials
const fillTestForm = () => {
  email.value = auth.testUser.email
  password.value = auth.testUser.password
}

// Test account: seed + login in one click
const loginTestUser = () => {
  auth.seedTestUser()
  auth.login(auth.testUser.email, auth.testUser.password)
}
</script>