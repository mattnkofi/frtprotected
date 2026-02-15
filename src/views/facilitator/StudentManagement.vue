<template>
    <div class="flex flex-col h-full">
        <!-- Header -->
        <div class="p-6 border-b border-sun-100 dark:border-abyss-700">
            <h1 class="text-2xl font-bold text-abyss-900 dark:text-platinum-50 mb-1">Student Management</h1>
            <p class="text-sm text-platinum-600 dark:text-platinum-300">Manage students and approve join requests</p>
        </div>

        <!-- Tabs -->
        <div class="px-6 border-b border-sun-100 dark:border-abyss-700">
            <div class="flex gap-6">
                <button @click="activeTab = 'students'" :class="[
                    'py-3 px-1 border-b-2 text-sm font-bold transition',
                    activeTab === 'students'
                        ? 'border-calm-lavender-600 text-calm-lavender-600'
                        : 'border-transparent text-platinum-500 hover:text-abyss-900 dark:hover:text-platinum-100'
                ]">
                    Active Students ({{ students.length }})
                </button>
                <button @click="activeTab = 'requests'" :class="[
                    'py-3 px-1 border-b-2 text-sm font-bold transition flex items-center gap-2',
                    activeTab === 'requests'
                        ? 'border-calm-lavender-600 text-calm-lavender-600'
                        : 'border-transparent text-platinum-500 hover:text-abyss-900 dark:hover:text-platinum-100'
                ]">
                    Join Requests
                    <span v-if="pendingRequests.length > 0"
                        class="px-2 py-0.5 bg-amber-500 text-white text-xs font-bold rounded-full">
                        {{ pendingRequests.length }}
                    </span>
                </button>
            </div>
        </div>

        <!-- Content -->
        <div class="flex-1 overflow-y-auto p-6">
            <!-- Active Students Tab -->
            <div v-if="activeTab === 'students'" class="space-y-4">
                <!-- Search and Filters -->
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex-1 relative">
                        <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-platinum-400" />
                        <input v-model="searchQuery" type="text" placeholder="Search students by name or email..."
                            class="w-full pl-10 pr-4 py-3 bg-platinum-50 dark:bg-abyss-900 border border-sun-200 dark:border-abyss-700 rounded-xl text-sm dark:text-white outline-none focus:ring-2 focus:ring-calm-lavender-500" />
                    </div>
                    <button @click="showAddStudent = true"
                        class="flex items-center justify-center gap-2 px-6 py-3 bg-calm-lavender-600 hover:bg-calm-lavender-700 text-white font-bold rounded-xl transition">
                        <UserPlus class="w-5 h-5" />
                        Add Student
                    </button>
                </div>

                <!-- Students List -->
                <div
                    class="bg-white dark:bg-abyss-800 rounded-xl border border-sun-200 dark:border-abyss-700 overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead
                                class="bg-platinum-50 dark:bg-abyss-900/50 border-b border-sun-100 dark:border-abyss-700">
                                <tr>
                                    <th
                                        class="px-6 py-4 text-left text-xs font-bold text-platinum-500 uppercase tracking-widest">
                                        Student
                                    </th>
                                    <th
                                        class="px-6 py-4 text-left text-xs font-bold text-platinum-500 uppercase tracking-widest">
                                        Progress
                                    </th>
                                    <th
                                        class="px-6 py-4 text-left text-xs font-bold text-platinum-500 uppercase tracking-widest">
                                        Avg Score
                                    </th>
                                    <th
                                        class="px-6 py-4 text-left text-xs font-bold text-platinum-500 uppercase tracking-widest">
                                        Status
                                    </th>
                                    <th
                                        class="px-6 py-4 text-left text-xs font-bold text-platinum-500 uppercase tracking-widest">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-sun-100 dark:divide-abyss-700">
                                <tr v-for="student in filteredStudents" :key="student.id"
                                    class="hover:bg-platinum-50 dark:hover:bg-abyss-900/30 transition">
                                    <td class="px-6 py-4">
                                        <div class="flex items-center gap-3">
                                            <div
                                                class="w-10 h-10 rounded-full bg-gradient-to-br from-calm-lavender-400 to-calm-lavender-600 flex items-center justify-center text-white font-bold text-sm">
                                                {{student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}}
                                            </div>
                                            <div>
                                                <p class="font-medium text-abyss-900 dark:text-platinum-50">{{
                                                    student.name }}</p>
                                                <p class="text-sm text-platinum-500">{{ student.email }}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4">
                                        <div class="space-y-1">
                                            <div class="flex items-center justify-between text-sm">
                                                <span class="text-platinum-600 dark:text-platinum-400">{{
                                                    student.completedModules }}/{{ student.totalModules }}</span>
                                                <span class="font-bold text-abyss-900 dark:text-platinum-50">{{
                                                    Math.round((student.completedModules / student.totalModules) * 100)
                                                    }}%</span>
                                            </div>
                                            <div
                                                class="w-32 h-2 bg-platinum-100 dark:bg-abyss-700 rounded-full overflow-hidden">
                                                <div class="h-full bg-gradient-to-r from-calm-lavender-500 to-calm-lavender-600 transition-all"
                                                    :style="{ width: (student.completedModules / student.totalModules * 100) + '%' }">
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4">
                                        <div class="flex items-center gap-2">
                                            <span :class="[
                                                'text-lg font-bold',
                                                student.avgScore >= 90 ? 'text-emerald-600' :
                                                    student.avgScore >= 75 ? 'text-azure-blue-600' :
                                                        student.avgScore >= 60 ? 'text-amber-600' : 'text-red-600'
                                            ]">
                                                {{ student.avgScore }}%
                                            </span>
                                            <TrendingUp v-if="student.trend === 'up'"
                                                class="w-4 h-4 text-emerald-500" />
                                            <TrendingDown v-else-if="student.trend === 'down'"
                                                class="w-4 h-4 text-red-500" />
                                            <Minus v-else class="w-4 h-4 text-platinum-400" />
                                        </div>
                                    </td>
                                    <td class="px-6 py-4">
                                        <span :class="[
                                            'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold',
                                            student.status === 'active' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' :
                                                student.status === 'inactive' ? 'bg-platinum-100 dark:bg-abyss-700 text-platinum-600 dark:text-platinum-400' :
                                                    'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                                        ]">
                                            <div class="w-1.5 h-1.5 rounded-full"
                                                :class="student.status === 'active' ? 'bg-emerald-500' : 'bg-platinum-400'">
                                            </div>
                                            {{ student.status }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4">
                                        <div class="flex items-center gap-2">
                                            <button @click="viewStudent(student)"
                                                class="p-2 hover:bg-platinum-100 dark:hover:bg-abyss-700 rounded-lg transition"
                                                title="View Details">
                                                <Eye class="w-4 h-4 text-platinum-600 dark:text-platinum-400" />
                                            </button>
                                            <button @click="messageStudent(student)"
                                                class="p-2 hover:bg-platinum-100 dark:hover:bg-abyss-700 rounded-lg transition"
                                                title="Send Message">
                                                <MessageSquare
                                                    class="w-4 h-4 text-platinum-600 dark:text-platinum-400" />
                                            </button>
                                            <button @click="removeStudent(student)"
                                                class="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                                                title="Remove Student">
                                                <UserMinus class="w-4 h-4 text-red-600" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Empty State -->
                <div v-if="filteredStudents.length === 0"
                    class="text-center py-12 bg-white dark:bg-abyss-800 rounded-xl border border-sun-200 dark:border-abyss-700">
                    <Users class="w-16 h-16 mx-auto text-platinum-300 mb-4" />
                    <h3 class="text-lg font-bold text-abyss-900 dark:text-platinum-50 mb-2">No students found</h3>
                    <p class="text-platinum-600 dark:text-platinum-300">
                        {{ searchQuery ? 'Try adjusting your search' : 'Invite students to get started' }}
                    </p>
                </div>
            </div>

            <!-- Join Requests Tab -->
            <div v-else-if="activeTab === 'requests'" class="space-y-4">
                <div v-if="pendingRequests.length > 0" class="space-y-3">
                    <div v-for="request in pendingRequests" :key="request.id"
                        class="bg-white dark:bg-abyss-800 rounded-xl border border-sun-200 dark:border-abyss-700 p-5 flex items-center gap-4">
                        <div
                            class="w-12 h-12 rounded-full bg-gradient-to-br from-azure-blue-400 to-azure-blue-600 flex items-center justify-center text-white font-bold">
                            {{request.name.split(' ').map(n => n[0]).join('').slice(0, 2)}}
                        </div>
                        <div class="flex-1">
                            <p class="font-bold text-abyss-900 dark:text-platinum-50">{{ request.name }}</p>
                            <p class="text-sm text-platinum-500">{{ request.email }}</p>
                            <p class="text-xs text-platinum-400 mt-1">Requested {{ request.requestedAt }}</p>
                        </div>
                        <div class="flex gap-2">
                            <button @click="approveRequest(request)"
                                class="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition">
                                <Check class="w-4 h-4" />
                                Approve
                            </button>
                            <button @click="denyRequest(request)"
                                class="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition">
                                <X class="w-4 h-4" />
                                Deny
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Empty State -->
                <div v-else
                    class="text-center py-12 bg-white dark:bg-abyss-800 rounded-xl border border-sun-200 dark:border-abyss-700">
                    <UserCheck class="w-16 h-16 mx-auto text-platinum-300 mb-4" />
                    <h3 class="text-lg font-bold text-abyss-900 dark:text-platinum-50 mb-2">No pending requests</h3>
                    <p class="text-platinum-600 dark:text-platinum-300">All join requests have been processed</p>
                </div>
            </div>
        </div>

        <!-- Add Student Modal -->
        <Transition name="modal-fade">
            <div v-if="showAddStudent"
                class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-abyss-900/60 backdrop-blur-sm">
                <div @click.stop
                    class="bg-white dark:bg-abyss-800 rounded-2xl w-full max-w-md overflow-hidden border border-sun-200 dark:border-abyss-700 shadow-2xl">
                    <div class="p-6 border-b border-sun-100 dark:border-abyss-700 flex justify-between items-center">
                        <h2 class="text-xl font-bold text-abyss-900 dark:text-platinum-50">Add Student</h2>
                        <button @click="showAddStudent = false"
                            class="p-2 hover:bg-platinum-50 dark:hover:bg-abyss-700 rounded-lg transition">
                            <X class="w-5 h-5 text-platinum-500" />
                        </button>
                    </div>
                    <form @submit.prevent="addStudent" class="p-6 space-y-4">
                        <div>
                            <label
                                class="text-xs font-bold text-platinum-500 uppercase tracking-widest mb-2 block">Student
                                Email</label>
                            <input v-model="newStudentEmail" type="email" placeholder="student@example.com" required
                                class="w-full px-3 py-2 bg-platinum-50 dark:bg-abyss-900 border border-sun-200 dark:border-abyss-700 rounded-lg text-sm dark:text-white outline-none focus:ring-2 focus:ring-calm-lavender-500" />
                        </div>
                        <div class="flex gap-3">
                            <button type="button" @click="showAddStudent = false"
                                class="flex-1 px-4 py-2 text-sm font-medium text-platinum-600 dark:text-platinum-400 hover:bg-platinum-50 dark:hover:bg-abyss-700 rounded-lg transition">
                                Cancel
                            </button>
                            <button type="submit"
                                class="flex-1 px-4 py-2 bg-calm-lavender-600 hover:bg-calm-lavender-700 text-white text-sm font-medium rounded-lg transition">
                                Add Student
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
    Search, UserPlus, Eye, MessageSquare, UserMinus, TrendingUp, TrendingDown,
    Minus, Check, X, Users, UserCheck
} from 'lucide-vue-next'

const activeTab = ref('students')
const searchQuery = ref('')
const showAddStudent = ref(false)
const newStudentEmail = ref('')

// Mock data
const students = ref([
    {
        id: 1,
        name: 'Sarah Johnson',
        email: 'sarah.j@example.com',
        completedModules: 10,
        totalModules: 12,
        avgScore: 92,
        trend: 'up',
        status: 'active'
    },
    {
        id: 2,
        name: 'Michael Chen',
        email: 'michael.c@example.com',
        completedModules: 8,
        totalModules: 12,
        avgScore: 85,
        trend: 'up',
        status: 'active'
    },
    {
        id: 3,
        name: 'Emma Davis',
        email: 'emma.d@example.com',
        completedModules: 5,
        totalModules: 12,
        avgScore: 78,
        trend: 'stable',
        status: 'active'
    },
    {
        id: 4,
        name: 'James Wilson',
        email: 'james.w@example.com',
        completedModules: 3,
        totalModules: 12,
        avgScore: 65,
        trend: 'down',
        status: 'inactive'
    }
])

const pendingRequests = ref([
    {
        id: 1,
        name: 'Alice Cooper',
        email: 'alice.c@example.com',
        requestedAt: '2 hours ago'
    },
    {
        id: 2,
        name: 'Bob Martinez',
        email: 'bob.m@example.com',
        requestedAt: '1 day ago'
    },
    {
        id: 3,
        name: 'Carol White',
        email: 'carol.w@example.com',
        requestedAt: '3 days ago'
    }
])

const filteredStudents = computed(() => {
    if (!searchQuery.value) return students.value

    const query = searchQuery.value.toLowerCase()
    return students.value.filter(s =>
        s.name.toLowerCase().includes(query) ||
        s.email.toLowerCase().includes(query)
    )
})

const viewStudent = (student) => {
    console.log('Viewing student:', student.name)
}

const messageStudent = (student) => {
    console.log('Messaging student:', student.name)
}

const removeStudent = (student) => {
    if (confirm(`Remove ${student.name} from this classroom?`)) {
        students.value = students.value.filter(s => s.id !== student.id)
        console.log('Removed student:', student.name)
    }
}

const approveRequest = (request) => {
    console.log('Approving request from:', request.name)
    pendingRequests.value = pendingRequests.value.filter(r => r.id !== request.id)
}

const denyRequest = (request) => {
    if (confirm(`Deny join request from ${request.name}?`)) {
        pendingRequests.value = pendingRequests.value.filter(r => r.id !== request.id)
        console.log('Denied request from:', request.name)
    }
}

const addStudent = () => {
    if (newStudentEmail.value) {
        console.log('Adding student:', newStudentEmail.value)
        newStudentEmail.value = ''
        showAddStudent.value = false
    }
}
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
}
</style>