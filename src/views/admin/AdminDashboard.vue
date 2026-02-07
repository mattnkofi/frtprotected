<!-- src/views/admin/AdminDashboard.vue -->
<template>
    <div class="space-y-6">
        <!-- Page Header -->
        <div class="flex items-center justify-between">
            <div>
                <h1 class="text-3xl font-bold text-abyss-900 dark:text-white">Admin Dashboard</h1>
                <p class="text-platinum-600 dark:text-platinum-400 mt-1">Overview of platform statistics and activity
                </p>
            </div>
            <div class="flex gap-3">
                <button
                    class="flex items-center gap-2 px-4 py-2 bg-white dark:bg-abyss-800 border border-gray-300 dark:border-abyss-700 rounded-lg hover:bg-gray-50 dark:hover:bg-abyss-700 transition-colors">
                    <DownloadIcon class="h-4 w-4" />
                    <span>Export Report</span>
                </button>
            </div>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Total Users -->
            <div
                class="bg-white dark:bg-abyss-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-abyss-700">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
                        <p class="text-3xl font-bold text-abyss-900 dark:text-white mt-2">{{ stats.totalUsers }}</p>
                        <p class="text-sm text-green-600 dark:text-green-400 mt-2">
                            +{{ stats.newUsersThisMonth }} this month
                        </p>
                    </div>
                    <div class="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <UsersIcon class="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                </div>
            </div>

            <!-- Active Facilitators -->
            <div
                class="bg-white dark:bg-abyss-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-abyss-700">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Active Facilitators</p>
                        <p class="text-3xl font-bold text-abyss-900 dark:text-white mt-2">{{ stats.activeFacilitators }}
                        </p>
                        <p class="text-sm text-purple-600 dark:text-purple-400 mt-2">
                            {{ stats.facilitatorGrowth }}% growth
                        </p>
                    </div>
                    <div class="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                        <UserCogIcon class="h-8 w-8 text-purple-600 dark:text-purple-400" />
                    </div>
                </div>
            </div>

            <!-- Total Modules -->
            <div
                class="bg-white dark:bg-abyss-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-abyss-700">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Total Modules</p>
                        <p class="text-3xl font-bold text-abyss-900 dark:text-white mt-2">{{ stats.totalModules }}</p>
                        <p class="text-sm text-green-600 dark:text-green-400 mt-2">
                            {{ stats.publishedModules }} published
                        </p>
                    </div>
                    <div class="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                        <BookOpenIcon class="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                </div>
            </div>

            <!-- Platform Health -->
            <div
                class="bg-white dark:bg-abyss-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-abyss-700">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Platform Health</p>
                        <p class="text-3xl font-bold text-abyss-900 dark:text-white mt-2">{{ stats.healthScore }}%</p>
                        <p class="text-sm text-green-600 dark:text-green-400 mt-2">
                            All systems operational
                        </p>
                    </div>
                    <div class="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                        <ActivityIcon class="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Charts and Tables Row -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Recent Activity -->
            <div
                class="bg-white dark:bg-abyss-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-abyss-700">
                <h3 class="text-lg font-semibold text-abyss-900 dark:text-white mb-4">Recent Activity</h3>
                <div class="space-y-4">
                    <div v-for="activity in recentActivity" :key="activity.id"
                        class="flex items-start gap-4 pb-4 border-b border-gray-200 dark:border-abyss-700 last:border-0">
                        <div class="p-2 bg-gray-100 dark:bg-abyss-700 rounded-lg">
                            <component :is="activity.icon" class="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div class="flex-1">
                            <p class="text-sm text-gray-900 dark:text-white">{{ activity.title }}</p>
                            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ activity.time }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Quick Actions -->
            <div
                class="bg-white dark:bg-abyss-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-abyss-700">
                <h3 class="text-lg font-semibold text-abyss-900 dark:text-white mb-4">Quick Actions</h3>
                <div class="grid grid-cols-2 gap-4">
                    <router-link to="/admin/facilitators"
                        class="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 dark:border-abyss-600 rounded-lg hover:border-kaitoke-green-500 dark:hover:border-kaitoke-green-500 hover:bg-kaitoke-green-50 dark:hover:bg-kaitoke-green-900/10 transition-all">
                        <UserPlusIcon class="h-8 w-8 text-gray-400 mb-2" />
                        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Add Facilitator</span>
                    </router-link>

                    <router-link to="/admin/content"
                        class="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 dark:border-abyss-600 rounded-lg hover:border-electric-lime-500 dark:hover:border-electric-lime-500 hover:bg-electric-lime-50 dark:hover:bg-electric-lime-900/10 transition-all">
                        <FileTextIcon class="h-8 w-8 text-gray-400 mb-2" />
                        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Manage Content</span>
                    </router-link>

                    <router-link to="/admin/reports"
                        class="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 dark:border-abyss-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all">
                        <BarChartIcon class="h-8 w-8 text-gray-400 mb-2" />
                        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">View Reports</span>
                    </router-link>

                    <router-link to="/admin/settings"
                        class="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 dark:border-abyss-600 rounded-lg hover:border-purple-500 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-all">
                        <SettingsIcon class="h-8 w-8 text-gray-400 mb-2" />
                        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Platform Settings</span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import {
    UsersIcon,
    UserCogIcon,
    BookOpenIcon,
    ActivityIcon,
    DownloadIcon,
    UserPlusIcon,
    FileTextIcon,
    BarChartIcon,
    SettingsIcon
} from 'lucide-vue-next';

const stats = ref({
    totalUsers: 1284,
    newUsersThisMonth: 156,
    activeFacilitators: 47,
    facilitatorGrowth: 12,
    totalModules: 342,
    publishedModules: 298,
    healthScore: 98
});

const recentActivity = ref([
    { id: 1, icon: UserPlusIcon, title: 'New facilitator registered: John Doe', time: '5 minutes ago' },
    { id: 2, icon: FileTextIcon, title: 'Module "Understanding VAWC" published', time: '1 hour ago' },
    { id: 3, icon: UsersIcon, title: '25 new student registrations', time: '2 hours ago' },
    { id: 4, icon: SettingsIcon, title: 'Platform settings updated', time: '3 hours ago' }
]);
</script>