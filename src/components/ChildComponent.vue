<template>
  <h2>Child Component</h2>
  <p>{{ counter.count }}</p>
</template>

<script setup>
import { useCounterStore } from "@/stores/counterStore";

const counter = useCounterStore();
</script>
