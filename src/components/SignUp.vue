<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <a
        href="#"
        class="flex items-center mb-6 text-4xl font-bold text-green-vee dark:text-green-vee"
      >
        VeeValidate
      </a>
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Sign up your new account
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="submitForm">
            <div>
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Your name</label
              >
              <Field
                :disabled="loading"
                type="text"
                name="name"
                id="name"
                v-model="form.name"
                as="input"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-vee focus:border-green-vee block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John Doe"
              />
              <ErrorMessage class="text-red-600 text-sm" name="name" />
            </div>
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Your email</label
              >
              <Field
                :disabled="loading"
                type="email"
                name="email"
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
                :disabled="loading"
                type="password"
                name="password"
                as="input"
                id="password"
                v-model="form.password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-vee focus:border-green-vee block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                @input="checkPasswordStrength"
              />
              <ErrorMessage class="text-red-600 text-sm" name="password" />
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
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Confirm Password</label
              >
              <Field
                :disabled="loading"
                type="password"
                name="rePassword"
                as="input"
                id="rePassword"
                v-model="form.rePassword"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-vee focus:border-green-vee block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <ErrorMessage class="text-red-600 text-sm" name="rePassword" />
            </div>
            <button
              :disabled="loading"
              type="submit"
              class="w-full flex items-center gap-2 justify-center text-white bg-green-vee hover:bg-green-vee focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700"
            >
              <span v-if="loading === true" class="spinner"></span>
              <span v-if="!loading">Sign up</span>
            </button>
            <p v-if="success" class="success-message">Sign up successfully!</p>
            <p v-if="isError.message !== ''" class="text-red-500">
              {{ isError.message }}
            </p>
            <p
              class="text-sm font-light text-gray-500 dark:text-gray-400 flex items-center gap-1"
            >
              <span>Already have an account?</span>
              <span
                @click="handleChangeToSignIn"
                class="font-medium text-green-vee hover:underline dark:text-green-vee cursor-pointer"
                >Sign in
              </span>
            </p>
          </form>
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

const apiCall = import.meta.env.VITE_BACKEND_API;

const router = useRouter();

const passwordStrength = ref(null);

const loading = ref(false);
const success = ref(false);
const isError = ref(false);

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

const storeTokens = (token, refreshToken) => {
  localStorage.setItem("token", token);
  localStorage.setItem("refresh_token", refreshToken);
};

const submitForm = handleSubmit(async (values) => {
  try {
    isError.value = "";
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
      }
    );

    const { token, refreshToken } = response.data;

    storeTokens(token, refreshToken);

    loading.value = true;
    resetForm();
    success.value = true;
    loading.value = false;
    passwordStrength.value = 0;
  } catch (error) {
    console.error(
      "Error during sign up:",
      error.response ? error.response.data : error.message
    );
    isError.value = error.response ? error.response.data : error.message;
  }
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
</style>
