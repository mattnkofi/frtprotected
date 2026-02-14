<template>
    <div
        class="flex h-[calc(100vh-theme(spacing.24))] overflow-hidden bg-platinum-50 dark:bg-abyss-900 rounded-2xl border border-sun-200 dark:border-abyss-700">
        <!-- Sidebar - Channels & Navigation -->
        <aside class="w-72 border-r border-sun-200 dark:border-abyss-700 flex flex-col bg-white dark:bg-abyss-800">
            <!-- Classroom Header -->
            <div class="p-5 border-b border-sun-100 dark:border-abyss-700">
                <div class="flex items-start gap-3 mb-3">
                    <div :class="getThemeColorClass(classroom.themeColor)" class="w-10 h-10 rounded-lg flex-shrink-0">
                    </div>
                    <div class="flex-1 min-w-0">
                        <h2 class="font-bold text-abyss-900 dark:text-platinum-50 truncate">{{ classroom.name }}</h2>
                        <div class="flex items-center gap-2 mt-1">
                            <Lock v-if="classroom.visibility === 'private'" class="w-3 h-3 text-platinum-500" />
                            <Globe v-else class="w-3 h-3 text-platinum-500" />
                            <span class="text-xs text-platinum-500 capitalize">{{ classroom.visibility }}</span>
                        </div>
                    </div>
                </div>
                <button @click="showInviteModal = true"
                    class="w-full py-2 px-3 bg-calm-lavender-600 hover:bg-calm-lavender-700 text-white text-sm font-bold rounded-lg transition flex items-center justify-center gap-2">
                    <UserPlus class="w-4 h-4" />
                    Invite Students
                </button>
            </div>

            <!-- Main Navigation -->
            <div class="p-3 border-b border-sun-100 dark:border-abyss-700">
                <nav class="space-y-1">
                    <router-link :to="{ name: 'classroom.home', params: { id: classroom.id } }"
                        class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all"
                        active-class="bg-calm-lavender-600 text-white"
                        inactive-class="text-platinum-600 dark:text-platinum-400 hover:bg-platinum-50 dark:hover:bg-abyss-700">
                        <Home class="w-4 h-4" />
                        Homepage
                    </router-link>
                    <router-link :to="{ name: 'classroom.students', params: { id: classroom.id } }"
                        class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all"
                        active-class="bg-calm-lavender-600 text-white"
                        inactive-class="text-platinum-600 dark:text-platinum-400 hover:bg-platinum-50 dark:hover:bg-abyss-700">
                        <Users class="w-4 h-4" />
                        Students
                        <span v-if="classroom.pendingRequests > 0"
                            class="ml-auto px-2 py-0.5 bg-amber-500 text-white text-xs font-bold rounded-full">
                            {{ classroom.pendingRequests }}
                        </span>
                    </router-link>
                    <router-link :to="{ name: 'classroom.grades', params: { id: classroom.id } }"
                        class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all"
                        active-class="bg-calm-lavender-600 text-white"
                        inactive-class="text-platinum-600 dark:text-platinum-400 hover:bg-platinum-50 dark:hover:bg-abyss-700">
                        <GraduationCap class="w-4 h-4" />
                        Grades
                    </router-link>
                    <router-link :to="{ name: 'classroom.analytics', params: { id: classroom.id } }"
                        class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all"
                        active-class="bg-calm-lavender-600 text-white"
                        inactive-class="text-platinum-600 dark:text-platinum-400 hover:bg-platinum-50 dark:hover:bg-abyss-700">
                        <BarChart3 class="w-4 h-4" />
                        Analytics
                    </router-link>
                    <router-link :to="{ name: 'classroom.leaderboard', params: { id: classroom.id } }"
                        class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all"
                        active-class="bg-calm-lavender-600 text-white"
                        inactive-class="text-platinum-600 dark:text-platinum-400 hover:bg-platinum-50 dark:hover:bg-abyss-700">
                        <Trophy class="w-4 h-4" />
                        Leaderboard
                    </router-link>
                </nav>
            </div>

            <!-- Channels -->
            <div class="flex-1 overflow-y-auto p-3">
                <div class="flex items-center justify-between mb-2 px-1">
                    <p class="text-xs text-platinum-500 uppercase tracking-widest font-bold">Channels</p>
                    <button @click="showCreateChannel = true"
                        class="p-1 hover:bg-platinum-50 dark:hover:bg-abyss-700 rounded transition">
                        <Plus class="w-4 h-4 text-platinum-500" />
                    </button>
                </div>
                <nav class="space-y-1">
                    <router-link v-for="channel in channels" :key="channel.id"
                        :to="{ name: 'classroom.channel', params: { id: classroom.id, channelId: channel.id } }"
                        class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all group"
                        active-class="bg-calm-lavender-600 text-white"
                        inactive-class="text-platinum-600 dark:text-platinum-400 hover:bg-platinum-50 dark:hover:bg-abyss-700">
                        <Hash class="w-4 h-4 flex-shrink-0" />
                        <span class="truncate">{{ channel.name }}</span>
                        <button @click.prevent.stop="editChannel(channel)"
                            class="ml-auto opacity-0 group-hover:opacity-100 p-1 hover:bg-white/20 rounded transition">
                            <Settings class="w-3.5 h-3.5" />
                        </button>
                    </router-link>
                </nav>
            </div>

            <!-- Settings -->
            <div class="p-3 border-t border-sun-100 dark:border-abyss-700">
                <router-link :to="{ name: 'classroom.settings', params: { id: classroom.id } }"
                    class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-platinum-600 dark:text-platinum-400 hover:bg-platinum-50 dark:hover:bg-abyss-700 transition">
                    <Settings class="w-4 h-4" />
                    Classroom Settings
                </router-link>
            </div>
        </aside>

        <!-- Main Content Area -->
        <main class="flex-1 flex flex-col min-w-0 overflow-hidden bg-white dark:bg-abyss-800">
            <router-view :classroom="classroom" :channels="channels" />
        </main>

        <!-- Invite Modal -->
        <Transition name="modal-fade">
            <div v-if="showInviteModal"
                class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-abyss-900/60 backdrop-blur-sm">
                <div @click.stop
                    class="bg-white dark:bg-abyss-800 rounded-2xl w-full max-w-md overflow-hidden border border-sun-200 dark:border-abyss-700 shadow-2xl">
                    <div class="p-6 border-b border-sun-100 dark:border-abyss-700 flex justify-between items-center">
                        <h2 class="text-xl font-bold text-abyss-900 dark:text-platinum-50">Invite Students</h2>
                        <button @click="showInviteModal = false"
                            class="p-2 hover:bg-platinum-50 dark:hover:bg-abyss-700 rounded-lg transition">
                            <X class="w-5 h-5 text-platinum-500" />
                        </button>
                    </div>
                    <div class="p-6 space-y-4">
                        <div>
                            <label
                                class="text-xs font-bold text-platinum-500 uppercase tracking-widest mb-2 block">Invite
                                Link</label>
                            <div class="flex gap-2">
                                <input :value="inviteLink" readonly
                                    class="flex-1 px-3 py-2 bg-platinum-50 dark:bg-abyss-900 border border-sun-200 dark:border-abyss-700 rounded-lg text-sm dark:text-white" />
                                <button @click="copyInviteLink"
                                    class="px-4 py-2 bg-calm-lavender-600 hover:bg-calm-lavender-700 text-white rounded-lg text-sm font-medium transition">
                                    <Copy class="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <div>
                            <label class="text-xs font-bold text-platinum-500 uppercase tracking-widest mb-2 block">Or
                                Invite by Email</label>
                            <div class="flex gap-2">
                                <input v-model="inviteEmail" type="email" placeholder="student@example.com"
                                    class="flex-1 px-3 py-2 bg-platinum-50 dark:bg-abyss-900 border border-sun-200 dark:border-abyss-700 rounded-lg text-sm dark:text-white outline-none focus:ring-2 focus:ring-calm-lavender-500" />
                                <button @click="sendInviteEmail"
                                    class="px-4 py-2 bg-calm-lavender-600 hover:bg-calm-lavender-700 text-white rounded-lg text-sm font-medium transition">
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>

        <!-- Create Channel Modal -->
        <Transition name="modal-fade">
            <div v-if="showCreateChannel"
                class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-abyss-900/60 backdrop-blur-sm">
                <div @click.stop
                    class="bg-white dark:bg-abyss-800 rounded-2xl w-full max-w-md overflow-hidden border border-sun-200 dark:border-abyss-700 shadow-2xl">
                    <div class="p-6 border-b border-sun-100 dark:border-abyss-700 flex justify-between items-center">
                        <h2 class="text-xl font-bold text-abyss-900 dark:text-platinum-50">Create Channel</h2>
                        <button @click="showCreateChannel = false"
                            class="p-2 hover:bg-platinum-50 dark:hover:bg-abyss-700 rounded-lg transition">
                            <X class="w-5 h-5 text-platinum-500" />
                        </button>
                    </div>
                    <form @submit.prevent="createChannel" class="p-6 space-y-4">
                        <div>
                            <label
                                class="text-xs font-bold text-platinum-500 uppercase tracking-widest mb-2 block">Channel
                                Name</label>
                            <input v-model="newChannel.name" type="text" placeholder="e.g. module-1"
                                class="w-full px-3 py-2 bg-platinum-50 dark:bg-abyss-900 border border-sun-200 dark:border-abyss-700 rounded-lg text-sm dark:text-white outline-none focus:ring-2 focus:ring-calm-lavender-500" />
                        </div>
                        <div>
                            <label
                                class="text-xs font-bold text-platinum-500 uppercase tracking-widest mb-2 block">Description</label>
                            <textarea v-model="newChannel.description" rows="3"
                                placeholder="Brief description of this channel..."
                                class="w-full px-3 py-2 bg-platinum-50 dark:bg-abyss-900 border border-sun-200 dark:border-abyss-700 rounded-lg text-sm dark:text-white outline-none focus:ring-2 focus:ring-calm-lavender-500 resize-none"></textarea>
                        </div>
                        <div class="flex gap-3">
                            <button type="button" @click="showCreateChannel = false"
                                class="flex-1 px-4 py-2 text-sm font-medium text-platinum-600 dark:text-platinum-400 hover:bg-platinum-50 dark:hover:bg-abyss-700 rounded-lg transition">
                                Cancel
                            </button>
                            <button type="submit"
                                class="flex-1 px-4 py-2 bg-calm-lavender-600 hover:bg-calm-lavender-700 text-white text-sm font-medium rounded-lg transition">
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import {
    Home, Users, GraduationCap, BarChart3, Trophy, Settings, Hash, Plus,
    UserPlus, Copy, X, Lock, Globe, Edit
} from 'lucide-vue-next'

const route = useRoute()
const showInviteModal = ref(false)
const showCreateChannel = ref(false)
const inviteEmail = ref('')

// Mock classroom data
const classroom = ref({
    id: parseInt(route.params.id),
    name: 'Gender & Development 101',
    description: 'Comprehensive introduction to gender equality and VAWC prevention',
    visibility: 'public',
    themeColor: 'lavender',
    pendingRequests: 3,
    studentCount: 45
})

const channels = ref([
    { id: 1, name: 'general', description: 'General announcements and discussions' },
    { id: 2, name: 'module-1', description: 'Introduction to Gender Equality' },
    { id: 3, name: 'module-2', description: 'Understanding VAWC' },
    { id: 4, name: 'resources', description: 'Additional learning materials' }
])

const newChannel = ref({
    name: '',
    description: ''
})

const inviteLink = computed(() => {
    return `https://protected.app/join/${classroom.value.id}/abc123xyz`
})

const getThemeColorClass = (color) => {
    const colorMap = {
        lavender: 'bg-calm-lavender-600',
        azure: 'bg-azure-blue-500',
        pink: 'bg-neon-pink-500',
        emerald: 'bg-emerald-500',
        amber: 'bg-amber-500',
        rose: 'bg-rose-500',
        violet: 'bg-violet-600',
        teal: 'bg-teal-500'
    }
    return colorMap[color] || 'bg-calm-lavender-600'
}

const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink.value)
    console.log('Invite link copied!')
}

const sendInviteEmail = () => {
    if (inviteEmail.value) {
        console.log('Sending invite to:', inviteEmail.value)
        inviteEmail.value = ''
    }
}

const createChannel = () => {
    if (newChannel.value.name) {
        channels.value.push({
            id: channels.value.length + 1,
            ...newChannel.value
        })
        newChannel.value = { name: '', description: '' }
        showCreateChannel.value = false
    }
}

const editChannel = (channel) => {
    console.log('Editing channel:', channel.name)
}
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
}
</style>