<template>
  <div class="w-full h-screen">
    <button
      @click="toggleSidebar"
      data-drawer-target="default-sidebar"
      data-drawer-toggle="default-sidebar"
      aria-controls="default-sidebar"
      type="button"
      class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    >
      <span class="sr-only">Open sidebar</span>
      <svg
        class="w-6 h-6"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clip-rule="evenodd"
          fill-rule="evenodd"
          d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
        ></path>
      </svg>
    </button>

    <aside
      id="default-sidebar"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
      class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 shadow-xl"
      aria-label="Sidebar"
    >
      <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <CircleX
          v-if="sidebarOpen"
          @click="toggleSidebar"
          :stroke-width="1.25"
          class="text-gray-500 ml-auto hover:text-gray-700 cursor-pointer"
        />
        <ul class="space-y-2 font-medium">
          <li class="my-4">
            <p
              @click="router.push('home')"
              class="text-center text-xl text-green-vee cursor-pointer"
            >
              VeePiniaVueRouter
            </p>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group"
              :class="{ 'bg-gray-200': selection === 'updateUser' }"
            >
              <UserPen size="25" class="text-gray-500" />
              <span class="ms-3">Update User</span>
            </a>
          </li>
          <li @click="logOut" class="cursor-pointer">
            <p
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <LogOut size="25" class="text-gray-500" />
              <span class="ms-3">Log Out</span>
            </p>
          </li>
        </ul>
      </div>
    </aside>

    <div class="p-4 sm:ml-64">
      <form
        class="p-4 space-y-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-10">
          <div class="flex flex-col gap-2">
            <p>Name</p>
            <Field
              as="input"
              name="name"
              class="p-2 border-2 border-gray-200 rounded-lg focus:outline-none"
              placeholder="User name"
              type="text"
              :disabled="isEditting"
            />
            <ErrorMessage class="text-red-600 text-sm" name="name" />
          </div>
          <div class="flex flex-col gap-2">
            <p>Email</p>
            <Field
              as="input"
              name="email"
              class="p-2 border-2 border-gray-200 rounded-lg focus:outline-none"
              placeholder="User email"
              type="email"
              :disabled="isEditting"
            />
            <ErrorMessage class="text-red-600 text-sm" name="email" />
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div class="flex flex-col gap-2">
            <p>Address</p>
            <Field
              as="input"
              name="address"
              class="p-2 border-2 border-gray-200 rounded-lg focus:outline-none"
              placeholder="User address"
              type="text"
              :disabled="isEditting"
            />
            <ErrorMessage class="text-red-600 text-sm" name="address" />
          </div>
          <div class="flex flex-col gap-2">
            <p>Age</p>
            <Field
              as="input"
              name="age"
              class="p-2 border-2 border-gray-200 rounded-lg focus:outline-none"
              placeholder="User age"
              type="text"
              :disabled="isEditting"
            />
            <ErrorMessage class="text-red-600 text-sm" name="age" />
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div class="flex flex-col gap-2">
            <p>Phone</p>
            <Field
              as="input"
              name="phone"
              class="p-2 border-2 border-gray-200 rounded-lg focus:outline-none"
              placeholder="User phone"
              type="text"
              :disabled="isEditting"
            />
            <ErrorMessage class="text-red-600 text-sm" name="phone" />
          </div>
          <div class="flex flex-col gap-2">
            <p>Job</p>
            <Field
              as="input"
              name="job"
              class="p-2 border-2 border-gray-200 rounded-lg focus:outline-none"
              placeholder="User job"
              type="text"
              :disabled="isEditting"
            />
            <ErrorMessage class="text-red-600 text-sm" name="job" />
          </div>
        </div>
        <div class="flex items-center justify-end gap-4">
          <button
            type="submit"
            @click.prevent="!isEditting ? submitForm() : toggleEdit()"
            class="rounded-lg bg-green-vee text-white hover:bg-green-700"
          >
            <p class="w-auto p-2 h-[40px]" v-if="isEditting">Edit</p>
            <p
              class="w-[50px] p-2 h-[40px] flex items-center justify-center"
              v-if="!isEditting"
            >
              <span v-if="!isPending">Save</span>
              <span v-if="isPending" class="spinner mx-auto"></span>
            </p>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import axiosConfig from "@/config/axiosConfig";
import { CircleX, LogOut, UserPen } from "lucide-vue-next";
import { onMounted, ref } from "vue";
import { ErrorMessage, Field, useForm } from "vee-validate";
import * as yup from "yup";

const apiCall = import.meta.env.VITE_BACKEND_API;

const router = useRouter();
const userStore = useUserStore();

const sidebarOpen = ref(false);
const isEditting = ref(true);
const isPending = ref(false);
const selection = ref("");

const schema = yup.object({
  email: yup.string().required("Email is required").email("Email is not valid"),
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters long"),
  phone: yup.string(),
  address: yup.string(),
  age: yup.string(),
  job: yup.string(),
});

const {
  handleSubmit,
  setValues,
  values: form,
  resetForm,
} = useForm({
  validationSchema: schema,
  validateOnChange: false,
});

onMounted(() => {
  selection.value = "updateUser";
  getUserById();
});

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

const getUserById = async () => {
  try {
    const response = await axiosConfig.get(
      `${apiCall}/api/user/get-user-by-id/${userStore.user._id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    userStore.setUser(response.data);
    setValues({
      name: response.data.name,
      email: response.data.email,
      job: response.data.job,
      age: response.data.age,
      address: response.data.address,
      phone: response.data.phone,
    });
  } catch (error) {
    console.error(
      "Error fetching users:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const toggleEdit = () => {
  isEditting.value = !isEditting.value;
};

const submitForm = handleSubmit(async (values) => {
  console.log("dfafasd");
  try {
    isPending.value = true;
    const response = await axiosConfig.put(
      `${apiCall}/api/user/update-user-by-id/${userStore.user._id}`,
      JSON.stringify({
        email: values.email,
        name: values.name,
        phone: values.phone,
        age: values.age,
        address: values.address,
        job: values.job,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    toggleEdit();
    userStore.setUser(response.data);
    isPending.value = false;
  } catch (error) {
    console.error(
      "Error fetching users:",
      error.response ? error.response.data : error.message
    );
    isPending.value = false;
    throw error;
  }
});

const logOut = () => {
  localStorage.setItem("token", "");
  localStorage.setItem("refresh_token", "");
  router.push("/sign-in");
};
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
</style>
