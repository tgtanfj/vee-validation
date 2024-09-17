<script setup>
import { useSideBarStore } from "@/stores/sidebarStore";
import { useUserStore } from "@/stores/userStore";
import { LogOut, UserPen, Users } from "lucide-vue-next";
import { useRouter } from "vue-router";
import { CircleX } from "lucide-vue-next";
import DarkMode from "./DarkMode.vue";

const router = useRouter();

const tabs = useSideBarStore();
const user = useUserStore();

const props = defineProps({
  sidebarOpen: {
    type: Boolean,
    require: true,
  },
  toggleSidebar: {
    type: Function,
    require: true,
  },
  darkmode: {
    type: Boolean,
  },
});

const clickTab = (tab) => {
  tabs.changeTab(tab);
};

const logOut = () => {
  localStorage.setItem("token", "");
  localStorage.setItem("refresh_token", "");
  router.push("/sign-in");
  user.setIsAuth(false);
};
</script>

<template>
  <aside
    id="default-sidebar"
    :class="props.sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    class="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full shadow-xl transition-transform sm:translate-x-0"
    aria-label="Sidebar"
  >
    <div
      :class="darkmode ? 'dark' : ''"
      class="relative h-full overflow-y-auto bg-gray-50 px-3 py-4 dark:bg-gray-800"
    >
      <CircleX
        v-if="props.sidebarOpen"
        @click="props.toggleSidebar"
        :stroke-width="1.25"
        class="ml-auto cursor-pointer text-gray-500 hover:text-gray-700"
      />
      <ul class="space-y-2 font-medium">
        <li class="my-4">
          <p
            @click="router.push('/home')"
            class="cursor-pointer text-center text-xl text-green-vee"
          >
            VeePiniaVueRouter
          </p>
        </li>
        <li @click="clickTab('allUsers')" class="cursor-pointer">
          <div
            class="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            :class="{
              'bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700':
                tabs.tab === 'allUsers',
            }"
          >
            <Users size="25" class="text-gray-500" />
            <span class="ms-3">All Users</span>
          </div>
        </li>
        <li @click="clickTab('updateUser')" class="cursor-pointer">
          <div
            class="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            :class="{
              'bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700':
                tabs.tab === 'updateUser',
            }"
          >
            <UserPen size="25" class="text-gray-500" />
            <span class="ms-3">Update User</span>
          </div>
        </li>
        <li @click="logOut" class="cursor-pointer">
          <p
            class="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
          >
            <LogOut size="25" class="text-gray-500" />
            <span class="ms-3">Log Out</span>
          </p>
        </li>
      </ul>
      <div class="fixed bottom-6 left-6">
        <DarkMode />
      </div>
    </div>
  </aside>
</template>
