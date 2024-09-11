<template>
  <div class="mx-[100px]">
    <div>You are authenticated!</div>
    <div>
      <h1>Demo Pinia</h1>
      <p>{{ couter.count }}</p>
      <div>
        <button
          @click="incre"
          class="p-1 bg-green-vee rounded-lg text-center text-white"
        >
          +
        </button>
        <button
          @click="decre"
          class="p-1 bg-green-vee rounded-lg text-center text-white"
        >
          -
        </button>
      </div>
    </div>
    <div>
      <button
        @click="logOut"
        class="p-1 bg-green-vee rounded-lg text-center text-white"
      >
        Log out
      </button>

      <button
        @click="api"
        class="p-1 bg-green-vee rounded-lg text-center text-white"
      >
        test api
      </button>
    </div>
    <div>
      <p>User Info from Pinia: {{ user.user }}</p>
    </div>
    <ChildComponent />
  </div>
</template>

<script setup>
import { useCounterStore } from "@/stores/counterStore";
import { useRouter } from "vue-router";
import ChildComponent from "./ChildComponent.vue";
import { useUserStore } from "@/stores/userStore";
import axiosConfig from "@/config/axiosConfig";

const apiCall = import.meta.env.VITE_BACKEND_API;

const router = useRouter();
const couter = useCounterStore();
const user = useUserStore();

const decre = () => {
  couter.decrement();
};

const incre = () => {
  couter.increment();
};

const api = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axiosConfig.get(`${apiCall}/api/user/get-users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("res", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching users:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const logOut = () => {
  localStorage.setItem("token", "");
  localStorage.setItem("refresh_token", "");
  router.push("/sign-in");
};
</script>
