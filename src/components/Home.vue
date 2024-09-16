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

    <SideBar :sidebarOpen="sidebarOpen" :toggleSidebar="toggleSidebar" />

    <div v-show="tabs.tab === 'updateUser'" class="p-4 sm:ml-64">
      <form
        class="p-4 space-y-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-10">
          <div class="flex flex-col gap-2">
            <p>Name</p>
            <Field
              as="input"
              name="name"
              v-model="form.name"
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
              v-model="form.email"
              class="p-2 border-2 border-gray-200 rounded-lg focus:outline-none cursor-not-allowed"
              placeholder="User email"
              type="email"
              disabled="true"
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
              v-model="form.address"
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
              v-model="form.age"
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
              v-model="form.phone"
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
              v-model="form.job"
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

    <div v-show="tabs.tab === 'allUsers'" class="p-4 sm:ml-64">
      <form
        class="p-4 space-y-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"
      >
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table
            class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="px-6 py-3">Name</th>
                <th scope="col" class="px-6 py-3">Email</th>
                <th scope="col" class="px-6 py-3">Address</th>
                <th scope="col" class="px-6 py-3">Phone</th>
                <th scope="col" class="px-6 py-3">Age</th>
                <th scope="col" class="px-6 py-3">Job</th>
                <th scope="col" class="px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody v-if="allUsers.length">
              <tr
                v-for="user in allUsers"
                :key="user._id"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {{ user.name }}
                </th>
                <td class="px-6 py-4">{{ user.email }}</td>
                <td class="px-6 py-4">
                  {{ user.address ? user.address : "Null" }}
                </td>
                <td class="px-6 py-4">
                  {{ user.phone ? user.phone : "Null" }}
                </td>
                <td class="px-6 py-4">{{ user.age ? user.age : "Null" }}</td>
                <td class="px-6 py-4">{{ user.job ? user.job : "Null" }}</td>
                <td class="px-6 py-4 text-right">
                  <div
                    @click="editUser(user)"
                    class="font-medium text-green-vee dark:text-green-700 cursor-pointer hover:underline"
                  >
                    Edit
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
    </div>
    <Modal
      title="Update User"
      subTitle="Update User Information"
      :isOpen="isOpen"
      :setOpen="setOpen"
      :submit="editUserForm2"
      :isPending="isPending"
    >
      <form class="grid grid-cols-1 w-full gap-2">
        <div class="w-full">
          <p>Name</p>
          <Field
            as="input"
            name="name2"
            v-model="form2.name2"
            class="p-2 border-2 border-gray-200 w-full rounded-lg focus:outline-none"
            placeholder="User name"
            type="text"
          />
          <ErrorMessage class="text-red-600 text-sm" name="name2" />
        </div>
        <div class="w-full">
          <p>Email</p>
          <Field
            as="input"
            name="email2"
            v-model="form2.email2"
            class="p-2 border-2 border-gray-200 w-full rounded-lg focus:outline-none cursor-not-allowed"
            placeholder="User email"
            type="text"
            disabled="true"
          />
          <ErrorMessage class="text-red-600 text-sm" name="email2" />
        </div>
        <div class="w-full">
          <p>Email</p>
          <Field
            as="input"
            name="phone2"
            v-model="form2.phone2"
            class="p-2 border-2 border-gray-200 w-full rounded-lg focus:outline-none"
            placeholder="User phone"
            type="text"
          />
          <ErrorMessage class="text-red-600 text-sm" name="phone2" />
        </div>
        <div class="w-full">
          <p>Address</p>
          <Field
            as="input"
            name="address2"
            v-model="form2.address2"
            class="p-2 border-2 border-gray-200 w-full rounded-lg focus:outline-none"
            placeholder="User address"
            type="text"
          />
          <ErrorMessage class="text-red-600 text-sm" name="address2" />
        </div>
        <div class="w-full">
          <p>Age</p>
          <Field
            as="input"
            name="age2"
            v-model="form2.age2"
            class="p-2 border-2 border-gray-200 w-full rounded-lg focus:outline-none"
            placeholder="User age"
            type="text"
          />
          <ErrorMessage class="text-red-600 text-sm" name="age2" />
        </div>
        <div class="w-full">
          <p>Job</p>
          <Field
            as="input"
            name="job2"
            v-model="form2.job2"
            class="p-2 border-2 border-gray-200 w-full rounded-lg focus:outline-none"
            placeholder="User job"
            type="text"
          />
          <ErrorMessage class="text-red-600 text-sm" name="job2" />
        </div>
      </form>
    </Modal>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/userStore";
import axiosConfig from "@/config/axiosConfig";
import { onMounted, ref } from "vue";
import { ErrorMessage, Field, useForm } from "vee-validate";
import SideBar from "./SideBar.vue";
import { useSideBarStore } from "@/stores/sidebarStore";
import Modal from "./Modal.vue";
import { allUserSchema, updateSchema } from "@/schema";

const apiCall = import.meta.env.VITE_BACKEND_API;

const userStore = useUserStore();
const tabs = useSideBarStore();

const isOpen = ref(false);
const sidebarOpen = ref(false);
const isEditting = ref(true);
const isPending = ref(false);
const allUsers = ref([]);

const {
  handleSubmit: handleSubmitUpdateUser,
  setValues: updateUserSetValues,
  values: form,
} = useForm({
  validationSchema: updateSchema,
  validateOnChange: false,
});

const {
  handleSubmit: handleSubmitAllUsers,
  setValues: allUsersSetvalue,
  values: form2,
} = useForm({
  validationSchema: allUserSchema,
  validateOnChange: false,
});

onMounted(() => {
  getUserById();
  getAllUsers();
});

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

const setOpen = () => {
  isOpen.value = !isOpen.value;
};

const editUserForm2 = handleSubmitAllUsers(async (value) => {
  try {
    isPending.value = true;
    const response = await axiosConfig.put(
      `${apiCall}/api/user/update-user-by-id/${value._id}`,
      JSON.stringify({
        email: value.email2,
        name: value.name2,
        phone: value.phone2,
        age: value.age2,
        address: value.address2,
        job: value.job2,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.data) {
      await getAllUsers();
      setOpen();
      isPending.value = false;
    }
  } catch (error) {
    console.error(
      "Error fetching users:",
      error.response ? error.response.data : error.message
    );
    isPending.value = false;
    throw error;
  }
});

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
    updateUserSetValues({
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

const getAllUsers = async () => {
  try {
    const response = await axiosConfig.get(`${apiCall}/api/user/get-users`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.data) {
      allUsers.value = response.data;
    }
  } catch (error) {
    console.error(
      "Error fetching users:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const editUser = (user) => {
  allUsersSetvalue({
    _id: user._id,
    name2: user.name,
    email2: user.email,
    job2: user.job,
    age2: user.age,
    address2: user.address,
    phone2: user.phone,
  });
  setOpen();
};

const submitForm = handleSubmitUpdateUser(async (form) => {
  try {
    isPending.value = true;
    const response = await axiosConfig.put(
      `${apiCall}/api/user/update-user-by-id/${userStore.user._id}`,
      JSON.stringify({
        email: form.email,
        name: form.name,
        phone: form.phone,
        age: form.age,
        address: form.address,
        job: form.job,
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
