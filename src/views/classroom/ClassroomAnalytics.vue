<template>
    <div class="space-y-6">
        <div class="bg-white dark:bg-abyss-800 rounded-xl p-8 border border-sun-200 dark:border-abyss-700">
            <router-link :to="{ name: 'user.dashboard' }"
                class="text-calm-lavender-600 hover:underline text-sm font-medium mb-4 inline-block">
                ← Back to My Classes
            </router-link>
            <h1 class="text-3xl font-bold text-abyss-900 dark:text-platinum-50 mb-2">Classroom Overview</h1>
            <p class="text-platinum-600 dark:text-platinum-300">Detailed analytics and management for all your active
                classrooms.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div v-for="stat in globalStats" :key="stat.label"
                class="bg-white dark:bg-abyss-800 p-6 rounded-2xl border border-sun-200 dark:border-abyss-700">
                <p class="text-xs font-bold text-platinum-500 uppercase tracking-widest mb-1">{{ stat.label }}</p>
                <p class="text-3xl font-bold text-calm-lavender-600">{{ stat.value }}</p>
            </div>
        </div>

        <div class="bg-white dark:bg-abyss-800 rounded-2xl border border-sun-200 dark:border-abyss-700 overflow-hidden">
            <div class="p-6 border-b border-sun-100 dark:border-abyss-700">
                <h2 class="text-xl font-bold text-abyss-900 dark:text-platinum-50">Class Participation & Requests</h2>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead class="bg-platinum-50 dark:bg-abyss-900/50">
                        <tr>
                            <th class="p-4 text-xs font-bold text-platinum-500 uppercase tracking-wider">Classroom Name
                            </th>
                            <th class="p-4 text-xs font-bold text-platinum-500 uppercase tracking-wider text-center">
                                Members</th>
                            <th class="p-4 text-xs font-bold text-platinum-500 uppercase tracking-wider text-center">
                                Pending Requests</th>
                            <th class="p-4 text-xs font-bold text-platinum-500 uppercase tracking-wider text-center">My
                                Status</th>
                            <th class="p-4 text-xs font-bold text-platinum-500 uppercase tracking-wider text-right">
                                Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-sun-100 dark:divide-abyss-700">
                        <tr v-for="cls in classDetails" :key="cls.id"
                            class="hover:bg-platinum-50 dark:hover:bg-abyss-900/30 transition-colors">
                            <td class="p-4">
                                <div class="flex items-center gap-3">
                                    <div :class="cls.color" class="w-3 h-3 rounded-full"></div>
                                    <span class="font-medium text-abyss-900 dark:text-platinum-100">{{ cls.name
                                    }}</span>
                                </div>
                            </td>
                            <td class="p-4 text-center text-platinum-600 dark:text-platinum-300 font-mono">{{
                                cls.memberCount }}</td>
                            <td class="p-4 text-center">
                                <span v-if="cls.pendingRequests > 0"
                                    class="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 px-3 py-1 rounded-full text-xs font-bold">
                                    {{ cls.pendingRequests }} Pending
                                </span>
                                <span v-else class="text-platinum-400 text-xs">—</span>
                            </td>
                            <td class="p-4 text-center">
                                <span
                                    class="text-xs font-bold px-3 py-1 rounded-full bg-calm-lavender-100 dark:bg-calm-lavender-900/30 text-calm-lavender-600">Active</span>
                            </td>
                            <td class="p-4 text-right">
                                <button @click="viewClass(cls.id)"
                                    class="text-sm font-bold text-calm-lavender-600 hover:text-calm-lavender-700 transition">View
                                    Class</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const globalStats = ref([
    { label: 'Total Enrolled', value: '4' },
    { label: 'Network Peers', value: '142' },
    { label: 'Pending Apps', value: '3' },
    { label: 'Avg Attendance', value: '94%' }
])

const classDetails = ref([
    { id: 1, name: 'Cybersecurity 101', memberCount: 45, pendingRequests: 2, color: 'bg-calm-lavender-600' },
    { id: 2, name: 'Network Infrastructure', memberCount: 32, pendingRequests: 0, color: 'bg-blue-600' },
    { id: 3, name: 'Web Dev Capstone', memberCount: 28, pendingRequests: 1, color: 'bg-purple-600' },
    { id: 4, name: 'Digital Forensics', memberCount: 37, pendingRequests: 0, color: 'bg-amber-600' }
])

const viewClass = (id) => {
    router.push({ name: 'classroom.detail', params: { id } })
}
</script>