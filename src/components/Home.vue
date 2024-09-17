<template>
  <div
    :class="{
      dark: darkmode.darkMode,
      '': darkmode.darkMode === false,
      'bg-gray-900': darkmode.darkMode,
    }"
    class="h-screen w-full"
  >
    <button
      @click="toggleSidebar"
      data-drawer-target="default-sidebar"
      data-drawer-toggle="default-sidebar"
      aria-controls="default-sidebar"
      type="button"
      class="ms-3 mt-2 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 sm:hidden"
    >
      <span class="sr-only">Open sidebar</span>
      <svg
        class="h-6 w-6"
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

    <SideBar
      :darkmode="darkmode.darkMode"
      :sidebarOpen="sidebarOpen"
      :toggleSidebar="toggleSidebar"
    />

    <div v-show="tabs.tab === 'updateUser'" class="p-4 sm:ml-64">
      <form
        class="space-y-4 rounded-lg border-2 border-dashed border-gray-200 p-4 dark:border-gray-700 dark:text-[#94a2b1]"
      >
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-10">
          <div class="flex flex-col gap-2">
            <p>Name</p>
            <Field
              as="input"
              name="name"
              v-model="values.name"
              class="rounded-lg border-2 border-gray-200 p-2 focus:outline-none dark:border-gray-700 dark:bg-transparent"
              placeholder="User name"
              type="text"
              :disabled="isEditting"
            />
            <ErrorMessage class="text-sm text-red-600" name="name" />
          </div>
          <div class="flex flex-col gap-2">
            <p>Email</p>
            <Field
              as="input"
              name="email"
              v-model="values.email"
              class="cursor-not-allowed rounded-lg border-2 border-gray-200 p-2 focus:outline-none dark:border-gray-700 dark:bg-transparent"
              placeholder="User email"
              type="email"
              disabled="true"
            />
            <ErrorMessage class="text-sm text-red-600" name="email" />
          </div>
        </div>
        <div class="grid grid-cols-1 gap-10 sm:grid-cols-2">
          <div class="flex flex-col gap-2">
            <p>Address</p>
            <Field
              as="input"
              name="address"
              v-model="values.address"
              class="rounded-lg border-2 border-gray-200 p-2 focus:outline-none dark:border-gray-700 dark:bg-transparent"
              placeholder="User address"
              type="text"
              :disabled="isEditting"
            />
            <ErrorMessage class="text-sm text-red-600" name="address" />
          </div>
          <div class="flex flex-col gap-2">
            <p>Age</p>
            <Field
              as="input"
              name="age"
              v-model="values.age"
              class="rounded-lg border-2 border-gray-200 p-2 focus:outline-none dark:border-gray-700 dark:bg-transparent"
              placeholder="User age"
              type="text"
              :disabled="isEditting"
            />
            <ErrorMessage class="text-sm text-red-600" name="age" />
          </div>
        </div>
        <div class="grid grid-cols-1 gap-10 sm:grid-cols-2">
          <div class="flex flex-col gap-2">
            <p>Phone</p>
            <Field
              as="input"
              name="phone"
              v-model="values.phone"
              class="rounded-lg border-2 border-gray-200 p-2 focus:outline-none dark:border-gray-700 dark:bg-transparent"
              placeholder="User phone"
              type="text"
              :disabled="isEditting"
            />
            <ErrorMessage class="text-sm text-red-600" name="phone" />
          </div>
          <div class="flex flex-col gap-2">
            <p>Job</p>
            <Field
              as="input"
              name="job"
              v-model="values.job"
              class="rounded-lg border-2 border-gray-200 p-2 focus:outline-none dark:border-gray-700 dark:bg-transparent"
              placeholder="User job"
              type="text"
              :disabled="isEditting"
            />
            <ErrorMessage class="text-sm text-red-600" name="job" />
          </div>
        </div>
        <div class="flex items-center justify-end gap-4">
          <button
            type="submit"
            @click.prevent="!isEditting ? submitForm() : toggleEdit()"
            class="rounded-lg bg-green-vee text-white hover:bg-green-700"
          >
            <p class="h-[40px] w-auto p-2" v-if="isEditting">Edit</p>
            <p
              class="flex h-[40px] w-[50px] items-center justify-center p-2"
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
      <div
        class="space-y-4 rounded-lg border-2 border-dashed border-gray-200 p-4 dark:border-gray-700"
      >
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table
            class="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right"
          >
            <thead
              class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
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
                class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
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
                    class="cursor-pointer font-medium text-green-vee hover:underline dark:text-green-700"
                  >
                    Edit
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <button
            class="absolute right-4 top-2 flex min-w-[60px] items-center justify-center gap-1 rounded bg-green-vee p-1 text-white hover:bg-[#339e7b]"
            @click="exportFile"
          >
            <FileDown v-if="!isExportFile" size="15" />
            <span v-if="!isExportFile" class="text-xs">Export</span>
            <span v-if="isExportFile" class="small-spinner"></span>
          </button>
          <div
            v-if="isNextPage"
            class="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 transition-all dark:bg-gray-500 dark:bg-opacity-50"
            role="status"
          >
            <svg
              aria-hidden="true"
              class="inline h-16 w-16 animate-spin fill-green-vee text-gray-200 transition-all dark:text-gray-400"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <TableSkeleton v-if="firstTableLoading" />
      </div>
      <div class="mt-6 flex items-center justify-center">
        <button
          class="mr-2 rounded px-4 py-2 text-white"
          :class="{
            'cursor-not-allowed bg-gray-300 text-black hover:bg-gray-300':
              currentPage === 1,
            'rounded bg-green-vee hover:bg-[#339e7b]': currentPage !== 1,
          }"
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
        >
          Back
        </button>

        <span class="mx-2 dark:text-[#94a2b1]"
          >Page {{ currentPage }} / {{ totalPages }}</span
        >

        <button
          class="ml-2 rounded px-4 py-2 text-white"
          :class="{
            'cursor-not-allowed bg-gray-300 text-black hover:bg-gray-300':
              currentPage === totalPages,
            'rounded bg-green-vee hover:bg-[#339e7b]':
              currentPage !== totalPages,
          }"
          :disabled="currentPage === totalPages"
          @click.prevent="changePage(currentPage + 1)"
        >
          Next
        </button>
      </div>
    </div>
    <Modal
      title="Update User"
      subTitle="Update User Information"
      :isOpen="isOpen"
      :setOpen="setOpen"
      :submit="editUserForm2"
      :isPending="isPending"
    >
      <form class="grid w-full grid-cols-1 gap-2">
        <div class="w-full">
          <p>Name</p>
          <Field
            as="input"
            name="name2"
            v-model="form2.name2"
            class="w-full rounded-lg border-2 border-gray-200 p-2 focus:outline-none dark:border-gray-700 dark:bg-transparent"
            placeholder="User name"
            type="text"
          />
          <ErrorMessage class="text-sm text-red-600" name="name2" />
        </div>
        <div class="w-full">
          <p>Email</p>
          <Field
            as="input"
            name="email2"
            v-model="form2.email2"
            class="w-full cursor-not-allowed rounded-lg border-2 border-gray-200 p-2 focus:outline-none dark:border-gray-700 dark:bg-transparent"
            placeholder="User email"
            type="text"
            disabled="true"
          />
          <ErrorMessage class="text-sm text-red-600" name="email2" />
        </div>
        <div class="w-full">
          <p>Email</p>
          <Field
            as="input"
            name="phone2"
            v-model="form2.phone2"
            class="w-full rounded-lg border-2 border-gray-200 p-2 focus:outline-none dark:border-gray-700 dark:bg-transparent"
            placeholder="User phone"
            type="text"
          />
          <ErrorMessage class="text-sm text-red-600" name="phone2" />
        </div>
        <div class="w-full">
          <p>Address</p>
          <Field
            as="input"
            name="address2"
            v-model="form2.address2"
            class="w-full rounded-lg border-2 border-gray-200 p-2 focus:outline-none dark:border-gray-700 dark:bg-transparent"
            placeholder="User address"
            type="text"
          />
          <ErrorMessage class="text-sm text-red-600" name="address2" />
        </div>
        <div class="w-full">
          <p>Age</p>
          <Field
            as="input"
            name="age2"
            v-model="form2.age2"
            class="w-full rounded-lg border-2 border-gray-200 p-2 focus:outline-none dark:border-gray-700 dark:bg-transparent"
            placeholder="User age"
            type="text"
          />
          <ErrorMessage class="text-sm text-red-600" name="age2" />
        </div>
        <div class="w-full">
          <p>Job</p>
          <Field
            as="input"
            name="job2"
            v-model="form2.job2"
            class="w-full rounded-lg border-2 border-gray-200 p-2 focus:outline-none dark:border-gray-700 dark:bg-transparent"
            placeholder="User job"
            type="text"
          />
          <ErrorMessage class="text-sm text-red-600" name="job2" />
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
import { useDarkModeStore } from "@/stores/darkModeStore";
import TableSkeleton from "./TableSkeleton.vue";
import { FileDown } from "lucide-vue-next";

const apiCall = import.meta.env.VITE_BACKEND_API;

const userStore = useUserStore();
const tabs = useSideBarStore();
const darkmode = useDarkModeStore();

const isOpen = ref(false);
const sidebarOpen = ref(false);
const isEditting = ref(true);
const isPending = ref(false);
const allUsers = ref([]);
const isNextPage = ref(false);
const firstTableLoading = ref(false);
const isExportFile = ref(false);

const limit = 10;
const currentPage = ref(1);
const totalPages = ref(1);

const {
  handleSubmit: handleSubmitUpdateUser,
  setValues: updateUserSetValues,
  values,
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
      },
    );
    if (response.data) {
      await getAllUsers();
      setOpen();
      isPending.value = false;
    }
  } catch (error) {
    console.error(
      "Error fetching users:",
      error.response ? error.response.data : error.message,
    );
    isPending.value = false;
    throw error;
  }
});

const exportFile = async () => {
  try {
    isExportFile.value = true;
    const response = await axiosConfig.get(`${apiCall}/api/user/export-users`, {
      headers: {
        "Content-Type": "application/json",
      },
      responseType: "blob",
    });

    if (response) {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Users.xlsx");
      document.body.appendChild(link);
      link.click();
      isExportFile.value = false;
    }
    isExportFile.value = false;
  } catch (error) {
    console.error(
      "Error export file all users:",
      error.response ? error.response.data : error.message,
    );
    isExportFile.value = false;
    throw error;
  }
};

const getUserById = async () => {
  try {
    const response = await axiosConfig.get(
      `${apiCall}/api/user/get-user-by-id/${userStore.user._id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
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
      error.response ? error.response.data : error.message,
    );
    throw error;
  }
};

const toggleEdit = () => {
  isEditting.value = !isEditting.value;
};

const getAllUsers = async (page) => {
  if (currentPage.value === 1 && page !== 2) firstTableLoading.value = true;
  try {
    const response = await axiosConfig.get(
      `${apiCall}/api/user/get-users`,
      {
        params: {
          page,
          limit,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (response.data) {
      allUsers.value = response.data.users;
      currentPage.value = response.data.currentPage;
      totalPages.value = response.data.totalPages;
      isNextPage.value = false;
      firstTableLoading.value = false;
    }
  } catch (error) {
    console.error(
      "Error fetching users:",
      error.response ? error.response.data : error.message,
    );
    throw error;
  }
};

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    isNextPage.value = true;
    getAllUsers(page);
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

const submitForm = handleSubmitUpdateUser(async (values) => {
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
      },
    );
    toggleEdit();
    userStore.setUser(response.data);
    isPending.value = false;
  } catch (error) {
    console.error(
      "Error fetching users:",
      error.response ? error.response.data : error.message,
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

.small-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left: 4px solid white;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  animation: spin 1s linear infinite;
  display: inline-block;
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
