<script setup>
import { useDarkModeStore } from "@/stores/darkModeStore";

const props = defineProps({
  isOpen: Boolean,
  setOpen: Function,
  title: String,
  subTitle: String,
  submit: Function,
  isPending: Boolean,
});

const darkModeStore = useDarkModeStore();
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50"
    :class="darkModeStore.darkMode ? 'dark' : ''"
    @click.self="props.setOpen"
  >
    <div
      class="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg dark:border-2 dark:border-gray-500 dark:bg-gray-800 dark:text-[#94a2b1]"
    >
      <h3 class="text-2xl font-semibold text-green-vee">{{ props.title }}</h3>
      <h5 class="text-base text-gray-500">{{ props.subTitle }}</h5>
      <div class="mb-8 mt-4 text-left">
        <slot />
      </div>
      <div class="mt-4 flex justify-end gap-4">
        <button
          @click="props.setOpen"
          class="rounded bg-transparent px-4 py-2 text-black hover:text-green-vee dark:text-white"
        >
          Close
        </button>
        <button
          @click.prevent="props.submit"
          class="flex items-center justify-center rounded bg-green-vee px-4 py-2 text-white hover:bg-green-700"
        >
          <span v-if="!props.isPending">Edit</span>
          <span v-if="props.isPending" class="spinner"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left: 4px solid white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  display: inline-block;
  margin-right: 8px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
