<template>
    <div class="max-w-5xl mx-auto py-8 px-4 space-y-6">
        <div class="mb-8">
            <router-link :to="{ name: 'facilitator.classrooms' }"
                class="text-calm-lavender-600 hover:text-calm-lavender-700 text-sm font-medium mb-2 inline-flex items-center gap-2 transition">
                <ArrowLeft class="w-4 h-4" />
                Back to My Classrooms
            </router-link>
            <h1 class="text-3xl font-bold text-abyss-900 dark:text-platinum-50 mt-4">Create New Classroom</h1>
            <p class="text-platinum-600 dark:text-platinum-300">Set up a learning environment for your students.</p>
        </div>

        <form @submit.prevent="handleCreateClassroom" class="space-y-6">
            <!-- Basic Information -->
            <section
                class="bg-white dark:bg-abyss-800 p-6 rounded-2xl border border-sun-200 dark:border-abyss-700 space-y-6">
                <h2
                    class="text-lg font-bold text-abyss-900 dark:text-platinum-50 border-b border-sun-100 dark:border-abyss-700 pb-3">
                    Basic Information
                </h2>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-2">
                        <label class="text-xs font-bold text-platinum-500 uppercase tracking-widest">Classroom Name
                            *</label>
                        <input v-model="form.name" type="text" placeholder="e.g. Gender & Development 101" required
                            class="w-full px-4 py-3 bg-platinum-50 dark:bg-abyss-900 border border-sun-200 dark:border-abyss-700 rounded-xl focus:ring-2 focus:ring-calm-lavender-500 outline-none transition dark:text-white" />
                    </div>

                    <div class="space-y-2">
                        <label class="text-xs font-bold text-platinum-500 uppercase tracking-widest">Visibility</label>
                        <select v-model="form.visibility"
                            class="w-full px-4 py-3 bg-platinum-50 dark:bg-abyss-900 border border-sun-200 dark:border-abyss-700 rounded-xl focus:ring-2 focus:ring-calm-lavender-500 outline-none transition dark:text-white">
                            <option value="public">Public - Anyone can join</option>
                            <option value="private">Private - Join by invitation only</option>
                        </select>
                    </div>
                </div>

                <div class="space-y-2">
                    <label class="text-xs font-bold text-platinum-500 uppercase tracking-widest">Description /
                        Introduction</label>
                    <textarea v-model="form.description" rows="4"
                        placeholder="Welcome your students and explain the course goals..."
                        class="w-full px-4 py-3 bg-platinum-50 dark:bg-abyss-900 border border-sun-200 dark:border-abyss-700 rounded-xl focus:ring-2 focus:ring-calm-lavender-500 outline-none transition dark:text-white resize-none"></textarea>
                </div>
            </section>

            <!-- Classroom Appearance -->
            <section
                class="bg-white dark:bg-abyss-800 p-6 rounded-2xl border border-sun-200 dark:border-abyss-700 space-y-6">
                <h2
                    class="text-lg font-bold text-abyss-900 dark:text-platinum-50 border-b border-sun-100 dark:border-abyss-700 pb-3">
                    Classroom Appearance
                </h2>

                <div class="space-y-2">
                    <label class="text-xs font-bold text-platinum-500 uppercase tracking-widest">Theme Color</label>
                    <div class="grid grid-cols-4 md:grid-cols-8 gap-3">
                        <button v-for="color in themeColors" :key="color.value" type="button"
                            @click="form.themeColor = color.value" :class="[
                                'h-16 rounded-xl border-2 transition-all relative overflow-hidden',
                                form.themeColor === color.value
                                    ? 'border-abyss-900 dark:border-platinum-50 scale-110 shadow-lg'
                                    : 'border-transparent hover:scale-105'
                            ]">
                            <div :class="color.class" class="w-full h-full"></div>
                            <Check v-if="form.themeColor === color.value"
                                class="w-5 h-5 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-lg" />
                        </button>
                    </div>
                    <p class="text-xs text-platinum-500 mt-2">Selected: {{themeColors.find(c => c.value ===
                        form.themeColor)?.name }}</p>
                </div>

                <div class="space-y-2">
                    <label class="text-xs font-bold text-platinum-500 uppercase tracking-widest">Cover Image
                        (Optional)</label>
                    <div class="relative">
                        <div v-if="!form.coverImage" @click="triggerFileInput"
                            class="w-full h-48 bg-platinum-50 dark:bg-abyss-900 border-2 border-dashed border-sun-200 dark:border-abyss-700 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-calm-lavender-500 transition group">
                            <ImagePlus
                                class="w-12 h-12 text-platinum-400 group-hover:text-calm-lavender-500 transition" />
                            <p class="text-sm text-platinum-500 mt-2">Click to upload cover image</p>
                            <p class="text-xs text-platinum-400">Recommended: 1200x400px</p>
                        </div>
                        <div v-else class="relative w-full h-48 rounded-xl overflow-hidden group">
                            <img :src="form.coverImagePreview" alt="Cover preview" class="w-full h-full object-cover" />
                            <div
                                class="absolute inset-0 bg-abyss-900/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                                <button type="button" @click="triggerFileInput"
                                    class="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-medium backdrop-blur-sm transition">
                                    <Edit2 class="w-4 h-4 inline mr-1" /> Change
                                </button>
                                <button type="button" @click="removeCoverImage"
                                    class="px-4 py-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg text-sm font-medium backdrop-blur-sm transition">
                                    <Trash2 class="w-4 h-4 inline mr-1" /> Remove
                                </button>
                            </div>
                        </div>
                        <input ref="fileInput" type="file" accept="image/*" @change="handleFileUpload" class="hidden" />
                    </div>
                </div>

                <!-- Preview Card -->
                <div class="space-y-2">
                    <label class="text-xs font-bold text-platinum-500 uppercase tracking-widest">Preview</label>
                    <div
                        class="bg-platinum-50 dark:bg-abyss-900 rounded-xl border border-sun-100 dark:border-abyss-700 overflow-hidden">
                        <div :class="form.themeColor" class="h-32 w-full relative flex items-center justify-center">
                            <img v-if="form.coverImagePreview" :src="form.coverImagePreview" alt="Cover"
                                class="w-full h-full object-cover" />
                            <div v-else class="text-white/60 text-sm font-medium">Cover Image Area</div>
                        </div>
                        <div class="p-4">
                            <h3 class="text-lg font-bold text-abyss-900 dark:text-platinum-50 truncate">
                                {{ form.name || 'Classroom Name' }}
                            </h3>
                            <p class="text-sm text-platinum-500 line-clamp-2 mt-1">
                                {{ form.description || 'Classroom description will appear here...' }}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Initial Channels -->
            <section
                class="bg-white dark:bg-abyss-800 p-6 rounded-2xl border border-sun-200 dark:border-abyss-700 space-y-4">
                <div class="flex justify-between items-center border-b border-sun-100 dark:border-abyss-700 pb-3">
                    <h2 class="text-lg font-bold text-abyss-900 dark:text-platinum-50">Initial Channels</h2>
                    <button type="button" @click="addChannel"
                        class="flex items-center gap-2 px-4 py-2 text-xs font-bold text-calm-lavender-600 hover:bg-calm-lavender-50 dark:hover:bg-calm-lavender-900/20 rounded-lg transition">
                        <Plus class="w-4 h-4" /> Add Channel
                    </button>
                </div>

                <div class="space-y-3">
                    <div v-for="(channel, index) in form.channels" :key="index"
                        class="flex gap-3 items-start p-4 bg-platinum-50 dark:bg-abyss-900/50 rounded-xl border border-sun-100 dark:border-abyss-700">
                        <Hash class="w-5 h-5 mt-2.5 text-platinum-400" />
                        <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input v-model="channel.name" placeholder="Channel name (e.g. announcements)"
                                class="bg-transparent border-b border-sun-200 dark:border-abyss-700 py-2 outline-none focus:border-calm-lavender-500 text-sm dark:text-white transition" />
                            <input v-model="channel.description" placeholder="Channel description"
                                class="bg-transparent border-b border-sun-200 dark:border-abyss-700 py-2 outline-none focus:border-calm-lavender-500 text-sm dark:text-white transition" />
                        </div>
                        <button v-if="form.channels.length > 1" type="button" @click="removeChannel(index)"
                            class="mt-2 p-1 text-platinum-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition">
                            <X class="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>

            <!-- Actions -->
            <div class="flex items-center justify-end gap-4">
                <router-link :to="{ name: 'facilitator.classrooms' }"
                    class="px-6 py-3 text-sm font-bold text-platinum-500 hover:text-platinum-700 dark:hover:text-platinum-300 transition">
                    Cancel
                </router-link>
                <button type="submit" :disabled="isSubmitting"
                    class="flex items-center gap-2 px-10 py-3 bg-gradient-to-r from-calm-lavender-600 to-calm-lavender-700 hover:from-calm-lavender-700 hover:to-calm-lavender-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition shadow-lg">
                    <Sparkles v-if="!isSubmitting" class="w-5 h-5" />
                    {{ isSubmitting ? 'Creating Classroom...' : 'Create Classroom' }}
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, ImagePlus, Edit2, Trash2, Check, Hash, Plus, X, Sparkles } from 'lucide-vue-next'

const router = useRouter()
const isSubmitting = ref(false)
const fileInput = ref(null)

const themeColors = [
    { name: 'Calm Lavender', value: 'lavender', class: 'bg-calm-lavender-600' },
    { name: 'Azure Blue', value: 'azure', class: 'bg-azure-blue-500' },
    { name: 'Neon Pink', value: 'pink', class: 'bg-neon-pink-500' },
    { name: 'Emerald', value: 'emerald', class: 'bg-emerald-500' },
    { name: 'Amber', value: 'amber', class: 'bg-amber-500' },
    { name: 'Rose', value: 'rose', class: 'bg-rose-500' },
    { name: 'Violet', value: 'violet', class: 'bg-violet-600' },
    { name: 'Teal', value: 'teal', class: 'bg-teal-500' }
]

const form = ref({
    name: '',
    visibility: 'public',
    themeColor: 'lavender',
    description: '',
    coverImage: null,
    coverImagePreview: null,
    channels: [
        { name: 'general', description: 'General announcements and discussions' }
    ]
})

const addChannel = () => {
    form.value.channels.push({ name: '', description: '' })
}

const removeChannel = (index) => {
    form.value.channels.splice(index, 1)
}

const triggerFileInput = () => {
    fileInput.value?.click()
}

const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
        form.value.coverImage = file
        const reader = new FileReader()
        reader.onload = (e) => {
            form.value.coverImagePreview = e.target.result
        }
        reader.readAsDataURL(file)
    }
}

const removeCoverImage = () => {
    form.value.coverImage = null
    form.value.coverImagePreview = null
    if (fileInput.value) {
        fileInput.value.value = ''
    }
}

const handleCreateClassroom = async () => {
    if (!form.value.name) return

    isSubmitting.value = true
    try {
        // Mock API call - replace with actual endpoint
        // const formData = new FormData()
        // formData.append('name', form.value.name)
        // formData.append('visibility', form.value.visibility)
        // formData.append('themeColor', form.value.themeColor)
        // formData.append('description', form.value.description)
        // if (form.value.coverImage) formData.append('coverImage', form.value.coverImage)
        // formData.append('channels', JSON.stringify(form.value.channels))

        // const response = await api.post('/api/v1/facilitator/classrooms', formData)

        await new Promise(resolve => setTimeout(resolve, 1500))
        console.log('Creating classroom:', form.value)

        // toast.success('Classroom created successfully!')
        router.push({ name: 'facilitator.classrooms' })
    } catch (error) {
        console.error('Failed to create classroom:', error)
        // toast.error(error.response?.data?.message || 'Failed to create classroom.')
    } finally {
        isSubmitting.value = false
    }
}
</script>