<!-- src/components/modules/DeleteConfirmModal.vue -->
<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div 
            class="absolute inset-0 bg-black/50 backdrop-blur-sm"
            @click="$emit('cancel')"
        ></div>

        <!-- Modal -->
        <div class="relative bg-white dark:bg-abyss-800 rounded-lg shadow-2xl max-w-md w-full p-6 animate-scale-in">
            <!-- Icon -->
            <div class="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/20 rounded-full">
                <svg class="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
            </div>

            <!-- Content -->
            <h3 class="text-xl font-bold text-gray-900 dark:text-white text-center mb-2">
                Delete Module?
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-center mb-6">
                Are you sure you want to delete <strong class="text-gray-900 dark:text-white">"{{ moduleTitle }}"</strong>? 
                This action cannot be undone and all associated data will be permanently removed.
            </p>

            <!-- Actions -->
            <div class="flex gap-3">
                <button 
                    @click="$emit('cancel')"
                    class="flex-1 px-4 py-2 border border-gray-300 dark:border-abyss-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-abyss-700 transition-colors"
                >
                    Cancel
                </button>
                <button 
                    @click="$emit('confirm')"
                    class="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-semibold"
                >
                    Delete Module
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    moduleTitle: {
        type: String,
        required: true
    }
});

defineEmits(['confirm', 'cancel']);
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
