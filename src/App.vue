<template>
  <router-view/>
</template>

<script setup>
import SignIn from "@/components/SignIn.vue";
import { ref } from "vue";
import SignUp from "./components/SignUp.vue";

const isSignin = ref(true);

</script>

<style scoped></style>
