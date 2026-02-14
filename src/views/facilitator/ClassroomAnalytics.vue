<template>
    <div class="flex flex-col h-full">
        <!-- Header -->
        <div class="p-6 border-b border-sun-100 dark:border-abyss-700">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-2xl font-bold text-abyss-900 dark:text-platinum-50 mb-1">Classroom Analytics</h1>
                    <p class="text-sm text-platinum-600 dark:text-platinum-300">Track performance and engagement metrics
                    </p>
                </div>
                <div class="flex items-center gap-3">
                    <select v-model="timeRange"
                        class="px-4 py-2 bg-white dark:bg-abyss-900 border border-sun-200 dark:border-abyss-700 rounded-lg text-sm font-medium dark:text-white outline-none focus:ring-2 focus:ring-calm-lavender-500">
                        <option value="week">Last 7 Days</option>
                        <option value="month">Last 30 Days</option>
                        <option value="semester">This Semester</option>
                        <option value="all">All Time</option>
                    </select>
                    <button @click="exportReport"
                        class="flex items-center gap-2 px-4 py-2 bg-calm-lavender-600 hover:bg-calm-lavender-700 text-white font-medium rounded-lg transition">
                        <Download class="w-4 h-4" />
                        Export
                    </button>
                </div>
            </div>
        </div>

        <!-- Content -->
        <div class="flex-1 overflow-y-auto p-6 space-y-6">
            <!-- Key Metrics -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div class="bg-white dark:bg-abyss-800 p-6 rounded-xl border border-sun-200 dark:border-abyss-700">
                    <div class="flex items-center justify-between mb-3">
                        <div class="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                            <TrendingUp class="w-6 h-6 text-emerald-600" />
                        </div>
                        <span class="flex items-center gap-1 text-sm font-bold text-emerald-600">
                            <ArrowUp class="w-4 h-4" /> 12%
                        </span>
                    </div>
                    <p class="text-xs font-bold text-platinum-500 uppercase tracking-widest mb-1">Avg Completion</p>
                    <p class="text-3xl font-bold text-abyss-900 dark:text-platinum-50">78%</p>
                    <p class="text-xs text-platinum-400 mt-2">vs 66% last period</p>
                </div>

                <div class="bg-white dark:bg-abyss-800 p-6 rounded-xl border border-sun-200 dark:border-abyss-700">
                    <div class="flex items-center justify-between mb-3">
                        <div class="p-3 bg-azure-blue-100 dark:bg-azure-blue-900/30 rounded-lg">
                            <GraduationCap class="w-6 h-6 text-azure-blue-600" />
                        </div>
                        <span class="flex items-center gap-1 text-sm font-bold text-azure-blue-600">
                            <ArrowUp class="w-4 h-4" /> 5%
                        </span>
                    </div>
                    <p class="text-xs font-bold text-platinum-500 uppercase tracking-widest mb-1">Avg Score</p>
                    <p class="text-3xl font-bold text-abyss-900 dark:text-platinum-50">84%</p>
                    <p class="text-xs text-platinum-400 mt-2">vs 79% last period</p>
                </div>

                <div class="bg-white dark:bg-abyss-800 p-6 rounded-xl border border-sun-200 dark:border-abyss-700">
                    <div class="flex items-center justify-between mb-3">
                        <div class="p-3 bg-neon-pink-100 dark:bg-neon-pink-900/30 rounded-lg">
                            <Users class="w-6 h-6 text-neon-pink-600" />
                        </div>
                        <span class="flex items-center gap-1 text-sm font-bold text-platinum-400">
                            <Minus class="w-4 h-4" /> 0%
                        </span>
                    </div>
                    <p class="text-xs font-bold text-platinum-500 uppercase tracking-widest mb-1">Active Students</p>
                    <p class="text-3xl font-bold text-abyss-900 dark:text-platinum-50">42/45</p>
                    <p class="text-xs text-platinum-400 mt-2">93% participation</p>
                </div>

                <div class="bg-white dark:bg-abyss-800 p-6 rounded-xl border border-sun-200 dark:border-abyss-700">
                    <div class="flex items-center justify-between mb-3">
                        <div class="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                            <Clock class="w-6 h-6 text-amber-600" />
                        </div>
                        <span class="flex items-center gap-1 text-sm font-bold text-emerald-600">
                            <ArrowUp class="w-4 h-4" /> 8%
                        </span>
                    </div>
                    <p class="text-xs font-bold text-platinum-500 uppercase tracking-widest mb-1">Avg Time Spent</p>
                    <p class="text-3xl font-bold text-abyss-900 dark:text-platinum-50">4.2h</p>
                    <p class="text-xs text-platinum-400 mt-2">per student this week</p>
                </div>
            </div>

            <!-- Charts Row -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Student Performance Distribution -->
                <div class="bg-white dark:bg-abyss-800 p-6 rounded-xl border border-sun-200 dark:border-abyss-700">
                    <h3 class="text-lg font-bold text-abyss-900 dark:text-platinum-50 mb-6">Performance Distribution
                    </h3>
                    <div class="space-y-4">
                        <div v-for="range in performanceRanges" :key="range.label" class="space-y-2">
                            <div class="flex items-center justify-between text-sm">
                                <span class="font-medium text-platinum-600 dark:text-platinum-400">{{ range.label
                                    }}</span>
                                <span class="font-bold text-abyss-900 dark:text-platinum-50">{{ range.count }}
                                    students</span>
                            </div>
                            <div class="w-full h-3 bg-platinum-100 dark:bg-abyss-700 rounded-full overflow-hidden">
                                <div :class="range.color" class="h-full transition-all duration-700"
                                    :style="{ width: (range.count / 45 * 100) + '%' }"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Module Completion Rates -->
                <div class="bg-white dark:bg-abyss-800 p-6 rounded-xl border border-sun-200 dark:border-abyss-700">
                    <h3 class="text-lg font-bold text-abyss-900 dark:text-platinum-50 mb-6">Module Completion</h3>
                    <div class="space-y-4">
                        <div v-for="module in moduleStats" :key="module.name" class="flex items-center gap-4">
                            <div class="flex-1">
                                <div class="flex items-center justify-between mb-2">
                                    <span class="text-sm font-medium text-platinum-600 dark:text-platinum-400">{{
                                        module.name }}</span>
                                    <span class="text-sm font-bold text-abyss-900 dark:text-platinum-50">{{
                                        module.completion }}%</span>
                                </div>
                                <div
                                    class="w-full h-2.5 bg-platinum-100 dark:bg-abyss-700 rounded-full overflow-hidden">
                                    <div class="h-full bg-gradient-to-r from-calm-lavender-500 to-calm-lavender-600 transition-all duration-700"
                                        :style="{ width: module.completion + '%' }"></div>
                                </div>
                            </div>
                            <div class="text-xs font-bold text-platinum-400">
                                {{ Math.round(45 * module.completion / 100) }}/45
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Activity Timeline -->
            <div class="bg-white dark:bg-abyss-800 p-6 rounded-xl border border-sun-200 dark:border-abyss-700">
                <h3 class="text-lg font-bold text-abyss-900 dark:text-platinum-50 mb-6">Weekly Activity</h3>
                <div class="h-64 flex items-end justify-between gap-3">
                    <div v-for="(day, index) in weeklyActivity" :key="index"
                        class="flex-1 flex flex-col items-center gap-3 group">
                        <div class="relative w-full">
                            <div
                                class="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition">
                                <div
                                    class="bg-abyss-900 dark:bg-platinum-50 text-white dark:text-abyss-900 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap">
                                    {{ day.value }} activities
                                </div>
                            </div>
                            <div class="w-full bg-gradient-to-t from-calm-lavender-500 to-calm-lavender-400 rounded-t-lg transition-all duration-500 hover:from-calm-lavender-600 hover:to-calm-lavender-500"
                                :style="{ height: (day.value / Math.max(...weeklyActivity.map(d => d.value)) * 100) + '%', minHeight: '12px' }">
                            </div>
                        </div>
                        <span class="text-xs font-bold text-platinum-500 uppercase">{{ day.label }}</span>
                    </div>
                </div>
            </div>

            <!-- Top Performers -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Top Performers -->
                <div class="bg-white dark:bg-abyss-800 p-6 rounded-xl border border-sun-200 dark:border-abyss-700">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-lg font-bold text-abyss-900 dark:text-platinum-50">Top Performers</h3>
                        <Trophy class="w-5 h-5 text-amber-500" />
                    </div>
                    <div class="space-y-3">
                        <div v-for="(student, index) in topPerformers" :key="student.id"
                            class="flex items-center gap-4 p-3 bg-platinum-50 dark:bg-abyss-900/50 rounded-lg border border-sun-100 dark:border-abyss-700">
                            <div class="flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm"
                                :class="index === 0 ? 'bg-amber-500 text-white' : index === 1 ? 'bg-platinum-300 text-white' : index === 2 ? 'bg-amber-700 text-white' : 'bg-platinum-200 dark:bg-abyss-700 text-platinum-600 dark:text-platinum-400'">
                                {{ index + 1 }}
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="font-bold text-abyss-900 dark:text-platinum-50 truncate">{{ student.name }}
                                </p>
                                <p class="text-xs text-platinum-500">{{ student.completedModules }}/12 modules</p>
                            </div>
                            <div class="text-right">
                                <p class="text-lg font-bold text-emerald-600">{{ student.score }}%</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Students Needing Support -->
                <div class="bg-white dark:bg-abyss-800 p-6 rounded-xl border border-sun-200 dark:border-abyss-700">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-lg font-bold text-abyss-900 dark:text-platinum-50">Needs Support</h3>
                        <AlertCircle class="w-5 h-5 text-amber-500" />
                    </div>
                    <div class="space-y-3">
                        <div v-for="student in needsSupport" :key="student.id"
                            class="flex items-center gap-4 p-3 bg-amber-50 dark:bg-amber-900/10 rounded-lg border border-amber-200 dark:border-amber-800">
                            <AlertTriangle class="w-5 h-5 text-amber-600 flex-shrink-0" />
                            <div class="flex-1 min-w-0">
                                <p class="font-bold text-abyss-900 dark:text-platinum-50 truncate">{{ student.name }}
                                </p>
                                <p class="text-xs text-platinum-500">{{ student.issue }}</p>
                            </div>
                            <button @click="contactStudent(student)"
                                class="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium rounded-lg transition">
                                Contact
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Engagement Insights -->
            <div class="bg-gradient-to-br from-calm-lavender-600 to-calm-lavender-700 p-6 rounded-xl text-white">
                <div class="flex items-start justify-between mb-4">
                    <div>
                        <h3 class="text-xl font-bold mb-2">Engagement Insights</h3>
                        <p class="text-calm-lavender-100">AI-powered recommendations to improve classroom performance
                        </p>
                    </div>
                    <Sparkles class="w-8 h-8 text-calm-lavender-200" />
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div class="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                        <p class="font-bold mb-2">Peak Activity Time</p>
                        <p class="text-2xl font-bold mb-1">2-4 PM</p>
                        <p class="text-sm text-calm-lavender-100">Best time to post new content</p>
                    </div>
                    <div class="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                        <p class="font-bold mb-2">Most Popular Module</p>
                        <p class="text-2xl font-bold mb-1">Module 3</p>
                        <p class="text-sm text-calm-lavender-100">95% completion rate</p>
                    </div>
                    <div class="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                        <p class="font-bold mb-2">Response Time</p>
                        <p class="text-2xl font-bold mb-1">
                            < 2 hours</p>
                                <p class="text-sm text-calm-lavender-100">Your average reply time</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import {
    Download, TrendingUp, GraduationCap, Users, Clock, ArrowUp, Minus,
    Trophy, AlertCircle, AlertTriangle, Sparkles
} from 'lucide-vue-next'

const timeRange = ref('month')

const performanceRanges = [
    { label: '90-100% (Excellent)', count: 18, color: 'bg-gradient-to-r from-emerald-500 to-emerald-600' },
    { label: '75-89% (Good)', count: 15, color: 'bg-gradient-to-r from-azure-blue-500 to-azure-blue-600' },
    { label: '60-74% (Fair)', count: 9, color: 'bg-gradient-to-r from-amber-500 to-amber-600' },
    { label: 'Below 60% (Needs Improvement)', count: 3, color: 'bg-gradient-to-r from-red-500 to-red-600' }
]

const moduleStats = [
    { name: 'Module 1: Introduction to GAD', completion: 95 },
    { name: 'Module 2: Gender Equality Basics', completion: 87 },
    { name: 'Module 3: Understanding VAWC', completion: 78 },
    { name: 'Module 4: Creating Safe Spaces', completion: 65 },
    { name: 'Module 5: Response Protocols', completion: 42 }
]

const weeklyActivity = [
    { label: 'Mon', value: 120 },
    { label: 'Tue', value: 180 },
    { label: 'Wed', value: 145 },
    { label: 'Thu', value: 200 },
    { label: 'Fri', value: 95 },
    { label: 'Sat', value: 40 },
    { label: 'Sun', value: 25 }
]

const topPerformers = [
    { id: 1, name: 'Sarah Johnson', score: 98, completedModules: 12 },
    { id: 2, name: 'Michael Chen', score: 96, completedModules: 12 },
    { id: 3, name: 'Emma Davis', score: 94, completedModules: 11 },
    { id: 4, name: 'James Wilson', score: 92, completedModules: 11 },
    { id: 5, name: 'Alice Cooper', score: 90, completedModules: 10 }
]

const needsSupport = [
    { id: 1, name: 'Robert Brown', issue: 'No activity in 7 days' },
    { id: 2, name: 'Lisa Anderson', issue: 'Struggling with Module 3' },
    { id: 3, name: 'David Lee', issue: 'Low quiz scores (avg 58%)' }
]

const exportReport = () => {
    console.log('Exporting analytics report...')
}

const contactStudent = (student) => {
    console.log('Contacting student:', student.name)
}
</script>