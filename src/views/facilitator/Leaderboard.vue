<template>
    <div class="flex flex-col h-full">
        <!-- Header -->
        <div class="p-6 border-b border-sun-100 dark:border-abyss-700">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-2xl font-bold text-abyss-900 dark:text-platinum-50 mb-1">Leaderboard</h1>
                    <p class="text-sm text-platinum-600 dark:text-platinum-300">Student rankings and achievements</p>
                </div>
                <div class="flex items-center gap-3">
                    <select v-model="selectedPeriod"
                        class="px-4 py-2 bg-white dark:bg-abyss-900 border border-sun-200 dark:border-abyss-700 rounded-lg text-sm font-medium dark:text-white outline-none focus:ring-2 focus:ring-calm-lavender-500">
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="semester">This Semester</option>
                        <option value="all">All Time</option>
                    </select>
                    <button @click="showSettings = true"
                        class="p-3 bg-white dark:bg-abyss-900 border border-sun-200 dark:border-abyss-700 hover:bg-platinum-50 dark:hover:bg-abyss-700 rounded-lg transition">
                        <Settings class="w-5 h-5 text-platinum-600 dark:text-platinum-400" />
                    </button>
                </div>
            </div>
        </div>

        <!-- Content -->
        <div class="flex-1 overflow-y-auto p-6 space-y-6">
            <!-- Top 3 Podium -->
            <div class="grid grid-cols-3 gap-4 mb-8">
                <!-- 2nd Place -->
                <div class="flex flex-col items-center pt-8">
                    <div class="relative mb-3">
                        <div
                            class="w-20 h-20 rounded-full bg-gradient-to-br from-platinum-300 to-platinum-400 flex items-center justify-center text-white font-bold text-2xl border-4 border-white dark:border-abyss-800 shadow-lg">
                            {{topStudents[1].name.split(' ').map(n => n[0]).join('')}}
                        </div>
                        <div
                            class="absolute -bottom-2 -right-2 w-8 h-8 bg-platinum-300 rounded-full flex items-center justify-center text-white font-bold text-sm border-2 border-white dark:border-abyss-800">
                            2
                        </div>
                    </div>
                    <h3 class="font-bold text-abyss-900 dark:text-platinum-50 text-center mb-1">{{ topStudents[1].name
                        }}</h3>
                    <div class="flex items-center gap-2 mb-3">
                        <Zap class="w-4 h-4 text-amber-500" />
                        <span class="font-bold text-lg text-abyss-900 dark:text-platinum-50">{{ topStudents[1].points
                            }}</span>
                    </div>
                    <div
                        class="w-full bg-platinum-100 dark:bg-platinum-800 rounded-t-xl p-4 text-center border-t-4 border-platinum-300">
                        <p class="text-sm text-platinum-600 dark:text-platinum-400">{{ topStudents[1].modules }}/12
                            modules</p>
                    </div>
                </div>

                <!-- 1st Place -->
                <div class="flex flex-col items-center">
                    <Crown class="w-8 h-8 text-amber-500 mb-2 animate-bounce" />
                    <div class="relative mb-3">
                        <div
                            class="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-3xl border-4 border-white dark:border-abyss-800 shadow-xl">
                            {{topStudents[0].name.split(' ').map(n => n[0]).join('')}}
                        </div>
                        <div
                            class="absolute -bottom-2 -right-2 w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold border-2 border-white dark:border-abyss-800 shadow-lg">
                            1
                        </div>
                    </div>
                    <h3 class="font-bold text-abyss-900 dark:text-platinum-50 text-center mb-1 text-lg">{{
                        topStudents[0].name }}</h3>
                    <div class="flex items-center gap-2 mb-3">
                        <Zap class="w-5 h-5 text-amber-500" />
                        <span class="font-bold text-xl text-abyss-900 dark:text-platinum-50">{{ topStudents[0].points
                            }}</span>
                    </div>
                    <div
                        class="w-full bg-gradient-to-t from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-amber-800/20 rounded-t-xl p-4 text-center border-t-4 border-amber-500">
                        <p class="text-sm text-platinum-600 dark:text-platinum-400 font-medium">{{
                            topStudents[0].modules }}/12 modules</p>
                    </div>
                </div>

                <!-- 3rd Place -->
                <div class="flex flex-col items-center pt-12">
                    <div class="relative mb-3">
                        <div
                            class="w-18 h-18 rounded-full bg-gradient-to-br from-amber-700 to-amber-800 flex items-center justify-center text-white font-bold text-xl border-4 border-white dark:border-abyss-800 shadow-lg">
                            {{topStudents[2].name.split(' ').map(n => n[0]).join('')}}
                        </div>
                        <div
                            class="absolute -bottom-2 -right-2 w-7 h-7 bg-amber-700 rounded-full flex items-center justify-center text-white font-bold text-sm border-2 border-white dark:border-abyss-800">
                            3
                        </div>
                    </div>
                    <h3 class="font-bold text-abyss-900 dark:text-platinum-50 text-center mb-1 text-sm">{{
                        topStudents[2].name }}</h3>
                    <div class="flex items-center gap-2 mb-3">
                        <Zap class="w-4 h-4 text-amber-500" />
                        <span class="font-bold text-abyss-900 dark:text-platinum-50">{{ topStudents[2].points }}</span>
                    </div>
                    <div
                        class="w-full bg-amber-100/50 dark:bg-amber-900/20 rounded-t-xl p-3 text-center border-t-4 border-amber-700">
                        <p class="text-xs text-platinum-600 dark:text-platinum-400">{{ topStudents[2].modules }}/12
                            modules</p>
                    </div>
                </div>
            </div>

            <!-- Full Leaderboard Table -->
            <div
                class="bg-white dark:bg-abyss-800 rounded-xl border border-sun-200 dark:border-abyss-700 overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead
                            class="bg-platinum-50 dark:bg-abyss-900/50 border-b border-sun-100 dark:border-abyss-700">
                            <tr>
                                <th
                                    class="px-6 py-4 text-center text-xs font-bold text-platinum-500 uppercase tracking-widest w-20">
                                    Rank
                                </th>
                                <th
                                    class="px-6 py-4 text-left text-xs font-bold text-platinum-500 uppercase tracking-widest">
                                    Student
                                </th>
                                <th
                                    class="px-6 py-4 text-center text-xs font-bold text-platinum-500 uppercase tracking-widest">
                                    Points
                                </th>
                                <th
                                    class="px-6 py-4 text-center text-xs font-bold text-platinum-500 uppercase tracking-widest">
                                    Modules
                                </th>
                                <th
                                    class="px-6 py-4 text-center text-xs font-bold text-platinum-500 uppercase tracking-widest">
                                    Avg Score
                                </th>
                                <th
                                    class="px-6 py-4 text-center text-xs font-bold text-platinum-500 uppercase tracking-widest">
                                    Badges
                                </th>
                                <th
                                    class="px-6 py-4 text-center text-xs font-bold text-platinum-500 uppercase tracking-widest">
                                    Streak
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-sun-100 dark:divide-abyss-700">
                            <tr v-for="(student, index) in leaderboard" :key="student.id" :class="[
                                'hover:bg-platinum-50 dark:hover:bg-abyss-900/30 transition',
                                index < 3 ? 'bg-amber-50/30 dark:bg-amber-900/5' : ''
                            ]">
                                <td class="px-6 py-4 text-center">
                                    <div class="flex items-center justify-center">
                                        <div v-if="index < 3"
                                            class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                                            :class="index === 0 ? 'bg-amber-500 text-white' : index === 1 ? 'bg-platinum-300 text-white' : 'bg-amber-700 text-white'">
                                            {{ index + 1 }}
                                        </div>
                                        <span v-else class="font-bold text-platinum-500">{{ index + 1 }}</span>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-3">
                                        <div
                                            class="w-10 h-10 rounded-full bg-gradient-to-br from-calm-lavender-400 to-calm-lavender-600 flex items-center justify-center text-white font-bold text-sm">
                                            {{student.name.split(' ').map(n => n[0]).join('')}}
                                        </div>
                                        <div>
                                            <p class="font-medium text-abyss-900 dark:text-platinum-50">{{ student.name
                                                }}</p>
                                            <p class="text-xs text-platinum-500">Level {{ student.level }}</p>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-center">
                                    <div class="flex items-center justify-center gap-2">
                                        <Zap class="w-4 h-4 text-amber-500" />
                                        <span class="font-bold text-abyss-900 dark:text-platinum-50">{{
                                            student.points.toLocaleString() }}</span>
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-center">
                                    <div class="space-y-1">
                                        <p class="text-sm font-bold text-abyss-900 dark:text-platinum-50">{{
                                            student.modules }}/12</p>
                                        <div
                                            class="w-24 h-1.5 bg-platinum-100 dark:bg-abyss-700 rounded-full overflow-hidden mx-auto">
                                            <div class="h-full bg-gradient-to-r from-calm-lavender-500 to-calm-lavender-600"
                                                :style="{ width: (student.modules / 12 * 100) + '%' }"></div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-center">
                                    <span class="font-bold text-lg" :class="getScoreColor(student.avgScore)">
                                        {{ student.avgScore }}%
                                    </span>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex items-center justify-center gap-1">
                                        <div v-for="badge in student.badges.slice(0, 3)" :key="badge"
                                            class="w-7 h-7 rounded-full bg-gradient-to-br flex items-center justify-center text-xs"
                                            :class="getBadgeColor(badge)" :title="badge">
                                            {{ badge.charAt(0) }}
                                        </div>
                                        <span v-if="student.badges.length > 3"
                                            class="text-xs text-platinum-500 font-bold ml-1">
                                            +{{ student.badges.length - 3 }}
                                        </span>
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-center">
                                    <div class="flex items-center justify-center gap-1.5">
                                        <Flame class="w-5 h-5 text-orange-500" />
                                        <span class="font-bold text-abyss-900 dark:text-platinum-50">{{ student.streak
                                            }}</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Achievement Overview -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white dark:bg-abyss-800 p-6 rounded-xl border border-sun-200 dark:border-abyss-700">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                            <Award class="w-6 h-6 text-emerald-600" />
                        </div>
                        <h3 class="font-bold text-abyss-900 dark:text-platinum-50">Most Active</h3>
                    </div>
                    <p class="text-2xl font-bold text-abyss-900 dark:text-platinum-50 mb-1">{{ leaderboard[0].name }}
                    </p>
                    <p class="text-sm text-platinum-500">{{ leaderboard[0].streak }} day streak</p>
                </div>

                <div class="bg-white dark:bg-abyss-800 p-6 rounded-xl border border-sun-200 dark:border-abyss-700">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="p-3 bg-azure-blue-100 dark:bg-azure-blue-900/30 rounded-lg">
                            <Target class="w-6 h-6 text-azure-blue-600" />
                        </div>
                        <h3 class="font-bold text-abyss-900 dark:text-platinum-50">Fastest Learner</h3>
                    </div>
                    <p class="text-2xl font-bold text-abyss-900 dark:text-platinum-50 mb-1">Emma Davis</p>
                    <p class="text-sm text-platinum-500">12 modules in 3 weeks</p>
                </div>

                <div class="bg-white dark:bg-abyss-800 p-6 rounded-xl border border-sun-200 dark:border-abyss-700">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="p-3 bg-neon-pink-100 dark:bg-neon-pink-900/30 rounded-lg">
                            <TrendingUp class="w-6 h-6 text-neon-pink-600" />
                        </div>
                        <h3 class="font-bold text-abyss-900 dark:text-platinum-50">Most Improved</h3>
                    </div>
                    <p class="text-2xl font-bold text-abyss-900 dark:text-platinum-50 mb-1">James Wilson</p>
                    <p class="text-sm text-platinum-500">+25% this month</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { Settings, Zap, Crown, Flame, Award, Target, TrendingUp } from 'lucide-vue-next'

const selectedPeriod = ref('month')
const showSettings = ref(false)

const topStudents = [
    { id: 1, name: 'Sarah Johnson', points: 2850, modules: 12, avgScore: 98 },
    { id: 2, name: 'Michael Chen', points: 2640, modules: 12, avgScore: 96 },
    { id: 3, name: 'Emma Davis', points: 2520, modules: 11, avgScore: 94 }
]

const leaderboard = [
    {
        id: 1, name: 'Sarah Johnson', points: 2850, modules: 12, avgScore: 98, level: 12,
        badges: ['Excellence', 'Speedster', 'Helper'], streak: 28
    },
    {
        id: 2, name: 'Michael Chen', points: 2640, modules: 12, avgScore: 96, level: 11,
        badges: ['Consistent', 'Scholar'], streak: 21
    },
    {
        id: 3, name: 'Emma Davis', points: 2520, modules: 11, avgScore: 94, level: 11,
        badges: ['Fast Learner', 'Engaged', 'Top Scorer'], streak: 19
    },
    {
        id: 4, name: 'Alice Cooper', points: 2380, modules: 11, avgScore: 92, level: 10,
        badges: ['Persistent', 'Active'], streak: 15
    },
    {
        id: 5, name: 'Bob Martinez', points: 2210, modules: 10, avgScore: 90, level: 10,
        badges: ['Dedicated'], streak: 12
    },
    {
        id: 6, name: 'Carol White', points: 2050, modules: 9, avgScore: 88, level: 9,
        badges: ['Learner'], streak: 10
    },
    {
        id: 7, name: 'David Lee', points: 1890, modules: 9, avgScore: 85, level: 9,
        badges: ['Committed'], streak: 8
    },
    {
        id: 8, name: 'Eve Anderson', points: 1720, modules: 8, avgScore: 82, level: 8,
        badges: [], streak: 6
    },
    {
        id: 9, name: 'Frank Wilson', points: 1580, modules: 7, avgScore: 80, level: 7,
        badges: [], streak: 5
    },
    {
        id: 10, name: 'Grace Taylor', points: 1420, modules: 6, avgScore: 78, level: 6,
        badges: [], streak: 3
    }
]

const getScoreColor = (score) => {
    if (score >= 90) return 'text-emerald-600'
    if (score >= 75) return 'text-azure-blue-600'
    if (score >= 60) return 'text-amber-600'
    return 'text-red-600'
}

const getBadgeColor = (badge) => {
    const colors = {
        'Excellence': 'from-amber-400 to-amber-600 text-white',
        'Speedster': 'from-azure-blue-400 to-azure-blue-600 text-white',
        'Helper': 'from-emerald-400 to-emerald-600 text-white',
        'Consistent': 'from-calm-lavender-400 to-calm-lavender-600 text-white',
        'Scholar': 'from-violet-400 to-violet-600 text-white',
        'Fast Learner': 'from-neon-pink-400 to-neon-pink-600 text-white',
        'Engaged': 'from-teal-400 to-teal-600 text-white',
        'Top Scorer': 'from-rose-400 to-rose-600 text-white'
    }
    return colors[badge] || 'from-platinum-300 to-platinum-400 text-white'
}
</script>