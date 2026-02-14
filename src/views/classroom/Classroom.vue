<template>
    <div
        class="flex h-[calc(100vh-theme(spacing.24))] overflow-hidden bg-white dark:bg-abyss-800 rounded-2xl border border-sun-200 dark:border-abyss-700 shadow-sm">
        <aside
            class="w-64 border-r border-sun-100 dark:border-abyss-700 flex flex-col bg-platinum-50/50 dark:bg-abyss-900/20">
            <div class="p-4 border-b border-sun-100 dark:border-abyss-700">
                <h2 class="font-bold text-abyss-900 dark:text-platinum-50 truncate">{{ classroom.name }}</h2>
                <p class="text-xs text-platinum-500 uppercase tracking-widest mt-1 font-bold">Channels</p>
            </div>

            <nav class="flex-1 overflow-y-auto p-2 space-y-1">
                <router-link v-for="channel in channels" :key="channel.id"
                    :to="{ name: 'classroom.channel', params: { id: $route.params.id, channelId: channel.id } }"
                    class="w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
                    active-class="bg-calm-lavender-600 text-white shadow-md"
                    inactive-class="text-platinum-600 dark:text-platinum-400 hover:bg-sun-100 dark:hover:bg-abyss-700">
                    <span class="opacity-70">#</span> {{ channel.name }}
                </router-link>
            </nav>
        </aside>

        <main class="flex-1 flex flex-col min-w-0 overflow-hidden">
            <header
                class="h-14 border-b border-sun-100 dark:border-abyss-700 flex items-center px-6 bg-white dark:bg-abyss-800">
                <div class="flex gap-8">
                    <router-link :to="{ name: 'classroom.home', params: { id: $route.params.id } }"
                        class="h-14 flex items-center border-b-2 text-sm font-bold transition-all text-platinum-500 hover:text-abyss-900 dark:hover:text-platinum-100 border-transparent"
                        exact-active-class="!border-calm-lavender-600 !text-calm-lavender-600">
                        Homepage
                    </router-link>

                    <router-link
                        :to="{ name: 'classroom.channel', params: { id: $route.params.id, channelId: $route.params.channelId || 1 } }"
                        class="h-14 flex items-center border-b-2 text-sm font-bold transition-all text-platinum-500 hover:text-abyss-900 dark:hover:text-platinum-100 border-transparent"
                        active-class="!border-calm-lavender-600 !text-calm-lavender-600">
                        Channel Content
                    </router-link>

                    <router-link :to="{ name: 'classroom.grades', params: { id: $route.params.id } }"
                        class="h-14 flex items-center border-b-2 text-sm font-bold transition-all text-platinum-500 hover:text-abyss-900 dark:hover:text-platinum-100 border-transparent"
                        active-class="!border-calm-lavender-600 !text-calm-lavender-600">
                        Grades
                    </router-link>
                </div>
            </header>

            <div class="flex-1 overflow-y-auto">
                <router-view :key="$route.fullPath" :classroom="classroom" :channels="channels" />
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const classroom = ref({
    name: 'Cybersecurity 101',
    instructor: 'Prof. Sarah Jenkins',
    description: 'Welcome to the Cybersecurity fundamentals course. This class covers ethical hacking, network defense, and digital forensics.'
})

const channels = ref([
    { id: 1, name: 'General', instructions: 'Start here for announcements.', module: null },
    { id: 2, name: 'Network-Security', instructions: 'Read Chapter 4 before starting the module.', module: { id: 101, name: 'VPN & Firewalls', progress: 45 } },
    { id: 3, name: 'Cryptography', instructions: 'Watch the introductory video.', module: { id: 102, name: 'AES Encryption', progress: 0 } }
])
</script>