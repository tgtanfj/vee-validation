<template>
  <section class="bg-green-vee dark:bg-gray-900">
    <div
      class="relative flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div
        class="absolute inset-0 z-10 h-full w-full bg-green-vee flex flex-col items-center justify-center bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"
      >
        <a
          href="#"
          class="flex items-center mb-6 text-4xl font-bold dark:text-green-vee text-white"
        >
          VeePiniaVueRouter
        </a>
        <div
          class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
        >
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1
              class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
            >
              <span>Sign in to your account</span>
            </h1>
            <form class="space-y-2 md:space-y-4" @submit.prevent="submitForm">
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Your email</label
                >
                <Field
                  type="email"
                  name="email"
                  :disabled="loading"
                  id="email"
                  v-model="form.email"
                  as="input"
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-vee focus:border-green-vee block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                />
                <ErrorMessage class="text-red-600 text-sm" name="email" />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Password</label
                >
                <Field
                  type="password"
                  :disabled="loading"
                  name="password"
                  as="input"
                  id="password"
                  v-model="form.password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-vee focus:border-green-vee block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  @input="checkPasswordStrength"
                />
                <ErrorMessage class="text-red-600 text-sm" name="password" />
              </div>
              <div class="flex items-center justify-end">
                <a
                  href="#"
                  class="text-sm font-medium text-green-vee hover:underline dark:text-green-vee"
                  >Forgot password?</a
                >
              </div>
              <button
                type="submit"
                :disabled="loading"
                class="w-full flex items-center justify-center text-white bg-green-vee hover:bg-green-vee focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700"
              >
                <span v-if="loading === true" class="spinner"></span>
                <span v-if="!loading">Sign in</span>
              </button>
              <p v-if="success" class="success-message">
                "Sign in successfully!"
              </p>
              <p v-if="isError.message !== ''" class="text-red-500">
                {{ isError.message }}
              </p>
              <p
                class="text-sm font-light text-gray-500 dark:text-gray-400 flex items-center gap-1"
              >
                <span>Don’t have an account yet?</span>
                <span
                  @click="handleChangeToSignUp"
                  class="font-medium text-green-vee hover:underline dark:text-green-vee cursor-pointer"
                  >Sign up</span
                >
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useForm, Field, ErrorMessage, useResetForm } from "vee-validate";
import { ref } from "vue";
import * as yup from "yup";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import axiosConfig from "@/config/axiosConfig";

const router = useRouter();
const userStore = useUserStore();

const apiCall = import.meta.env.VITE_BACKEND_API;

const handleChangeToSignUp = () => {
  router.push("/sign-up");
};

const resetForm = useResetForm();
const loading = ref(false);
const success = ref(false);
const isError = ref("");

const schema = yup.object({
  email: yup.string().required("Email is required").email("Email is not valid"),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

const { handleSubmit, values: form } = useForm({
  validationSchema: schema,
});

const storeTokens = (token, refreshToken) => {
  userStore.setToken(token);
  userStore.setRefreshToken(refreshToken);
};

const submitForm = handleSubmit(async (values) => {
  try {
    isError.value = "";
    const response = await axiosConfig.post(
      `${apiCall}/api/auth/login`,
      JSON.stringify({
        email: values.email,
        password: values.password,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { token, refreshToken } = response.data;

    storeTokens(token, refreshToken);

    loading.value = true;
    success.value = true;
    resetForm();
    loading.value = false;
    router.push("/home");
    userStore.setUser(response.data.user);
    userStore.setIsAuth(true)
  } catch (error) {
    console.error(
      "Error during sign in:",
      error.response ? error.response.data : error.message
    );
    isError.value = error.response ? error.response.data : error.message;
  }
});
</script>

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

.success-message {
  color: green;
  font-weight: bold;
}
</style>
