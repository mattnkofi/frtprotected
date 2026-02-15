<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h1 class="text-3xl font-bold text-abyss-900 dark:text-platinum-50">My Classrooms</h1>
                <p class="text-platinum-600 dark:text-platinum-300">Manage your classes and track student progress</p>
            </div>
            <div class="flex items-center gap-3">
                <button @click="showFilters = !showFilters"
                    class="p-3 bg-white dark:bg-abyss-800 border border-sun-200 dark:border-abyss-700 text-platinum-600 dark:text-platinum-300 rounded-xl hover:bg-platinum-50 dark:hover:bg-abyss-700 transition-all"
                    title="Filter & Sort">
                    <SlidersHorizontal class="w-5 h-5" />
                </button>
                <router-link :to="{ name: 'classroom.create' }"
                    class="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-calm-lavender-600 to-calm-lavender-700 hover:from-calm-lavender-700 hover:to-calm-lavender-800 text-white font-bold rounded-xl transition-all shadow-lg">
                    <Plus class="w-5 h-5" />
                    Create Classroom
                </router-link>
            </div>
        </div>

        <!-- Filters (collapsible) -->
        <Transition name="slide-fade">
            <div v-if="showFilters"
                class="bg-white dark:bg-abyss-800 p-4 rounded-xl border border-sun-200 dark:border-abyss-700">
                <div class="flex flex-wrap gap-4">
                    <div class="flex-1 min-w-[200px]">
                        <label class="text-xs font-bold text-platinum-500 uppercase tracking-widest mb-2 block">Sort
                            By</label>
                        <select v-model="sortBy"
                            class="w-full px-3 py-2 bg-platinum-50 dark:bg-abyss-900 border border-sun-200 dark:border-abyss-700 rounded-lg text-sm dark:text-white outline-none focus:ring-2 focus:ring-calm-lavender-500">
                            <option value="recent">Recently Updated</option>
                            <option value="name">Name (A-Z)</option>
                            <option value="students">Most Students</option>
                        </select>
                    </div>
                    <div class="flex-1 min-w-[200px]">
                        <label
                            class="text-xs font-bold text-platinum-500 uppercase tracking-widest mb-2 block">Visibility</label>
                        <select v-model="filterVisibility"
                            class="w-full px-3 py-2 bg-platinum-50 dark:bg-abyss-900 border border-sun-200 dark:border-abyss-700 rounded-lg text-sm dark:text-white outline-none focus:ring-2 focus:ring-calm-lavender-500">
                            <option value="all">All</option>
                            <option value="public">Public Only</option>
                            <option value="private">Private Only</option>
                        </select>
                    </div>
                </div>
            </div>
        </Transition>

        <!-- Stats Overview -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="bg-white dark:bg-abyss-800 p-5 rounded-xl border border-sun-200 dark:border-abyss-700">
                <div class="flex items-center gap-3">
                    <div class="p-3 bg-calm-lavender-100 dark:bg-calm-lavender-900/20 rounded-lg">
                        <School class="w-6 h-6 text-calm-lavender-600" />
                    </div>
                    <div>
                        <p class="text-xs font-bold text-platinum-500 uppercase tracking-widest">Total Classes</p>
                        <p class="text-2xl font-bold text-abyss-900 dark:text-platinum-50">{{ stats.totalClasses }}</p>
                    </div>
                </div>
            </div>
            <div class="bg-white dark:bg-abyss-800 p-5 rounded-xl border border-sun-200 dark:border-abyss-700">
                <div class="flex items-center gap-3">
                    <div class="p-3 bg-azure-blue-100 dark:bg-azure-blue-900/20 rounded-lg">
                        <Users class="w-6 h-6 text-azure-blue-600" />
                    </div>
                    <div>
                        <p class="text-xs font-bold text-platinum-500 uppercase tracking-widest">Total Students</p>
                        <p class="text-2xl font-bold text-abyss-900 dark:text-platinum-50">{{ stats.totalStudents }}</p>
                    </div>
                </div>
            </div>
            <div class="bg-white dark:bg-abyss-800 p-5 rounded-xl border border-sun-200 dark:border-abyss-700">
                <div class="flex items-center gap-3">
                    <div class="p-3 bg-neon-pink-100 dark:bg-neon-pink-900/20 rounded-lg">
                        <UserCheck class="w-6 h-6 text-neon-pink-600" />
                    </div>
                    <div>
                        <p class="text-xs font-bold text-platinum-500 uppercase tracking-widest">Pending Requests</p>
                        <p class="text-2xl font-bold text-abyss-900 dark:text-platinum-50">{{ stats.pendingRequests }}
                        </p>
                    </div>
                </div>
            </div>
            <div class="bg-white dark:bg-abyss-800 p-5 rounded-xl border border-sun-200 dark:border-abyss-700">
                <div class="flex items-center gap-3">
                    <div class="p-3 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg">
                        <TrendingUp class="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                        <p class="text-xs font-bold text-platinum-500 uppercase tracking-widest">Avg Completion</p>
                        <p class="text-2xl font-bold text-abyss-900 dark:text-platinum-50">{{ stats.avgCompletion }}%
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Classrooms Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="classroom in filteredClassrooms" :key="classroom.id"
                class="group relative bg-white dark:bg-abyss-800 rounded-2xl border border-sun-200 dark:border-abyss-700 overflow-hidden hover:shadow-xl transition-all flex flex-col">

                <!-- Cover Image / Theme Color Header -->
                <div class="h-32 w-full relative overflow-hidden">
                    <img v-if="classroom.coverImage" :src="classroom.coverImage" alt="Classroom cover"
                        class="w-full h-full object-cover" />
                    <div v-else :class="getThemeColorClass(classroom.themeColor)" class="w-full h-full"></div>

                    <!-- Visibility Badge -->
                    <div class="absolute top-3 left-3">
                        <div
                            class="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 dark:bg-abyss-900/90 backdrop-blur-sm rounded-full text-xs font-bold">
                            <Lock v-if="classroom.visibility === 'private'" class="w-3.5 h-3.5 text-amber-600" />
                            <Globe v-else class="w-3.5 h-3.5 text-emerald-600" />
                            <span class="text-abyss-900 dark:text-platinum-50 capitalize">{{ classroom.visibility
                                }}</span>
                        </div>
                    </div>

                    <!-- Actions Menu -->
                    <div class="absolute top-3 right-3">
                        <button @click.stop="toggleActions(classroom.id)"
                            class="p-2 bg-white/90 dark:bg-abyss-900/90 hover:bg-white dark:hover:bg-abyss-900 backdrop-blur-sm rounded-full transition">
                            <MoreVertical class="w-5 h-5 text-abyss-900 dark:text-platinum-50" />
                        </button>

                        <!-- Actions Dropdown -->
                        <Transition name="scale-fade">
                            <div v-if="activeActionsId === classroom.id"
                                class="absolute top-12 right-0 z-20 w-48 bg-white dark:bg-abyss-800 rounded-xl shadow-2xl border border-sun-100 dark:border-abyss-700 py-2">
                                <button @click="editClassroom(classroom)"
                                    class="w-full text-left px-4 py-2.5 text-sm text-abyss-900 dark:text-platinum-100 hover:bg-platinum-50 dark:hover:bg-abyss-700 flex items-center gap-3 transition">
                                    <Edit3 class="w-4 h-4" /> Edit Details
                                </button>
                                <button @click="duplicateClassroom(classroom)"
                                    class="w-full text-left px-4 py-2.5 text-sm text-abyss-900 dark:text-platinum-100 hover:bg-platinum-50 dark:hover:bg-abyss-700 flex items-center gap-3 transition">
                                    <Copy class="w-4 h-4" /> Duplicate
                                </button>
                                <button @click="archiveClassroom(classroom)"
                                    class="w-full text-left px-4 py-2.5 text-sm text-abyss-900 dark:text-platinum-100 hover:bg-platinum-50 dark:hover:bg-abyss-700 flex items-center gap-3 transition">
                                    <Archive class="w-4 h-4" /> Archive
                                </button>
                                <div class="h-px bg-sun-100 dark:bg-abyss-700 my-1"></div>
                                <button @click="deleteClassroom(classroom)"
                                    class="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 font-bold flex items-center gap-3 transition">
                                    <Trash2 class="w-4 h-4" /> Delete
                                </button>
                            </div>
                        </Transition>
                    </div>
                </div>

                <!-- Content -->
                <div class="p-5 flex-1 flex flex-col">
                    <div class="mb-4">
                        <h3 class="text-lg font-bold text-abyss-900 dark:text-platinum-50 line-clamp-1">
                            {{ classroom.name }}
                        </h3>
                        <p class="text-sm text-platinum-500 line-clamp-2 mt-1">{{ classroom.description }}</p>
                    </div>

                    <!-- Stats -->
                    <div class="grid grid-cols-3 gap-3 mb-4">
                        <div
                            class="text-center p-2 bg-platinum-50 dark:bg-abyss-900 rounded-lg border border-sun-100 dark:border-abyss-700">
                            <p class="text-xs font-bold text-platinum-500 uppercase">Students</p>
                            <p class="text-lg font-bold text-abyss-900 dark:text-platinum-50">{{ classroom.studentCount
                                }}</p>
                        </div>
                        <div
                            class="text-center p-2 bg-platinum-50 dark:bg-abyss-900 rounded-lg border border-sun-100 dark:border-abyss-700">
                            <p class="text-xs font-bold text-platinum-500 uppercase">Channels</p>
                            <p class="text-lg font-bold text-abyss-900 dark:text-platinum-50">{{ classroom.channelCount
                                }}</p>
                        </div>
                        <div
                            class="text-center p-2 bg-platinum-50 dark:bg-abyss-900 rounded-lg border border-sun-100 dark:border-abyss-700">
                            <p class="text-xs font-bold text-platinum-500 uppercase">Modules</p>
                            <p class="text-lg font-bold text-abyss-900 dark:text-platinum-50">{{ classroom.moduleCount
                                }}</p>
                        </div>
                    </div>

                    <!-- Pending Requests Badge -->
                    <div v-if="classroom.pendingRequests > 0"
                        class="mb-3 flex items-center gap-2 px-3 py-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                        <Bell class="w-4 h-4 text-amber-600" />
                        <span class="text-sm font-medium text-amber-900 dark:text-amber-300">
                            {{ classroom.pendingRequests }} pending {{ classroom.pendingRequests === 1 ? 'request' :
                            'requests' }}
                        </span>
                    </div>

                    <!-- Actions -->
                    <div class="mt-auto space-y-2">
                        <router-link :to="{ name: 'classroom.dashboard', params: { id: classroom.id } }"
                            class="block text-center w-full py-2.5 text-sm font-bold text-white bg-gradient-to-r from-calm-lavender-600 to-calm-lavender-700 hover:from-calm-lavender-700 hover:to-calm-lavender-800 rounded-lg transition-all">
                            Manage Classroom
                        </router-link>
                        <div class="grid grid-cols-2 gap-2">
                            <router-link :to="{ name: 'classroom.analytics', params: { id: classroom.id } }"
                                class="flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-calm-lavender-600 hover:bg-calm-lavender-50 dark:hover:bg-calm-lavender-900/20 rounded-lg border border-calm-lavender-200 dark:border-calm-lavender-900/30 transition-all">
                                <BarChart3 class="w-3.5 h-3.5" /> Analytics
                            </router-link>
                            <router-link :to="{ name: 'classroom.students', params: { id: classroom.id } }"
                                class="flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-azure-blue-600 hover:bg-azure-blue-50 dark:hover:bg-azure-blue-900/20 rounded-lg border border-azure-blue-200 dark:border-azure-blue-900/30 transition-all">
                                <Users class="w-3.5 h-3.5" /> Students
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredClassrooms.length === 0"
            class="bg-white dark:bg-abyss-800 rounded-2xl border border-sun-200 dark:border-abyss-700 p-12 text-center">
            <div
                class="w-20 h-20 mx-auto mb-4 bg-platinum-100 dark:bg-abyss-900 rounded-full flex items-center justify-center">
                <School class="w-10 h-10 text-platinum-400" />
            </div>
            <h3 class="text-xl font-bold text-abyss-900 dark:text-platinum-50 mb-2">No classrooms found</h3>
            <p class="text-platinum-600 dark:text-platinum-300 mb-6">
                {{ classrooms.length === 0 ? 'Create your first classroom to get started' : 'Try adjusting your filters'
                }}
            </p>
            <router-link v-if="classrooms.length === 0" :to="{ name: 'classroom.create' }"
                class="inline-flex items-center gap-2 px-6 py-3 bg-calm-lavender-600 hover:bg-calm-lavender-700 text-white font-bold rounded-xl transition-all">
                <Plus class="w-5 h-5" /> Create Your First Classroom
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
    Plus, SlidersHorizontal, School, Users, UserCheck, TrendingUp,
    MoreVertical, Lock, Globe, Bell, Edit3, Copy, Archive, Trash2, BarChart3
} from 'lucide-vue-next'

const router = useRouter()
const showFilters = ref(false)
const sortBy = ref('recent')
const filterVisibility = ref('all')
const activeActionsId = ref(null)

// Mock data
const classrooms = ref([
    {
        id: 1,
        name: 'Gender & Development 101',
        description: 'Comprehensive introduction to gender equality, VAWC prevention, and inclusive education practices.',
        visibility: 'public',
        themeColor: 'lavender',
        coverImage: null,
        studentCount: 45,
        channelCount: 5,
        moduleCount: 12,
        pendingRequests: 3,
        updatedAt: new Date('2026-02-14')
    },
    {
        id: 2,
        name: 'Sexual Health Education',
        description: 'Age-appropriate sexual health education covering consent, healthy relationships, and body autonomy.',
        visibility: 'private',
        themeColor: 'pink',
        coverImage: null,
        studentCount: 28,
        channelCount: 4,
        moduleCount: 8,
        pendingRequests: 0,
        updatedAt: new Date('2026-02-13')
    },
    {
        id: 3,
        name: 'VAWC Prevention & Response',
        description: 'Training on recognizing, preventing, and responding to violence against women and children.',
        visibility: 'public',
        themeColor: 'azure',
        coverImage: null,
        studentCount: 62,
        channelCount: 6,
        moduleCount: 15,
        pendingRequests: 7,
        updatedAt: new Date('2026-02-12')
    },
    {
        id: 4,
        name: 'Safe Spaces & Inclusivity',
        description: 'Creating safe, inclusive environments for all students regardless of gender identity or expression.',
        visibility: 'public',
        themeColor: 'emerald',
        coverImage: null,
        studentCount: 34,
        channelCount: 3,
        moduleCount: 6,
        pendingRequests: 1,
        updatedAt: new Date('2026-02-11')
    }
])

const stats = computed(() => ({
    totalClasses: classrooms.value.length,
    totalStudents: classrooms.value.reduce((sum, c) => sum + c.studentCount, 0),
    pendingRequests: classrooms.value.reduce((sum, c) => sum + c.pendingRequests, 0),
    avgCompletion: Math.round(
        classrooms.value.reduce((sum, c) => sum + (c.studentCount > 0 ? 75 : 0), 0) / classrooms.value.length
    )
}))

const filteredClassrooms = computed(() => {
    let result = [...classrooms.value]

    // Filter by visibility
    if (filterVisibility.value !== 'all') {
        result = result.filter(c => c.visibility === filterVisibility.value)
    }

    // Sort
    if (sortBy.value === 'name') {
        result.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy.value === 'students') {
        result.sort((a, b) => b.studentCount - a.studentCount)
    } else {
        result.sort((a, b) => b.updatedAt - a.updatedAt)
    }

    return result
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

const toggleActions = (id) => {
    activeActionsId.value = activeActionsId.value === id ? null : id
}

const editClassroom = (classroom) => {
    router.push({ name: 'classroom.edit', params: { id: classroom.id } })
    activeActionsId.value = null
}

const duplicateClassroom = (classroom) => {
    console.log('Duplicating classroom:', classroom.name)
    activeActionsId.value = null
}

const archiveClassroom = (classroom) => {
    console.log('Archiving classroom:', classroom.name)
    activeActionsId.value = null
}

const deleteClassroom = (classroom) => {
    if (confirm(`Are you sure you want to delete "${classroom.name}"? This action cannot be undone.`)) {
        classrooms.value = classrooms.value.filter(c => c.id !== classroom.id)
        console.log('Deleted classroom:', classroom.name)
    }
    activeActionsId.value = null
}
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.2s ease;
}

.slide-fade-enter-from {
    transform: translateY(-10px);
    opacity: 0;
}

.slide-fade-leave-to {
    transform: translateY(-10px);
    opacity: 0;
}

.scale-fade-enter-active,
.scale-fade-leave-active {
    transition: all 0.15s ease;
}

.scale-fade-enter-from {
    transform: scale(0.95);
    opacity: 0;
}

.scale-fade-leave-to {
    transform: scale(0.95);
    opacity: 0;
}
</style>