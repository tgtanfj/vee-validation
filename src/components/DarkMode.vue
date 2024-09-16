<script setup>
import { useDarkModeStore } from "@/stores/darkModeStore";
import { MoonStar, SunMedium } from "lucide-vue-next";

const darkModeStore = useDarkModeStore();
</script>

<template>
  <div  :class="darkModeStore.darkMode ? 'dark' : ''">
    <div class="flex items-center justify-center">
      <div class="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          id="darkModeToggle"
          class="hidden"
          v-model="darkModeStore.darkMode"
        />
        <div
          class="flex items-center justify-between w-16 h-8 bg-gray-200 dark:bg-gray-700 rounded-full p-1 transition-all duration-300 ease-in-out"
        >
          <div
            class="w-6 h-6 bg-white dark:bg-gray-300 rounded-full flex items-center justify-center shadow-md transform transition-transform duration-300 ease-in-out"
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
            class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          ></button>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>
