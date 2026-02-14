<template>
    <div class="space-y-6">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h1 class="text-3xl font-bold text-abyss-900 dark:text-platinum-50">My Classrooms</h1>
                <p class="text-platinum-600 dark:text-platinum-300">Track your learning performance and class activity.
                </p>
            </div>
            <div class="flex items-center gap-3">
                <router-link :to="{ name: 'classroom.analytics' }"
                    class="p-3 bg-white dark:bg-abyss-800 border border-sun-200 dark:border-abyss-700 text-platinum-600 dark:text-platinum-300 rounded-xl hover:bg-platinum-50 dark:hover:bg-abyss-700 transition-all shadow-sm"
                    title="Overall Analytics & Settings">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </router-link>
                <button @click="showJoinModal = true"
                    class="flex items-center justify-center gap-2 px-6 py-3 bg-calm-lavender-600 hover:bg-calm-lavender-700 text-white font-bold rounded-xl transition-all shadow-lg">
                    <span class="text-xl">+</span> Join a Class
                </button>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div v-for="classroom in joinedClasses" :key="classroom.id"
                class="group relative bg-white dark:bg-abyss-800 rounded-2xl border border-sun-200 dark:border-abyss-700 overflow-hidden hover:shadow-xl transition-all flex flex-col">
                <div :class="classroom.themeColor" class="h-20 w-full relative">
                    <div class="absolute top-3 right-3">
                        <button @click.stop="toggleSettings(classroom.id)"
                            class="p-2 bg-black/10 hover:bg-black/20 rounded-full text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="p-5 flex-1 flex flex-col">
                    <div class="mb-4">
                        <h3 class="text-lg font-bold text-abyss-900 dark:text-platinum-50 truncate">{{ classroom.name }}
                        </h3>
                        <p class="text-sm text-platinum-500 truncate">{{ classroom.instructor }}</p>
                    </div>

                    <div class="mt-auto space-y-4">
                        <div class="space-y-1.5">
                            <div class="flex justify-between text-xs font-bold">
                                <span class="text-platinum-500 uppercase">My Progress</span>
                                <span class="text-abyss-900 dark:text-platinum-300">{{ classroom.completedModules }}/{{
                                    classroom.totalModules }}</span>
                            </div>
                            <div class="h-2 bg-sun-100 dark:bg-abyss-700 rounded-full overflow-hidden">
                                <div class="h-full bg-calm-lavender-500 transition-all duration-700"
                                    :style="{ width: (classroom.completedModules / classroom.totalModules * 100) + '%' }">
                                </div>
                            </div>
                        </div>
                        <router-link :to="{ name: 'user.dashboard' }"
                            class="block text-center w-full py-2.5 text-sm font-bold text-calm-lavender-600 hover:bg-calm-lavender-50 dark:hover:bg-calm-lavender-900/20 rounded-lg border border-calm-lavender-100 dark:border-calm-lavender-900/30 transition-all">
                            Enter Classroom
                        </router-link>
                    </div>
                </div>

                <div v-if="activeSettingsId === classroom.id"
                    class="absolute top-12 right-4 z-20 w-48 bg-white dark:bg-abyss-800 rounded-xl shadow-2xl border border-sun-100 dark:border-abyss-700 py-2">
                    <button @click="viewAnalytics(classroom)"
                        class="w-full text-left px-4 py-2 text-sm text-abyss-900 dark:text-platinum-100 hover:bg-platinum-50 dark:hover:bg-abyss-700 flex items-center gap-2">
                        <span>📊</span> View Insights
                    </button>
                    <div class="h-px bg-sun-100 dark:bg-abyss-700 my-1"></div>
                    <button @click="leaveClass(classroom)"
                        class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 font-bold">
                        Leave Classroom
                    </button>
                </div>
            </div>
        </div>

        <div v-if="selectedClassForAnalytics"
            class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-abyss-900/60 backdrop-blur-md">
            <div
                class="bg-white dark:bg-abyss-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-sun-200 dark:border-abyss-700">
                <div
                    class="p-6 border-b border-sun-100 dark:border-abyss-700 flex justify-between items-center bg-platinum-50 dark:bg-abyss-900/50">
                    <div>
                        <h2 class="text-xl font-bold text-abyss-900 dark:text-platinum-50">Class Insights</h2>
                        <p class="text-sm text-platinum-500">{{ selectedClassForAnalytics.name }}</p>
                    </div>
                    <button @click="selectedClassForAnalytics = null"
                        class="p-2 hover:bg-sun-200 dark:hover:bg-abyss-700 rounded-full transition">✕</button>
                </div>

                <div class="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div v-for="stat in mockAnalytics.stats" :key="stat.label"
                            class="p-4 bg-platinum-50 dark:bg-abyss-900 rounded-2xl border border-sun-100 dark:border-abyss-700">
                            <p class="text-xs font-bold text-platinum-500 uppercase tracking-widest mb-1">{{ stat.label
                            }}</p>
                            <p class="text-2xl font-bold text-calm-lavender-600">{{ stat.value }}</p>
                        </div>
                    </div>

                    <div class="space-y-4">
                        <h3 class="font-bold text-abyss-900 dark:text-platinum-50 flex items-center gap-2">
                            <span>📈</span> Weekly Activity
                        </h3>
                        <div
                            class="h-40 flex items-end justify-between gap-2 px-2 border-b border-sun-200 dark:border-abyss-700">
                            <div v-for="(day, i) in mockAnalytics.activity" :key="i"
                                class="flex-1 flex flex-col items-center gap-2">
                                <div class="w-full bg-calm-lavender-500 rounded-t-md transition-all duration-1000"
                                    :style="{ height: day.value + '%' }"></div>
                                <span class="text-[10px] font-bold text-platinum-400 uppercase">{{ day.label }}</span>
                            </div>
                        </div>
                    </div>

                    <div
                        class="bg-sun-50 dark:bg-abyss-900/50 p-6 rounded-2xl border border-sun-100 dark:border-abyss-700">
                        <h3 class="font-bold text-abyss-900 dark:text-platinum-50 mb-4">Peer Comparison</h3>
                        <div class="space-y-4">
                            <div class="flex justify-between text-sm">
                                <span class="text-platinum-600 dark:text-platinum-400">Average Quiz Score</span>
                                <span class="font-bold dark:text-platinum-100">{{ mockAnalytics.averageScore }}%</span>
                            </div>
                            <div class="flex justify-between text-sm">
                                <span class="text-platinum-600 dark:text-platinum-400">Class Average</span>
                                <span class="font-bold dark:text-platinum-100">{{ mockAnalytics.classAverageScore
                                }}%</span>
                            </div>
                            <div class="w-full h-1 bg-sun-200 dark:bg-abyss-700 rounded-full relative overflow-hidden">
                                <div class="absolute inset-y-0 left-0 bg-calm-lavender-500 rounded-full"
                                    :style="{ width: mockAnalytics.averageScore + '%' }"></div>
                                <div class="absolute inset-y-0 border-r-2 border-abyss-900 dark:border-white opacity-50"
                                    :style="{ left: mockAnalytics.classAverageScore + '%' }"></div>
                            </div>
                            <p class="text-[10px] text-platinum-500 italic">* The vertical line represents the class
                                average.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from '@/utils/useToast';

const toast = useToast();
const isLoading = ref(false);
const showJoinModal = ref(false);
const activeSettingsId = ref(null);
const selectedClassForAnalytics = ref(null);

// Mock Classroom Data
const joinedClasses = ref([
    { id: 1, name: 'Cybersecurity 101', instructor: 'Prof. Sarah Jenkins', totalModules: 12, completedModules: 9, themeColor: 'bg-calm-lavender-600' },
    { id: 2, name: 'Network Infrastructure', instructor: 'Dr. James Miller', totalModules: 8, completedModules: 2, themeColor: 'bg-blue-600' },
    { id: 3, name: 'Web Dev Capstone', instructor: 'Prof. Alan Turing', totalModules: 15, completedModules: 15, themeColor: 'bg-purple-600' }
]);

// Mock Analytics Data for the Student
const mockAnalytics = {
    stats: [
        { label: 'Overall Grade', value: 'A-' },
        { label: 'Total XP', value: '2,450' },
        { label: 'Time Spent', value: '14.5h' }
    ],
    activity: [
        { label: 'Mon', value: 30 }, { label: 'Tue', value: 80 }, { label: 'Wed', value: 45 },
        { label: 'Thu', value: 90 }, { label: 'Fri', value: 20 }, { label: 'Sat', value: 10 }, { label: 'Sun', value: 5 }
    ],
    averageScore: 88,
    classAverageScore: 72
};

const toggleSettings = (id) => {
    activeSettingsId.value = activeSettingsId.value === id ? null : id;
};

const viewAnalytics = (classroom) => {
    selectedClassForAnalytics.value = classroom;
    activeSettingsId.value = null;
};

const leaveClass = (classroom) => {
    if (confirm(`Are you sure you want to leave ${classroom.name}?`)) {
        joinedClasses.value = joinedClasses.value.filter(c => c.id !== classroom.id);
        toast.info(`Left ${classroom.name}`);
        activeSettingsId.value = null;
    }
};
</script>