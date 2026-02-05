<!-- src/components/modules/EditModuleModal.vue -->
<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <!-- Backdrop -->
        <div 
            class="fixed inset-0 bg-black/50 backdrop-blur-sm"
            @click="$emit('cancel')"
        ></div>

        <!-- Modal -->
        <div class="relative bg-white dark:bg-abyss-800 rounded-lg shadow-2xl max-w-4xl w-full my-8 animate-scale-in">
            <!-- Header -->
            <div class="flex items-center justify-between p-6 border-b dark:border-abyss-700">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Edit Module</h2>
                <button 
                    @click="$emit('cancel')"
                    class="p-2 hover:bg-gray-100 dark:hover:bg-abyss-700 rounded-lg transition-colors"
                >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>

            <!-- Form -->
            <form @submit.prevent="handleSubmit" class="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                <!-- Basic Info -->
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Title <span class="text-red-500">*</span>
                        </label>
                        <input
                            v-model="form.title"
                            type="text"
                            required
                            class="w-full border dark:border-abyss-600 rounded-lg px-4 py-2 bg-white dark:bg-abyss-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Module title"
                        />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Description
                        </label>
                        <textarea
                            v-model="form.description"
                            rows="4"
                            class="w-full border dark:border-abyss-600 rounded-lg px-4 py-2 bg-white dark:bg-abyss-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Module description"
                        ></textarea>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Content (HTML/Markdown)
                        </label>
                        <textarea
                            v-model="form.content"
                            rows="6"
                            class="w-full border dark:border-abyss-600 rounded-lg px-4 py-2 bg-white dark:bg-abyss-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                            placeholder="<h1>Module content...</h1>"
                        ></textarea>
                    </div>
                </div>

                <!-- Classification -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Category <span class="text-red-500">*</span>
                        </label>
                        <select 
                            v-model="form.category" 
                            required
                            class="w-full border dark:border-abyss-600 rounded-lg px-4 py-2 bg-white dark:bg-abyss-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="gad">GAD</option>
                            <option value="sexual_health">Sexual Health</option>
                            <option value="vawc">VAWC</option>
                            <option value="general">General</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Type <span class="text-red-500">*</span>
                        </label>
                        <select 
                            v-model="form.type" 
                            required
                            class="w-full border dark:border-abyss-600 rounded-lg px-4 py-2 bg-white dark:bg-abyss-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="lesson">Lesson</option>
                            <option value="quiz">Quiz</option>
                            <option value="activity">Activity</option>
                            <option value="resource">Resource</option>
                            <option value="assessment">Assessment</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Difficulty
                        </label>
                        <select 
                            v-model="form.difficulty_level"
                            class="w-full border dark:border-abyss-600 rounded-lg px-4 py-2 bg-white dark:bg-abyss-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                    </div>
                </div>

                <!-- File Uploads -->
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Module File (PDF/Word)
                        </label>
                        <div class="flex items-center gap-3">
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                @change="handleFileSelect"
                                ref="fileInput"
                                class="flex-1 text-sm text-gray-600 dark:text-gray-400"
                            />
                            <button 
                                v-if="newFile"
                                @click="clearFile"
                                type="button"
                                class="px-3 py-1 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                            >
                                Clear
                            </button>
                        </div>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Max 25MB - PDF, DOC, DOCX only
                            <span v-if="module.file_name" class="block mt-1">
                                Current: {{ module.file_name }}
                            </span>
                        </p>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Thumbnail Image
                        </label>
                        <div class="flex items-center gap-3">
                            <input
                                type="file"
                                accept="image/*"
                                @change="handleThumbnailSelect"
                                ref="thumbnailInput"
                                class="flex-1 text-sm text-gray-600 dark:text-gray-400"
                            />
                            <button 
                                v-if="newThumbnail"
                                @click="clearThumbnail"
                                type="button"
                                class="px-3 py-1 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                            >
                                Clear
                            </button>
                        </div>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Max 5MB - Images only</p>
                    </div>
                </div>

                <!-- Gamification -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Duration (minutes)
                        </label>
                        <input
                            v-model.number="form.duration_minutes"
                            type="number"
                            min="1"
                            class="w-full border dark:border-abyss-600 rounded-lg px-4 py-2 bg-white dark:bg-abyss-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Points
                        </label>
                        <input
                            v-model.number="form.points"
                            type="number"
                            min="0"
                            class="w-full border dark:border-abyss-600 rounded-lg px-4 py-2 bg-white dark:bg-abyss-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Order
                        </label>
                        <input
                            v-model.number="form.order"
                            type="number"
                            min="0"
                            class="w-full border dark:border-abyss-600 rounded-lg px-4 py-2 bg-white dark:bg-abyss-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                <!-- Status -->
                <div class="flex items-center gap-6 p-4 bg-gray-50 dark:bg-abyss-900 rounded-lg">
                    <label class="flex items-center cursor-pointer">
                        <input 
                            v-model="form.is_published" 
                            type="checkbox" 
                            class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Published</span>
                    </label>

                    <label class="flex items-center cursor-pointer">
                        <input 
                            v-model="form.is_featured" 
                            type="checkbox" 
                            class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Featured</span>
                    </label>
                </div>

                <!-- Error message -->
                <div v-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <p class="text-sm text-red-800 dark:text-red-200">{{ error }}</p>
                </div>
            </form>

            <!-- Footer -->
            <div class="flex items-center justify-end gap-3 p-6 border-t dark:border-abyss-700">
                <button
                    type="button"
                    @click="$emit('cancel')"
                    class="px-6 py-2 border border-gray-300 dark:border-abyss-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-abyss-700 transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    @click="handleSubmit"
                    :disabled="saving"
                    class="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors font-semibold"
                >
                    {{ saving ? 'Saving...' : 'Save Changes' }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useModuleStore } from '@/stores/module';

const props = defineProps({
    module: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['saved', 'cancel']);

const moduleStore = useModuleStore();

const form = reactive({
    title: props.module.title,
    description: props.module.description,
    content: props.module.content,
    category: props.module.category,
    type: props.module.type,
    difficulty_level: props.module.difficulty_level,
    duration_minutes: props.module.duration_minutes,
    points: props.module.points,
    order: props.module.order,
    is_published: props.module.is_published,
    is_featured: props.module.is_featured
});

const newFile = ref(null);
const newThumbnail = ref(null);
const saving = ref(false);
const error = ref(null);

const fileInput = ref(null);
const thumbnailInput = ref(null);

const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
        // Validate file type
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedTypes.includes(file.type)) {
            error.value = 'Invalid file type. Only PDF and Word documents are allowed.';
            event.target.value = '';
            return;
        }

        // Validate file size (25MB)
        if (file.size > 25 * 1024 * 1024) {
            error.value = 'File size exceeds 25MB limit.';
            event.target.value = '';
            return;
        }

        newFile.value = file;
        error.value = null;
    }
};

const handleThumbnailSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
        if (!file.type.startsWith('image/')) {
            error.value = 'Invalid file type. Only images are allowed.';
            event.target.value = '';
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            error.value = 'Thumbnail size exceeds 5MB limit.';
            event.target.value = '';
            return;
        }

        newThumbnail.value = file;
        error.value = null;
    }
};

const clearFile = () => {
    newFile.value = null;
    if (fileInput.value) fileInput.value.value = '';
};

const clearThumbnail = () => {
    newThumbnail.value = null;
    if (thumbnailInput.value) thumbnailInput.value.value = '';
};

const handleSubmit = async () => {
    saving.value = true;
    error.value = null;

    try {
        // Update metadata
        await moduleStore.updateModule(props.module.id, form);

        // Upload files separately if changed
        if (newFile.value) {
            await moduleStore.uploadModuleFile(props.module.id, newFile.value);
        }
        if (newThumbnail.value) {
            await moduleStore.uploadThumbnail(props.module.id, newThumbnail.value);
        }

        emit('saved');
    } catch (err) {
        error.value = err.response?.data?.message || 'Failed to update module';
    } finally {
        saving.value = false;
    }
};
</script>

<style scoped>
@keyframes scale-in {
    from {
        opacity: 0;
        transform: scale(0.9);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

.animate-scale-in {
    animation: scale-in 0.2s ease-out;
}
</style>
