<script setup>
import { useSideBarStore } from "@/stores/sidebarStore";
import { useUserStore } from "@/stores/userStore";
import { LogOut } from "lucide-vue-next";
import { useRouter } from "vue-router";
import { CircleX } from 'lucide-vue-next';

const router = useRouter();

const tabs = useSideBarStore();
const user = useUserStore()

const props = defineProps({
  sidebarOpen: {
    type: Boolean,
    require: true,
  },
  toggleSidebar: {
    type: Function,
    require: true,
  },
});

const clickTab = (tab) => {
  tabs.changeTab(tab);
};

const logOut = () => {
  localStorage.setItem("token", "");
  localStorage.setItem("refresh_token", "");
  router.push("/sign-in");
  user.setIsAuth(false)
};
</script>

<template>
  <aside
    id="default-sidebar"
    :class="props.sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 shadow-xl"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <CircleX
        v-if="props.sidebarOpen"
        @click="props.toggleSidebar"
        :stroke-width="1.25"
        class="text-gray-500 ml-auto hover:text-gray-700 cursor-pointer"
      />
      <ul class="space-y-2 font-medium">
        <li class="my-4">
          <p
            @click="router.push('/home')"
            class="text-center text-xl text-green-vee cursor-pointer"
          >
            VeePiniaVueRouter
          </p>
        </li>
        <li @click="clickTab('updateUser')" class="cursor-pointer">
          <div
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            :class="{
              'bg-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700':
                tabs.tab === 'updateUser',
            }"
          >
            <UserPen size="25" class="text-gray-500" />
            <span class="ms-3">Update User</span>
          </div>
        </li>
        <li @click="clickTab('allUsers')" class="cursor-pointer">
          <div
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            :class="{
              'bg-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700':
                tabs.tab === 'allUsers',
            }"
          >
            <UserPen size="25" class="text-gray-500" />
            <span class="ms-3">All Users</span>
          </div>
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
</template>
