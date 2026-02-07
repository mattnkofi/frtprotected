<!-- src/components/admin/AdminProfileDropdown.vue -->
<template>
    <div class="relative" ref="dropdownRef">
        <button @click="isOpen = !isOpen"
            class="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-abyss-800 transition-colors">
            <div class="relative flex-shrink-0">
                <img :src="authStore.user?.avatar_url || defaultAvatar" alt="Admin Avatar"
                    class="h-10 w-10 rounded-full object-cover border-2 border-kaitoke-green-500" />
                <div
                    class="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white dark:border-abyss-900 rounded-full">
                </div>
            </div>

            <transition name="fade">
                <div v-if="expanded" class="flex-1 text-left overflow-hidden">
                    <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {{ authStore.user?.name || 'Admin User' }}
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {{ authStore.user?.email }}
                    </p>
                </div>
            </transition>

            <ChevronUpIcon v-if="expanded && isOpen" class="h-4 w-4 text-gray-400 flex-shrink-0" />
            <ChevronDownIcon v-else-if="expanded" class="h-4 w-4 text-gray-400 flex-shrink-0" />
        </button>

        <!-- Dropdown Menu -->
        <transition name="dropdown">
            <div v-if="isOpen"
                class="absolute bottom-full left-0 right-0 mb-2 py-2 bg-white dark:bg-abyss-800 rounded-lg shadow-xl border border-gray-200 dark:border-abyss-700">
                <router-link to="/profile"
                    class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-abyss-700">
                    <UserIcon class="h-4 w-4" />
                    <span>My Profile</span>
                </router-link>

                <router-link to="/settings"
                    class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-abyss-700">
                    <SettingsIcon class="h-4 w-4" />
                    <span>Settings</span>
                </router-link>

                <div class="border-t border-gray-200 dark:border-abyss-700 my-2"></div>

                <button @click="handleLogout"
                    class="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
                    <LogOutIcon class="h-4 w-4" />
                    <span>Logout</span>
                </button>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import {
    ChevronUpIcon,
    ChevronDownIcon,
    UserIcon,
    SettingsIcon,
    LogOutIcon
} from 'lucide-vue-next';

const props = defineProps({
    expanded: Boolean
});

const router = useRouter();
const authStore = useAuthStore();
const isOpen = ref(false);
const dropdownRef = ref(null);

const defaultAvatar = 'https://ui-avatars.com/api/?name=Admin&background=059669&color=fff';

const handleLogout = async () => {
    await authStore.logout();
    router.push('/facilitator/login');
};

const handleClickOutside = (event) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
        isOpen.value = false;
    }
};

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
    transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
    opacity: 0;
    transform: translateY(10px);
}
</style>