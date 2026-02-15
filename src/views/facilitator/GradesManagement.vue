<template>
    <div class="flex flex-col h-full">
        <!-- Header -->
        <div class="p-6 border-b border-sun-100 dark:border-abyss-700">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-2xl font-bold text-abyss-900 dark:text-platinum-50 mb-1">Grades Management</h1>
                    <p class="text-sm text-platinum-600 dark:text-platinum-300">View and manage student grades and
                        assessments</p>
                </div>
                <div class="flex items-center gap-3">
                    <button @click="showGradingSettings = true"
                        class="flex items-center gap-2 px-4 py-2 bg-white dark:bg-abyss-900 border border-sun-200 dark:border-abyss-700 text-platinum-600 dark:text-platinum-300 rounded-lg hover:bg-platinum-50 dark:hover:bg-abyss-700 transition font-medium">
                        <Settings class="w-4 h-4" />
                        Grading Scale
                    </button>
                    <button @click="exportGrades"
                        class="flex items-center gap-2 px-4 py-2 bg-calm-lavender-600 hover:bg-calm-lavender-700 text-white font-medium rounded-lg transition">
                        <Download class="w-4 h-4" />
                        Export Grades
                    </button>
                </div>
            </div>
        </div>

        <!-- Filter Bar -->
        <div class="p-4 border-b border-sun-100 dark:border-abyss-700 bg-platinum-50 dark:bg-abyss-900/30">
            <div class="flex flex-wrap gap-3">
                <select v-model="selectedModule"
                    class="px-3 py-2 bg-white dark:bg-abyss-900 border border-sun-200 dark:border-abyss-700 rounded-lg text-sm font-medium dark:text-white outline-none focus:ring-2 focus:ring-calm-lavender-500">
                    <option value="all">All Modules</option>
                    <option v-for="module in modules" :key="module.id" :value="module.id">
                        {{ module.name }}
                    </option>
                </select>
                <select v-model="selectedQuiz"
                    class="px-3 py-2 bg-white dark:bg-abyss-900 border border-sun-200 dark:border-abyss-700 rounded-lg text-sm font-medium dark:text-white outline-none focus:ring-2 focus:ring-calm-lavender-500">
                    <option value="all">All Quizzes</option>
                    <option v-for="quiz in quizzes" :key="quiz.id" :value="quiz.id">
                        {{ quiz.name }}
                    </option>
                </select>
                <div class="relative flex-1 min-w-[200px]">
                    <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-platinum-400" />
                    <input v-model="searchQuery" type="text" placeholder="Search students..."
                        class="w-full pl-10 pr-4 py-2 bg-white dark:bg-abyss-900 border border-sun-200 dark:border-abyss-700 rounded-lg text-sm dark:text-white outline-none focus:ring-2 focus:ring-calm-lavender-500" />
                </div>
            </div>
        </div>

        <!-- Content -->
        <div class="flex-1 overflow-y-auto p-6">
            <!-- Grade Overview Cards -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div class="bg-white dark:bg-abyss-800 p-4 rounded-xl border border-sun-200 dark:border-abyss-700">
                    <p class="text-xs font-bold text-platinum-500 uppercase tracking-widest mb-2">Class Average</p>
                    <p class="text-3xl font-bold text-abyss-900 dark:text-platinum-50 mb-1">84.2%</p>
                    <div class="flex items-center gap-1 text-sm font-medium text-emerald-600">
                        <TrendingUp class="w-4 h-4" />
                        <span>+3.5%</span>
                    </div>
                </div>
                <div class="bg-white dark:bg-abyss-800 p-4 rounded-xl border border-sun-200 dark:border-abyss-700">
                    <p class="text-xs font-bold text-platinum-500 uppercase tracking-widest mb-2">Passing Rate</p>
                    <p class="text-3xl font-bold text-abyss-900 dark:text-platinum-50 mb-1">93%</p>
                    <p class="text-sm text-platinum-500">42/45 students</p>
                </div>
                <div class="bg-white dark:bg-abyss-800 p-4 rounded-xl border border-sun-200 dark:border-abyss-700">
                    <p class="text-xs font-bold text-platinum-500 uppercase tracking-widest mb-2">Highest Score</p>
                    <p class="text-3xl font-bold text-emerald-600 mb-1">98%</p>
                    <p class="text-sm text-platinum-500">Sarah Johnson</p>
                </div>
                <div class="bg-white dark:bg-abyss-800 p-4 rounded-xl border border-sun-200 dark:border-abyss-700">
                    <p class="text-xs font-bold text-platinum-500 uppercase tracking-widest mb-2">Avg Quiz Score</p>
                    <p class="text-3xl font-bold text-azure-blue-600 mb-1">82%</p>
                    <p class="text-sm text-platinum-500">Last 5 quizzes</p>
                </div>
            </div>

            <!-- Grades Table -->
            <div
                class="bg-white dark:bg-abyss-800 rounded-xl border border-sun-200 dark:border-abyss-700 overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead
                            class="bg-platinum-50 dark:bg-abyss-900/50 border-b border-sun-100 dark:border-abyss-700">
                            <tr>
                                <th
                                    class="px-6 py-4 text-left text-xs font-bold text-platinum-500 uppercase tracking-widest sticky left-0 bg-platinum-50 dark:bg-abyss-900/50">
                                    Student
                                </th>
                                <th
                                    class="px-6 py-4 text-center text-xs font-bold text-platinum-500 uppercase tracking-widest">
                                    Overall
                                </th>
                                <th v-for="module in visibleModules" :key="module.id"
                                    class="px-4 py-4 text-center text-xs font-bold text-platinum-500 uppercase tracking-widest whitespace-nowrap">
                                    {{ module.short }}
                                </th>
                                <th
                                    class="px-6 py-4 text-center text-xs font-bold text-platinum-500 uppercase tracking-widest">
                                    Letter Grade
                                </th>
                                <th
                                    class="px-6 py-4 text-center text-xs font-bold text-platinum-500 uppercase tracking-widest">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-sun-100 dark:divide-abyss-700">
                            <tr v-for="student in filteredGrades" :key="student.id"
                                class="hover:bg-platinum-50 dark:hover:bg-abyss-900/30 transition">
                                <td class="px-6 py-4 sticky left-0 bg-white dark:bg-abyss-800">
                                    <div class="flex items-center gap-3">
                                        <div
                                            class="w-8 h-8 rounded-full bg-gradient-to-br from-calm-lavender-400 to-calm-lavender-600 flex items-center justify-center text-white font-bold text-xs">
                                            {{student.name.split(' ').map(n => n[0]).join('')}}
                                        </div>
                                        <div>
                                            <p class="font-medium text-abyss-900 dark:text-platinum-50">{{ student.name
                                                }}</p>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-center">
                                    <div class="inline-flex items-center justify-center min-w-[60px] px-3 py-1.5 rounded-lg font-bold"
                                        :class="getScoreColor(student.overall)">
                                        {{ student.overall }}%
                                    </div>
                                </td>
                                <td v-for="module in visibleModules" :key="module.id" class="px-4 py-4 text-center">
                                    <button @click="editGrade(student, module)"
                                        class="inline-flex items-center justify-center min-w-[50px] px-2 py-1 rounded font-medium text-sm hover:bg-platinum-100 dark:hover:bg-abyss-700 transition"
                                        :class="student.modules[module.id] ? 'text-abyss-900 dark:text-platinum-50' : 'text-platinum-400'">
                                        {{ student.modules[module.id] || '--' }}
                                    </button>
                                </td>
                                <td class="px-6 py-4 text-center">
                                    <span class="inline-flex items-center px-3 py-1 rounded-lg font-bold text-sm"
                                        :class="getLetterGradeColor(student.letterGrade)">
                                        {{ student.letterGrade }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 text-center">
                                    <div class="flex items-center justify-center gap-2">
                                        <button @click="viewStudentGrades(student)"
                                            class="p-2 hover:bg-platinum-100 dark:hover:bg-abyss-700 rounded-lg transition"
                                            title="View Details">
                                            <Eye class="w-4 h-4 text-platinum-600 dark:text-platinum-400" />
                                        </button>
                                        <button @click="sendGradeReport(student)"
                                            class="p-2 hover:bg-platinum-100 dark:hover:bg-abyss-700 rounded-lg transition"
                                            title="Send Report">
                                            <Mail class="w-4 h-4 text-platinum-600 dark:text-platinum-400" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Grade Distribution -->
            <div class="mt-6 bg-white dark:bg-abyss-800 p-6 rounded-xl border border-sun-200 dark:border-abyss-700">
                <h3 class="text-lg font-bold text-abyss-900 dark:text-platinum-50 mb-6">Grade Distribution</h3>
                <div class="grid grid-cols-5 gap-4">
                    <div v-for="grade in gradeDistribution" :key="grade.letter"
                        class="text-center p-4 bg-platinum-50 dark:bg-abyss-900/50 rounded-lg border border-sun-100 dark:border-abyss-700">
                        <p class="text-3xl font-bold mb-2"
                            :class="getLetterGradeColor(grade.letter).replace('bg-', 'text-').replace('/20', '').replace('/30', '')">
                            {{ grade.letter }}
                        </p>
                        <p class="text-2xl font-bold text-abyss-900 dark:text-platinum-50 mb-1">{{ grade.count }}</p>
                        <p class="text-xs text-platinum-500">{{ Math.round(grade.count / 45 * 100) }}%</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Edit Grade Modal -->
        <Transition name="modal-fade">
            <div v-if="editingGrade"
                class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-abyss-900/60 backdrop-blur-sm">
                <div @click.stop
                    class="bg-white dark:bg-abyss-800 rounded-2xl w-full max-w-md overflow-hidden border border-sun-200 dark:border-abyss-700 shadow-2xl">
                    <div class="p-6 border-b border-sun-100 dark:border-abyss-700 flex justify-between items-center">
                        <div>
                            <h2 class="text-xl font-bold text-abyss-900 dark:text-platinum-50">Edit Grade</h2>
                            <p class="text-sm text-platinum-500 mt-1">{{ editingGrade.student.name }} - {{
                                editingGrade.module.name }}</p>
                        </div>
                        <button @click="editingGrade = null"
                            class="p-2 hover:bg-platinum-50 dark:hover:bg-abyss-700 rounded-lg transition">
                            <X class="w-5 h-5 text-platinum-500" />
                        </button>
                    </div>
                    <form @submit.prevent="saveGrade" class="p-6 space-y-4">
                        <div>
                            <label
                                class="text-xs font-bold text-platinum-500 uppercase tracking-widest mb-2 block">Score
                                (%)</label>
                            <input v-model="editingGrade.score" type="number" min="0" max="100" step="0.01"
                                class="w-full px-4 py-3 bg-platinum-50 dark:bg-abyss-900 border border-sun-200 dark:border-abyss-700 rounded-lg text-lg font-bold text-center dark:text-white outline-none focus:ring-2 focus:ring-calm-lavender-500" />
                        </div>
                        <div>
                            <label
                                class="text-xs font-bold text-platinum-500 uppercase tracking-widest mb-2 block">Feedback
                                (Optional)</label>
                            <textarea v-model="editingGrade.feedback" rows="3"
                                placeholder="Add feedback for the student..."
                                class="w-full px-3 py-2 bg-platinum-50 dark:bg-abyss-900 border border-sun-200 dark:border-abyss-700 rounded-lg text-sm dark:text-white outline-none focus:ring-2 focus:ring-calm-lavender-500 resize-none"></textarea>
                        </div>
                        <div class="flex gap-3">
                            <button type="button" @click="editingGrade = null"
                                class="flex-1 px-4 py-2 text-sm font-medium text-platinum-600 dark:text-platinum-400 hover:bg-platinum-50 dark:hover:bg-abyss-700 rounded-lg transition">
                                Cancel
                            </button>
                            <button type="submit"
                                class="flex-1 px-4 py-2 bg-calm-lavender-600 hover:bg-calm-lavender-700 text-white text-sm font-medium rounded-lg transition">
                                Save Grade
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
import { Settings, Download, Search, TrendingUp, Eye, Mail, X } from 'lucide-vue-next'

const selectedModule = ref('all')
const selectedQuiz = ref('all')
const searchQuery = ref('')
const editingGrade = ref(null)
const showGradingSettings = ref(false)

const modules = [
    { id: 1, name: 'Module 1: Introduction to GAD', short: 'M1' },
    { id: 2, name: 'Module 2: Gender Equality', short: 'M2' },
    { id: 3, name: 'Module 3: Understanding VAWC', short: 'M3' },
    { id: 4, name: 'Module 4: Safe Spaces', short: 'M4' },
    { id: 5, name: 'Module 5: Response Protocols', short: 'M5' }
]

const quizzes = [
    { id: 1, name: 'Quiz 1: GAD Basics' },
    { id: 2, name: 'Quiz 2: Equality Principles' },
    { id: 3, name: 'Quiz 3: VAWC Recognition' }
]

const visibleModules = computed(() => modules.slice(0, 5))

const grades = ref([
    { id: 1, name: 'Sarah Johnson', overall: 98, letterGrade: 'A+', modules: { 1: 98, 2: 96, 3: 99, 4: 97, 5: 98 } },
    { id: 2, name: 'Michael Chen', overall: 92, letterGrade: 'A', modules: { 1: 90, 2: 94, 3: 91, 4: 93, 5: 92 } },
    { id: 3, name: 'Emma Davis', overall: 87, letterGrade: 'B+', modules: { 1: 88, 2: 85, 3: 89, 4: 86, 5: 87 } },
    { id: 4, name: 'James Wilson', overall: 78, letterGrade: 'C+', modules: { 1: 75, 2: 80, 3: 77, 4: 79, 5: 79 } },
    { id: 5, name: 'Alice Cooper', overall: 94, letterGrade: 'A', modules: { 1: 95, 2: 93, 3: 94, 4: 96, 5: 92 } }
])

const gradeDistribution = [
    { letter: 'A', count: 18 },
    { letter: 'B', count: 15 },
    { letter: 'C', count: 9 },
    { letter: 'D', count: 2 },
    { letter: 'F', count: 1 }
]

const filteredGrades = computed(() => {
    let result = grades.value

    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        result = result.filter(g => g.name.toLowerCase().includes(query))
    }

    return result
})

const getScoreColor = (score) => {
    if (score >= 90) return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
    if (score >= 75) return 'bg-azure-blue-100 dark:bg-azure-blue-900/30 text-azure-blue-700 dark:text-azure-blue-400'
    if (score >= 60) return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
    return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
}

const getLetterGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
    if (grade.startsWith('B')) return 'bg-azure-blue-100 dark:bg-azure-blue-900/30 text-azure-blue-700 dark:text-azure-blue-400'
    if (grade.startsWith('C')) return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
    if (grade.startsWith('D')) return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
    return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
}

const editGrade = (student, module) => {
    editingGrade.value = {
        student,
        module,
        score: student.modules[module.id] || 0,
        feedback: ''
    }
}

const saveGrade = () => {
    console.log('Saving grade:', editingGrade.value)
    editingGrade.value = null
}

const viewStudentGrades = (student) => {
    console.log('Viewing grades for:', student.name)
}

const sendGradeReport = (student) => {
    console.log('Sending grade report to:', student.name)
}

const exportGrades = () => {
    console.log('Exporting grades...')
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