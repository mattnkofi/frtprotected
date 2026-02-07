<!-- src/components/modules/ModuleCard.vue -->
<template>
    <div class="module-card bg-white dark:bg-abyss-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
        @click="$emit('view', module.id)">
        <!-- Thumbnail -->
        <div class="relative h-48 bg-gray-200 dark:bg-abyss-700 overflow-hidden">
            <img v-if="module.thumbnail_url" :src="module.thumbnail_url" :alt="module.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <div v-else class="w-full h-full flex items-center justify-center">
                <span class="text-6xl opacity-20">📚</span>
            </div>

            <!-- Badges -->
            <div class="absolute top-2 right-2 flex flex-col gap-1">
                <span v-if="module.is_featured"
                    class="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-bold shadow-lg">
                    <Star class="h-4 w-4 text-sun-500" /> 
                    Featured
                </span>
            </div>

            <!-- Category badge -->
            <div class="absolute bottom-2 left-2">
                <span
                    class="bg-blue-600 dark:bg-blue-700 text-white px-3 py-1 rounded-full text-xs uppercase font-semibold shadow-lg">
                    {{ formatCategory(module.category) }}
                </span>
            </div>

            <!-- Type badge -->
            <!-- <div class="absolute bottom-2 right-2">
                <span class="bg-purple-600 dark:bg-purple-700 text-white px-3 py-1 rounded-full text-xs capitalize shadow-lg">
                    {{ module.type }}
                </span>
            </div> -->
        </div>

        <!-- Content -->
        <div class="p-4">
            <h3
                class="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {{ module.title }}
            </h3>

            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                {{ module.description || 'No description available' }}
            </p>

            <!-- Meta info -->
            <div
                class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3 pb-3 border-b dark:border-abyss-700">
                <!-- <div class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>{{ module.duration_minutes || 0 }} min</span>
                </div>
                <div class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                    </svg>
                    <span>{{ module.points || 0 }} pts</span>
                </div> -->
                <span class="capitalize px-2 py-1 rounded bg-gray-100 dark:bg-abyss-700">
                    {{ module.difficulty_level }}
                </span>
            </div>

            <!-- Stats -->
            <div class="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 mb-4">
                <div class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>{{ module.view_count || 0 }} views</span>
                </div>
                <!-- <div class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>{{ module.completion_count || 0 }} completed</span>
                </div> -->
            </div>

            <!-- Action button -->
            <button
                class="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                @click.stop="$emit('view', module.id)">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Start Learning</span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { Lightbulb, Star } from 'lucide-vue-next';

defineProps({
    module: {
        type: Object,
        required: true
    }
});

defineEmits(['view']);

const formatCategory = (category) => {
    const map = {
        'gad': 'GAD',
        'sexual_health': 'Sexual Health',
        'vawc': 'VAWC',
        'general': 'General'
    };
    return map[category] || category;
};
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
