<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
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

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
</script>
