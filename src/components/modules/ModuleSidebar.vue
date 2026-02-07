<!-- src/components/modules/ModuleSidebar.vue -->
<template>
    <div class="module-sidebar h-full flex flex-col">
        <!-- Header -->
        <div class="flex items-center justify-between p-4 border-b dark:border-abyss-700">
            <h2 class="text-lg font-bold text-gray-900 dark:text-white">Module Information</h2>
            <button 
                @click="$emit('close')"
                class="p-2 hover:bg-gray-100 dark:hover:bg-abyss-700 rounded-lg transition-colors lg:hidden"
            >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
        </div>

        <!-- Content -->
        <div class="flex-1 overflow-y-auto p-4 space-y-6">
            <!-- Quick stats -->
            <!-- <div class="grid grid-cols-2 gap-3">
                <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                    <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ module.points || 0 }}</div>
                    <div class="text-xs text-gray-600 dark:text-gray-400">Points</div>
                </div>
                <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                    <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ module.duration_minutes || 0 }}m</div>
                    <div class="text-xs text-gray-600 dark:text-gray-400">Duration</div>
                </div>
            </div> -->

            <!-- Details -->
            <div class="space-y-4">
                <div>
                    <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Category</h3>
                    <span class="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                        {{ formatCategory(module.category) }}
                    </span>
                </div>

                <!-- <div>
                    <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Type</h3>
                    <span class="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm capitalize">
                        {{ module.type }}
                    </span>
                </div> -->

                <div>
                    <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Difficulty</h3>
                    <div class="flex items-center gap-2">
                        <div class="flex gap-1">
                            <div 
                                v-for="i in 3" 
                                :key="i"
                                class="w-8 h-2 rounded-full"
                                :class="getDifficultyColor(i)"
                            ></div>
                        </div>
                        <span class="text-sm text-gray-600 dark:text-gray-400 capitalize">
                            {{ module.difficulty_level }}
                        </span>
                    </div>
                </div>

                <div v-if="module.age_group">
                    <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Age Group</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">{{ module.age_group }}</p>
                </div>
            </div>

            <!-- Tags -->
            <div v-if="module.tags && module.tags.length > 0">
                <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Tags</h3>
                <div class="flex flex-wrap gap-2">
                    <span 
                        v-for="tag in module.tags" 
                        :key="tag"
                        class="px-2 py-1 bg-gray-100 dark:bg-abyss-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                    >
                        #{{ tag }}
                    </span>
                </div>
            </div>

            <!-- Learning objectives -->
            <div v-if="module.metadata?.learning_objectives && module.metadata.learning_objectives.length > 0">
                <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Learning Objectives</h3>
                <ul class="space-y-2">
                    <li 
                        v-for="(objective, index) in module.metadata.learning_objectives" 
                        :key="index"
                        class="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                    >
                        <svg class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span>{{ objective }}</span>
                    </li>
                </ul>
            </div>

            <!-- Prerequisites -->
            <div v-if="module.required_modules && module.required_modules.length > 0">
                <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Prerequisites</h3>
                <div class="space-y-2">
                    <div 
                        v-for="reqId in module.required_modules" 
                        :key="reqId"
                        class="flex items-center gap-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded border border-yellow-200 dark:border-yellow-800"
                    >
                        <svg class="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                        </svg>
                        <span class="text-sm text-gray-700 dark:text-gray-300">Module #{{ reqId }} required</span>
                    </div>
                </div>
            </div>

            <!-- Stats -->
            <div>
                <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Statistics</h3>
                <div class="space-y-3">
                    <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-abyss-900 rounded-lg">
                        <div class="flex items-center gap-2">
                            <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                            </svg>
                            <span class="text-sm text-gray-600 dark:text-gray-400">Views</span>
                        </div>
                        <span class="font-semibold text-gray-900 dark:text-white">{{ module.view_count || 0 }}</span>
                    </div>

                    <!-- <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-abyss-900 rounded-lg">
                        <div class="flex items-center gap-2">
                            <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            <span class="text-sm text-gray-600 dark:text-gray-400">Completions</span>
                        </div>
                        <span class="font-semibold text-gray-900 dark:text-white">{{ module.completion_count || 0 }}</span>
                    </div>

                    <div v-if="completionRate !== null" class="p-3 bg-gray-50 dark:bg-abyss-900 rounded-lg">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-sm text-gray-600 dark:text-gray-400">Completion Rate</span>
                            <span class="font-semibold text-gray-900 dark:text-white">{{ completionRate }}%</span>
                        </div>
                        <div class="w-full bg-gray-200 dark:bg-abyss-700 rounded-full h-2">
                            <div 
                                class="bg-green-500 h-2 rounded-full transition-all duration-500"
                                :style="{ width: completionRate + '%' }"
                            ></div>
                        </div>
                    </div> -->
                </div>
            </div>

            <!-- Creator info -->
            <div v-if="module.creator">
                <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Created By</h3>
                <div class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-abyss-900 rounded-lg">
                    <div class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {{ getInitials(module.creator.name) }}
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-900 dark:text-white">{{ module.creator.name }}</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">{{ module.creator.email }}</p>
                    </div>
                </div>
            </div>

            <!-- Dates -->
            <div class="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                <p v-if="module.published_at">
                    Published: {{ formatDate(module.published_at) }}
                </p>
                <p>Created: {{ formatDate(module.created_at) }}</p>
                <p v-if="module.updated_at !== module.created_at">
                    Updated: {{ formatDate(module.updated_at) }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    module: {
        type: Object,
        required: true
    }
});

defineEmits(['close']);

// const completionRate = computed(() => {
//     if (!props.module.view_count || props.module.view_count === 0) return null;
//     return Math.round((props.module.completion_count / props.module.view_count) * 100);
// });

const formatCategory = (category) => {
    const map = {
        'gad': 'GAD',
        'sexual_health': 'Sexual Health',
        'vawc': 'VAWC',
        'general': 'General'
    };
    return map[category] || category;
};

const getDifficultyColor = (level) => {
    const difficulty = props.module.difficulty_level;
    const colors = {
        'beginner': ['bg-green-500', 'bg-gray-300 dark:bg-gray-600', 'bg-gray-300 dark:bg-gray-600'],
        'intermediate': ['bg-yellow-500', 'bg-yellow-500', 'bg-gray-300 dark:bg-gray-600'],
        'advanced': ['bg-red-500', 'bg-red-500', 'bg-red-500']
    };
    return colors[difficulty]?.[level - 1] || 'bg-gray-300 dark:bg-gray-600';
};

const getInitials = (name) => {
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
};

const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
};
</script>
