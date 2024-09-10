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
            Sign in to your account
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="submitForm">
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Your email</label
              >
              <Field
                type="email"
                name="email"
                id="email"
                v-model="form.email"
                as="input"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-vee focus:border-green-vee block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required=""
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
                name="password"
                as="input"
                id="password"
                v-model="form.password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-vee focus:border-green-vee block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
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
              class="w-full text-white bg-green-vee hover:bg-green-vee focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700"
            >
              Sign in
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?
              <a
                href="#"
                class="font-medium text-green-vee hover:underline dark:text-green-vee"
                >Sign up</a
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useForm, Field, ErrorMessage } from "vee-validate";
import { ref } from "vue";
import * as yup from 'yup';

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

const submitForm = handleSubmit((values) => {
  console.log("Form Values:", values);
});
</script>
