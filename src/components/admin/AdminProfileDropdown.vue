<template>
  <div class="relative">
    <div
      class="group w-full flex items-center transition-all duration-300"
      :class="[isCollapsed ? 'justify-center p-2' : 'justify-between p-4 bg-platinum-50/50 dark:bg-abyss-950/40 border-t border-platinum-100 dark:border-abyss-800']"
    >
      <div class="flex items-center gap-3 min-w-0">
        <div class="relative flex-shrink-0">
          <button v-if="isCollapsed" type="button" @click.stop="$emit('update:open', !open)" class="outline-none">
            <img :src="avatar" class="h-10 w-10 rounded-full object-cover border-2 border-kaitoke-green-600 shadow-sm group-hover:scale-110 transition-transform" />
          </button>
          <img v-else :src="avatar" class="h-10 w-10 rounded-full object-cover border-2 border-kaitoke-green-600 shadow-sm" />
          <span class="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-kaitoke-green-500 border-2 border-white dark:border-abyss-900"></span>
        </div>

        <div v-if="!isCollapsed" class="flex-1 min-w-0 text-left animate-in fade-in slide-in-from-left-2">
          <p class="text-xs font-bold text-abyss-900 dark:text-platinum-100 truncate">{{ name }}</p>
          <p class="text-[10px] text-platinum-500 dark:text-platinum-400 uppercase tracking-wider font-semibold truncate">ADMIN</p>
        </div>
      </div>

      <button v-if="!isCollapsed" type="button" @click.stop="$emit('update:open', !open)"
        class="p-1.5 rounded-lg hover:bg-platinum-200/50 dark:hover:bg-abyss-700 transition-colors flex-shrink-0">
        <MoreVertical class="h-4 w-4 stroke-[2] text-platinum-500" />
      </button>
    </div>

    <Transition enter-active-class="transition duration-200" enter-from-class="opacity-0 scale-95" leave-to-class="opacity-0 scale-95">
      <div v-if="isOpen" ref="dropdownRef" class="fixed z-50 w-52 bg-white dark:bg-abyss-800 rounded-xl shadow-2xl border border-platinum-100 dark:border-abyss-700 overflow-hidden">
        <div class="px-4 py-3 border-b border-platinum-50 dark:border-abyss-700 bg-platinum-50/30 dark:bg-abyss-900/20">
          <p class="text-xs font-bold text-abyss-900 dark:text-platinum-50 truncate">{{ name }}</p>
          <p class="text-[10px] text-platinum-500 truncate uppercase tracking-wider font-black">Administrator</p>
        </div>

        <div class="p-2 space-y-1">
          <button @click="handleAction('admin.profile')" class="menu-item group">
            <User class="h-4 w-4 text-platinum-400 group-hover:text-kaitoke-green-600 transition-colors" />
            <span class="font-medium">Profile Settings</span>
          </button>
          <button @click="handleAction('admin.settings')" class="menu-item group">
            <Settings class="h-4 w-4 text-platinum-400 group-hover:text-advocacy-purple-600 transition-colors" />
            <span class="font-medium">Platform Config</span>
          </button>
          <div class="my-1 border-t border-platinum-100 dark:border-abyss-700"></div>
          <button @click="handleAction('logout')" class="menu-item group text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20">
            <LogOut class="h-4 w-4 text-red-400 group-hover:text-red-600 transition-colors" />
            <span class="font-bold">Logout</span>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useProfileStore } from '@/stores/profile'
import { User, Settings, LogOut, MoreVertical } from 'lucide-vue-next'

const props = defineProps({
    isCollapsed: { type: Boolean, default: false },
    isOpen: { type: Boolean },
    open: { type: Boolean } // For v-model support
})

const emit = defineEmits(['close', 'update:open'])

const router = useRouter()
const auth = useAuthStore()
const profileStore = useProfileStore()
const dropdownRef = ref(null)

// Expose the dropdown element so the parent Sidebar can calculate positions
defineExpose({ $el: dropdownRef });

const name = computed(() => profileStore.profile?.display_name || auth.user?.name || 'Admin')
const avatar = computed(() => profileStore.avatarUrl(80))

const email = computed(() => auth.user?.email || '—')

const handleAction = async (routeName) => {
    emit('update:open', false)
    emit('close')
    if (routeName === 'logout') {
        await auth.logout()
        router.push({ name: 'login' })
    } else {
        router.push({ name: routeName })
    }
}

onMounted(async () => {
    if (auth.isAuthenticated && !profileStore.profile) {
        try { await profileStore.fetchProfile(auth.user.id) }
        catch (err) { console.error("Could not load profile", err) }
    }
})
</script>

<style scoped>
@reference "@/style.css";

.menu-item {
    @apply w-full flex items-center gap-3 px-3 py-2 text-sm text-left rounded-lg transition-all text-abyss-900 dark:text-platinum-200 hover:bg-platinum-50 dark:hover:bg-abyss-700/50;
}
</style>