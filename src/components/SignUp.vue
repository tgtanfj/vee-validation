<template>
  <section
    :class="darkmode.darkMode ? 'dark' : ''"
    class="bg-green-vee dark:bg-gray-900"
  >
    <div
      class="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0"
    >
      <div
        class="absolute inset-0 z-10 flex h-full w-full flex-col items-center justify-center bg-green-vee bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-black dark:bg-[radial-gradient(#43464f_1px,transparent_1px)]"
      >
        <div class="fixed right-6 top-6">
          <DarkMode />
        </div>
        <div class="max-w-[500px]">
          <p
            class="text mb-6 flex items-center text-4xl font-bold text-white dark:text-white"
          >
            VeePiniaVueRouter
          </p>
        </div>
        <div
          class="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0"
        >
          <div class="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1
              class="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl"
            >
              Sign up your new account
            </h1>
            <form class="space-y-2 md:space-y-4" @submit.prevent="submitForm">
              <div>
                <label
                  for="name"
                  class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >Your name</label
                >
                <Field
                  :disabled="isPending"
                  type="text"
                  name="name"
                  id="name"
                  v-model="form.name"
                  as="input"
                  class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-green-vee focus:ring-green-vee dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="John Doe"
                />
                <ErrorMessage class="text-sm text-red-600" name="name" />
              </div>
              <div>
                <label
                  for="email"
                  class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >Your email</label
                >
                <Field
                  :disabled="isPending"
                  type="email"
                  name="email"
                  id="email"
                  v-model="form.email"
                  as="input"
                  class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-green-vee focus:ring-green-vee dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="name@company.com"
                />
                <ErrorMessage class="text-sm text-red-600" name="email" />
              </div>
              <div>
                <label
                  for="password"
                  class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >Password</label
                >
                <Field
                  :disabled="isPending"
                  type="password"
                  name="password"
                  as="input"
                  id="password"
                  v-model="form.password"
                  placeholder="••••••••"
                  class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-green-vee focus:ring-green-vee dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  @input="checkPasswordStrength"
                />
                <ErrorMessage class="text-sm text-red-600" name="password" />
                <div v-if="passwordStrength">
                  <div class="progress-bar-container">
                    <div
                      class="progress-bar"
                      :style="{
                        width: `${passwordStrength.percentage}%`,
                        backgroundColor: passwordStrength.color,
                      }"
                    ></div>
                  </div>
                  <p
                    class="password-strength-text"
                    :style="{ color: passwordStrength.color }"
                  >
                    {{ passwordStrength.label }}
                  </p>
                </div>
              </div>
              <div>
                <label
                  for="rePassword"
                  class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >Confirm Password</label
                >
                <Field
                  :disabled="isPending"
                  type="password"
                  name="rePassword"
                  as="input"
                  id="rePassword"
                  v-model="form.rePassword"
                  placeholder="••••••••"
                  class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-green-vee focus:ring-green-vee dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                />
                <ErrorMessage class="text-sm text-red-600" name="rePassword" />
              </div>
              <button
                :disabled="isPending"
                type="submit"
                class="flex w-full items-center justify-center gap-2 rounded-lg bg-green-vee px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-vee focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700"
              >
                <span v-if="isPending === true" class="spinner"></span>
                <span v-if="!isPending">Sign up</span>
              </button>
              <p v-if="isSuccess" class="success-message">
                Sign up successfully!
              </p>
              <p v-if="isError" class="text-red-500">
                {{
                  error.response ? error.response.data.message : error.message
                }}
              </p>
              <p
                class="flex items-center gap-1 text-sm font-light text-gray-500 dark:text-gray-400"
              >
                <span>Already have an account?</span>
                <span
                  @click="handleChangeToSignIn"
                  class="cursor-pointer font-medium text-green-vee hover:underline dark:text-green-vee"
                  >Sign in
                </span>
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
import zxcvbn from "zxcvbn";
import { useRouter } from "vue-router";
import axiosConfig from "@/config/axiosConfig";
import DarkMode from "./DarkMode.vue";
import { useDarkModeStore } from "@/stores/darkModeStore";
import { useMutation } from "@tanstack/vue-query";

const apiCall = import.meta.env.VITE_BACKEND_API;

const router = useRouter();
const darkmode = useDarkModeStore();

const passwordStrength = ref(null);

const handleChangeToSignIn = () => {
  router.push("/sign-in");
};

const schema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters long"),
  email: yup.string().required("Email is required").email("Email is not valid"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
  rePassword: yup
    .string()
    .required("Password is required")
    .min(6, "Confirm password must be at least 6 characters long")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const checkPasswordStrength = () => {
  const result = zxcvbn(form.password);
  const score = result.score;

  const strengthLevels = [
    { label: "Very Weak", percentage: 25, color: "red" },
    { label: "Weak", percentage: 50, color: "orange" },
    { label: "Moderate", percentage: 75, color: "yellow" },
    { label: "Strong", percentage: 100, color: "#1eb582" },
  ];

  passwordStrength.value = strengthLevels[score] || strengthLevels[0];
};

const {
  handleSubmit,
  values: form,
  resetForm,
} = useForm({
  validationSchema: schema,
});

const { isPending, isError, error, isSuccess, mutate } = useMutation({
  mutationFn: async (values) => {
    const response = await axiosConfig.post(
      `${apiCall}/api/auth/register`,
      {
        name: values.name,
        email: values.email,
        password: values.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  },
  onSuccess: (data) => {
    resetForm();
    passwordStrength.value = 0;
  },
  onError: (error) => {
    console.log("error", error.response.data);
    console.error(
      "Error during sign in:",
      error.response ? error.response.data : error.message,
    );
  },
});

const submitForm = handleSubmit(async (values) => {
  mutate(values);
});
</script>

<style scoped>
.progress-bar-container {
  width: 100%;
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  margin-top: 20px;
}

.progress-bar {
  height: 100%;
  border-radius: 5px;
  transition: width 0.3s ease-in-out;
}

.password-strength-text {
  margin-top: 5px;
}

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

.text {
  letter-spacing: 10px;
  border-right: 5px solid;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  animation:
    typing 2s steps(17),
    cursor 0.4s step-end infinite alternate;
}

@keyframes typing {
  from {
    width: 0;
  }
}

@keyframes cursor {
  50% {
    border-color: transparent;
  }
}
</style>
