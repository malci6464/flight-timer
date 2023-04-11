<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="w-full flex flex-row items-center">
      <img alt="plane" class="logo mx-4" src="@/assets/plane-01.jpg" width="125" />

      <h1 class="text-2xl mx-4">Flight Timer</h1>

      <nav>
        <RouterLink to="/" class="mx-4">Home</RouterLink>
        <RouterLink to="/history" class="mx-4">History</RouterLink>
        <RouterLink to="/about" class="mx-4">About</RouterLink>
      </nav>
    </header>

    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <BaseLayout>
            <component :is="Component" />
          </BaseLayout>
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}
</style>
