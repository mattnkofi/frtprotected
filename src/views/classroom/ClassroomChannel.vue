<template>
    <div v-if="currentChannel" class="flex flex-col h-full bg-platinum-50/30 dark:bg-abyss-900/10">
        <div class="p-6 bg-white dark:bg-abyss-800 border-b border-sun-100 dark:border-abyss-700">
            <div class="flex items-center gap-3 mb-2">
                <span class="text-2xl text-calm-lavender-600 font-bold">#</span>
                <h2 class="text-xl font-black text-abyss-900 dark:text-platinum-50">{{ currentChannel.name }}</h2>
            </div>
            <p class="text-platinum-500 text-sm leading-relaxed">{{ currentChannel.instructions }}</p>
        </div>

        <div class="flex-1 flex overflow-hidden">
            <div class="flex-1 flex flex-col border-r border-sun-100 dark:border-abyss-700">
                <div class="flex-1 overflow-y-auto p-6 space-y-4">
                    <div v-for="msg in mockMessages" :key="msg.id" class="flex gap-3">
                        <div
                            class="w-8 h-8 rounded-full bg-sun-200 dark:bg-abyss-700 flex-shrink-0 flex items-center justify-center text-xs font-bold dark:text-platinum-100">
                            {{ msg.user[0] }}
                        </div>
                        <div>
                            <p class="text-xs font-bold text-abyss-900 dark:text-platinum-100">
                                {{ msg.user }}
                                <span class="text-[10px] text-platinum-400 font-normal ml-2">{{ msg.time }}</span>
                            </p>
                            <p class="text-sm text-platinum-600 dark:text-platinum-300 mt-1">{{ msg.text }}</p>
                        </div>
                    </div>
                </div>

                <div class="p-4 bg-white dark:bg-abyss-800 border-t border-sun-100 dark:border-abyss-700">
                    <div
                        class="flex gap-2 p-2 bg-platinum-50 dark:bg-abyss-900 rounded-xl border border-sun-200 dark:border-abyss-700">
                        <input type="text" placeholder="Message the channel..."
                            class="flex-1 bg-transparent border-none focus:ring-0 text-sm dark:text-white px-2 outline-none" />
                        <button
                            class="px-4 py-2 bg-calm-lavender-600 hover:bg-calm-lavender-700 text-white rounded-lg text-xs font-bold transition">Send</button>
                    </div>
                </div>
            </div>

            <aside v-if="currentChannel.module" class="w-80 p-6 space-y-4 bg-white dark:bg-abyss-800 hidden lg:block">
                <h4 class="text-xs font-black text-platinum-400 uppercase tracking-widest">Active Module</h4>
                <div
                    class="p-4 rounded-xl border border-sun-200 dark:border-abyss-700 bg-platinum-50/50 dark:bg-abyss-900/50">
                    <p class="font-bold text-abyss-900 dark:text-platinum-50 mb-4">{{ currentChannel.module.name }}</p>
                    <div class="h-2 bg-sun-100 dark:bg-abyss-700 rounded-full mb-4 overflow-hidden">
                        <div class="h-full bg-calm-lavender-500 transition-all duration-1000"
                            :style="{ width: currentChannel.module.progress + '%' }"></div>
                    </div>
                    <router-link :to="{ name: 'user.dashboard' }"
                        class="w-full block text-center py-2 bg-calm-lavender-600 hover:bg-calm-lavender-700 text-white text-xs font-bold rounded-lg transition">
                        Continue Learning
                    </router-link>
                </div>
            </aside>
        </div>
    </div>

    <div v-else class="flex items-center justify-center h-full text-platinum-500">
        Loading channel content...
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Define props if being passed from parent, but provide local fallback
const props = defineProps(['channel', 'channels'])

// Local Mock Data for fallback
const mockChannels = [
    { id: 1, name: 'General', instructions: 'Welcome to the general discussion channel.', module: null },
    { id: 2, name: 'Network-Security', instructions: 'Discuss VPNs and Firewall configurations here.', module: { name: 'Firewall Basics', progress: 65 } },
    { id: 3, name: 'Cryptography', instructions: 'Encryption lab assistance and resources.', module: { name: 'AES Implementation', progress: 20 } }
]

// Determine which channel to show based on prop OR route parameter
const currentChannel = computed(() => {
    if (props.channel) return props.channel

    const id = parseInt(route.params.channelId)
    const source = props.channels || mockChannels
    return source.find(c => c.id === id) || source[0]
})

const mockMessages = ref([
    { id: 1, user: 'Instructor Sarah', text: 'Welcome to the channel! Feel free to ask questions about the current module.', time: '9:05 AM' },
    { id: 2, user: 'Kim', text: 'Thanks! I am currently looking into the module instructions.', time: '10:15 AM' },
    { id: 3, user: 'Alice Cooper', text: 'Does anyone have the link for the supplementary reading?', time: '11:00 AM' }
])
</script>