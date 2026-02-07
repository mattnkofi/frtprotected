<!-- src/views/facilitator/FacilitatorDashboard.vue -->
<template>
    <div class="space-y-6">
        <!-- Page Header -->
        <div class="flex items-center justify-between">
            <div>
                <h1 class="text-3xl font-bold text-abyss-900 dark:text-white">Welcome back, {{ facilitatorName }}!</h1>
                <p class="text-platinum-600 dark:text-platinum-400 mt-1">Here's what's happening with your students
                    today</p>
            </div>
            <router-link to="/facilitator/modules/create"
                class="flex items-center gap-2 px-6 py-3 bg-electric-lime-600 hover:bg-electric-lime-700 text-white rounded-lg font-medium transition-colors">
                <PlusIcon class="h-5 w-5" />
                <span>Create Module</span>
            </router-link>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- My Students -->
            <div
                class="bg-white dark:bg-abyss-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-abyss-700">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-600 dark:text-gray-400">My Students</p>
                        <p class="text-3xl font-bold text-abyss-900 dark:text-white mt-2">{{ stats.totalStudents }}</p>
                        <p class="text-sm text-green-600 dark:text-green-400 mt-2">
                            {{ stats.activeStudents }} active today
                        </p>
                    </div>
                    <div class="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <UsersIcon class="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                </div>
            </div>

            <!-- My Modules -->
            <div
                class="bg-white dark:bg-abyss-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-abyss-700">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-600 dark:text-gray-400">My Modules</p>
                        <p class="text-3xl font-bold text-abyss-900 dark:text-white mt-2">{{ stats.myModules }}</p>
                        <p class="text-sm text-purple-600 dark:text-purple-400 mt-2">
                            {{ stats.publishedModules }} published
                        </p>
                    </div>
                    <div class="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                        <BookOpenIcon class="h-8 w-8 text-purple-600 dark:text-purple-400" />
                    </div>
                </div>
            </div>

            <!-- Completion Rate -->
            <div
                class="bg-white dark:bg-abyss-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-abyss-700">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Completion Rate</p>
                        <p class="text-3xl font-bold text-abyss-900 dark:text-white mt-2">{{ stats.completionRate }}%
                        </p>
                        <p class="text-sm text-green-600 dark:text-green-400 mt-2">
                            +{{ stats.completionGrowth }}% from last month
                        </p>
                    </div>
                    <div class="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                        <TrendingUpIcon class="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                </div>
            </div>

            <!-- Pending Reviews -->
            <div
                class="bg-white dark:bg-abyss-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-abyss-700">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Pending Reviews</p>
                        <p class="text-3xl font-bold text-abyss-900 dark:text-white mt-2">{{ stats.pendingReviews }}</p>
                        <router-link to="/facilitator/reviews"
                            class="text-sm text-orange-600 dark:text-orange-400 mt-2 inline-block hover:underline">
                            Review now →
                        </router-link>
                    </div>
                    <div class="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                        <ClipboardCheckIcon class="h-8 w-8 text-orange-600 dark:text-orange-400" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Content Row -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Recent Student Activity -->
            <div
                class="lg:col-span-2 bg-white dark:bg-abyss-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-abyss-700">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold text-abyss-900 dark:text-white">Recent Student Activity</h3>
                    <router-link to="/facilitator/students"
                        class="text-sm text-electric-lime-600 hover:text-electric-lime-700 font-medium">
                        View All →
                    </router-link>
                </div>
                <div class="space-y-4">
                    <div v-for="activity in studentActivity" :key="activity.id"
                        class="flex items-center justify-between p-4 bg-gray-50 dark:bg-abyss-900 rounded-lg">
                        <div class="flex items-center gap-3">
                            <img :src="activity.avatar" :alt="activity.name"
                                class="h-10 w-10 rounded-full object-cover" />
                            <div>
                                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ activity.name }}</p>
                                <p class="text-xs text-gray-500 dark:text-gray-400">{{ activity.action }}</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="text-sm font-medium text-gray-900 dark:text-white">{{ activity.score }}%</p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">{{ activity.time }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Quick Links -->
            <div
                class="bg-white dark:bg-abyss-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-abyss-700">
                <h3 class="text-lg font-semibold text-abyss-900 dark:text-white mb-4">Quick Actions</h3>
                <div class="space-y-3">
                    <router-link to="/facilitator/modules/create"
                        class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-abyss-900 transition-colors">
                        <div class="p-2 bg-electric-lime-100 dark:bg-electric-lime-900/30 rounded-lg">
                            <PlusIcon class="h-5 w-5 text-electric-lime-600 dark:text-electric-lime-400" />
                        </div>
                        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Create New Module</span>
                    </router-link>

                    <router-link to="/facilitator/students"
                        class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-abyss-900 transition-colors">
                        <div class="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                            <UsersIcon class="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">View Students</span>
                    </router-link>

                    <router-link to="/facilitator/analytics"
                        class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-abyss-900 transition-colors">
                        <div class="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                            <LineChartIcon class="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">View Analytics</span>
                    </router-link>

                    <router-link to="/facilitator/resources"
                        class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-abyss-900 transition-colors">
                        <div class="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                            <FolderIcon class="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Teaching Resources</span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import {
    PlusIcon,
    UsersIcon,
    BookOpenIcon,
    TrendingUpIcon,
    ClipboardCheckIcon,
    LineChartIcon,
    FolderIcon
} from 'lucide-vue-next';

const authStore = useAuthStore();

const facilitatorName = computed(() => authStore.user?.name?.split(' ')[0] || 'Facilitator');

const stats = ref({
    totalStudents: 87,
    activeStudents: 34,
    myModules: 23,
    publishedModules: 19,
    completionRate: 76,
    completionGrowth: 8,
    pendingReviews: 12
});

const studentActivity = ref([
    {
        id: 1,
        name: 'Maria Santos',
        action: 'Completed "Understanding VAWC"',
        score: 95,
        time: '10 minutes ago',
        avatar: 'https://ui-avatars.com/api/?name=Maria+Santos&background=059669&color=fff'
    },
    {
        id: 2,
        name: 'Juan Dela Cruz',
        action: 'Started "Gender Equality Basics"',
        score: 0,
        time: '30 minutes ago',
        avatar: 'https://ui-avatars.com/api/?name=Juan+Dela+Cruz&background=3b82f6&color=fff'
    },
    {
        id: 3,
        name: 'Ana Reyes',
        action: 'Completed Quiz on GAD',
        score: 88,
        time: '1 hour ago',
        avatar: 'https://ui-avatars.com/api/?name=Ana+Reyes&background=a855f7&color=fff'
    }
]);
</script>