<template>
    <div class="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
                class="md:col-span-2 bg-white dark:bg-abyss-800 p-8 rounded-3xl border border-sun-200 dark:border-abyss-700 shadow-sm flex items-center justify-between">
                <div>
                    <h2 class="text-sm font-black text-platinum-400 uppercase tracking-widest mb-1">Current Standing
                    </h2>
                    <p class="text-4xl font-black text-abyss-900 dark:text-platinum-50">{{ overallGrade }}%</p>
                    <p class="text-calm-lavender-600 font-bold mt-1 flex items-center gap-1">
                        <span>Excellent Performance</span>
                        <span
                            class="text-xs px-2 py-0.5 bg-calm-lavender-100 dark:bg-calm-lavender-900/30 rounded-full">Top
                            10%</span>
                    </p>
                </div>
                <div class="hidden sm:block">
                    <div
                        class="w-24 h-24 rounded-full border-8 border-sun-100 dark:border-abyss-700 flex items-center justify-center relative">
                        <svg class="absolute inset-0 w-full h-full -rotate-90">
                            <circle cx="48" cy="48" r="40" fill="transparent" stroke="currentColor" stroke-width="8"
                                class="text-calm-lavender-500"
                                :style="{ strokeDasharray: 251, strokeDashoffset: 251 - (251 * overallGrade) / 100 }" />
                        </svg>
                        <span class="text-xl font-black text-abyss-900 dark:text-platinum-50">A</span>
                    </div>
                </div>
            </div>

            <div class="bg-calm-lavender-600 p-8 rounded-3xl text-white shadow-lg shadow-calm-lavender-600/20">
                <h2 class="text-xs font-bold uppercase opacity-80 tracking-widest mb-4">Quick Stats</h2>
                <div class="space-y-4">
                    <div class="flex justify-between items-center border-b border-white/10 pb-2">
                        <span class="text-sm opacity-90">Completed Quizzes</span>
                        <span class="font-bold">4/5</span>
                    </div>
                    <div class="flex justify-between items-center border-b border-white/10 pb-2">
                        <span class="text-sm opacity-90">Class Rank</span>
                        <span class="font-bold">#4</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-sm opacity-90">Points Earned</span>
                        <span class="font-bold">1,240 XP</span>
                    </div>
                </div>
            </div>
        </div>

        <div
            class="bg-white dark:bg-abyss-800 rounded-3xl border border-sun-200 dark:border-abyss-700 overflow-hidden shadow-sm">
            <div class="p-6 border-b border-sun-100 dark:border-abyss-700 bg-platinum-50/50 dark:bg-abyss-900/50">
                <h3 class="font-bold text-abyss-900 dark:text-platinum-50">Assignment Breakdown</h3>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr
                            class="text-[10px] font-black text-platinum-400 uppercase tracking-widest border-b border-sun-100 dark:border-abyss-700">
                            <th class="p-6">Module / Channel</th>
                            <th class="p-6 text-center">Weight</th>
                            <th class="p-6 text-center">Points</th>
                            <th class="p-6 text-center">Grade</th>
                            <th class="p-6 text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-sun-100 dark:divide-abyss-700">
                        <tr v-for="item in gradeItems" :key="item.id"
                            class="group hover:bg-platinum-50 dark:hover:bg-abyss-900/30 transition-colors">
                            <td class="p-6">
                                <div class="flex items-center gap-3">
                                    <span class="p-2 bg-sun-100 dark:bg-abyss-700 rounded-lg text-lg">{{ item.icon
                                        }}</span>
                                    <div>
                                        <p class="font-bold text-abyss-900 dark:text-platinum-100">{{ item.name }}</p>
                                        <p class="text-xs text-platinum-500">{{ item.channel }}</p>
                                    </div>
                                </div>
                            </td>
                            <td class="p-6 text-center text-sm text-platinum-500 font-medium">{{ item.weight }}%</td>
                            <td class="p-6 text-center font-mono text-abyss-900 dark:text-platinum-100">{{ item.score
                                }}/{{ item.total }}</td>
                            <td class="p-6 text-center">
                                <span :class="getGradeColor(item.percentage)" class="font-black">
                                    {{ item.percentage }}%
                                </span>
                            </td>
                            <td class="p-6 text-right">
                                <span v-if="item.completed"
                                    class="px-3 py-1 bg-calm-lavender-100 dark:bg-calm-lavender-900/30 text-calm-lavender-600 text-[10px] font-black uppercase rounded-full">
                                    Graded
                                </span>
                                <span v-else
                                    class="px-3 py-1 bg-platinum-100 dark:bg-abyss-700 text-platinum-500 text-[10px] font-black uppercase rounded-full">
                                    Pending
                                </span>
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

const overallGrade = ref(92)

const gradeItems = ref([
    { id: 1, name: 'Network Protocol Quiz', channel: 'Network-Security', weight: 20, score: 95, total: 100, percentage: 95, icon: '🛡️', completed: true },
    { id: 2, name: 'Encryption Lab Assignment', channel: 'Cryptography', weight: 30, score: 88, total: 100, percentage: 88, icon: '🔐', completed: true },
    { id: 3, name: 'Phishing Simulation', channel: 'Social-Engineering', weight: 15, score: 100, total: 100, percentage: 100, icon: '🎣', completed: true },
    { id: 4, name: 'Final Project: Core Infrastructure', channel: 'General', weight: 35, score: 0, total: 100, percentage: 0, icon: '🏗️', completed: false }
])

const getGradeColor = (percentage) => {
    if (percentage >= 90) return 'text-calm-lavender-600'
    if (percentage >= 80) return 'text-blue-500'
    if (percentage === 0) return 'text-platinum-400'
    return 'text-amber-500'
}
</script>