<template>
  <SignIn @changeToSignUp="toggleSignInSignUp" v-if="isSignin" />
  <SignUp @changeToSignIn="toggleSignInSignUp" v-if="!isSignin" />
</template>

<script setup>
import SignIn from "@/components/SignIn.vue";
import { ref } from "vue";
import SignUp from "./components/SignUp.vue";

const isSignin = ref(true);

const toggleSignInSignUp = () => {
  isSignin.value = !isSignin.value
}

</script>

<style scoped></style>
