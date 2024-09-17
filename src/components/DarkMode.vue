<script setup>
import { useDarkModeStore } from "@/stores/darkModeStore";
import { MoonStar, SunMedium } from "lucide-vue-next";

const darkModeStore = useDarkModeStore();
</script>

<template>
  <div :class="darkModeStore.darkMode ? 'dark' : ''">
    <div class="flex items-center justify-center">
      <div class="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          id="darkModeToggle"
          class="hidden"
          v-model="darkModeStore.darkMode"
        />
        <div
          class="flex h-8 w-16 items-center justify-between rounded-full bg-gray-200 p-1 transition-all duration-300 ease-in-out dark:bg-gray-700"
        >
          <div
            class="flex h-6 w-6 transform items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out dark:bg-gray-300"
            :class="{ 'translate-x-8': darkModeStore.darkMode }"
          >
            <SunMedium
              class="text-yellow-400"
              size="17"
              v-if="darkModeStore.darkMode === false"
            />
            <MoonStar
              class="text-[#284394]"
              size="17"
              v-if="darkModeStore.darkMode === true"
            />
          </div>
          <button
            @click="darkModeStore.toggleDarkMode"
            class="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          ></button>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>
