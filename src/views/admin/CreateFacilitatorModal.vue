<template>
    <div class="fixed inset-0 z-50 overflow-y-auto" @click.self="$emit('close')">
        <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <!-- Background overlay -->
            <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" @click="$emit('close')"></div>

            <!-- Modal panel -->
            <div
                class="relative inline-block w-full max-w-lg p-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-abyss-800 shadow-2xl rounded-2xl">
                <!-- Header -->
                <div class="mb-6">
                    <div class="flex items-center justify-between">
                        <h3 class="text-2xl font-heading font-bold text-abyss-900 dark:text-platinum-50">
                            Create Facilitator Account
                        </h3>
                        <button @click="$emit('close')"
                            class="text-platinum-400 hover:text-platinum-600 dark:hover:text-platinum-300">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <p class="mt-2 text-sm text-platinum-600 dark:text-platinum-400">
                        Create a new educator or moderator account. A welcome email with temporary password will be
                        sent.
                    </p>
                </div>

                <!-- Form -->
                <form @submit.prevent="handleSubmit" class="space-y-5">
                    <!-- Name -->
                    <div>
                        <label for="name" class="block text-sm font-medium text-abyss-900 dark:text-platinum-100 mb-2">
                            Full Name <span class="text-red-500">*</span>
                        </label>
                        <input id="name" v-model.trim="form.name" type="text" required placeholder="John Doe"
                            class="w-full px-4 py-3 rounded-lg border border-platinum-300 dark:border-abyss-400 bg-platinum-50 dark:bg-abyss-700/50 text-abyss-900 dark:text-platinum-50 placeholder-platinum-400 focus:outline-none focus:ring-2 focus:ring-azure-blue-500/50 focus:border-azure-blue-500 transition-all"
                            :class="{ 'border-red-500 focus:ring-red-500/50': errors.name }" />
                        <p v-if="errors.name" class="mt-1 text-xs text-red-500">{{ errors.name }}</p>
                    </div>

                    <!-- Email -->
                    <div>
                        <label for="email" class="block text-sm font-medium text-abyss-900 dark:text-platinum-100 mb-2">
                            Email Address <span class="text-red-500">*</span>
                        </label>
                        <input id="email" v-model.trim="form.email" type="email" required
                            placeholder="john.doe@school.edu"
                            class="w-full px-4 py-3 rounded-lg border border-platinum-300 dark:border-abyss-400 bg-platinum-50 dark:bg-abyss-700/50 text-abyss-900 dark:text-platinum-50 placeholder-platinum-400 focus:outline-none focus:ring-2 focus:ring-azure-blue-500/50 focus:border-azure-blue-500 transition-all"
                            :class="{ 'border-red-500 focus:ring-red-500/50': errors.email }" />
                        <p v-if="errors.email" class="mt-1 text-xs text-red-500">{{ errors.email }}</p>
                        <p class="mt-1 text-xs text-platinum-500 dark:text-platinum-400">
                            Use the facilitator's work email address
                        </p>
                    </div>

                    <!-- Role -->
                    <div>
                        <label for="role" class="block text-sm font-medium text-abyss-900 dark:text-platinum-100 mb-2">
                            Role <span class="text-red-500">*</span>
                        </label>
                        <select id="role" v-model="form.role" required
                            class="w-full px-4 py-3 rounded-lg border border-platinum-300 dark:border-abyss-400 bg-platinum-50 dark:bg-abyss-700/50 text-abyss-900 dark:text-platinum-50 focus:outline-none focus:ring-2 focus:ring-azure-blue-500/50 focus:border-azure-blue-500 transition-all">
                            <option value="educator">Educator / Facilitator</option>
                            <option value="moderator">Moderator</option>
                        </select>
                        <p class="mt-1 text-xs text-platinum-500 dark:text-platinum-400">
                            Educators can create content and manage students. Moderators can also manage other users.
                        </p>
                    </div>

                    <!-- Info Box -->
                    <div
                        class="p-4 rounded-lg bg-azure-blue-50 dark:bg-azure-blue-900/20 border border-azure-blue-200 dark:border-azure-blue-800">
                        <div class="flex gap-3">
                            <svg class="w-5 h-5 text-azure-blue-600 dark:text-azure-blue-400 flex-shrink-0 mt-0.5"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div class="text-xs text-azure-blue-700 dark:text-azure-blue-300">
                                <p class="font-semibold mb-1">What happens next?</p>
                                <ul class="list-disc list-inside space-y-1">
                                    <li>A secure temporary password will be generated</li>
                                    <li>Welcome email will be sent to the facilitator</li>
                                    <li>They must change their password on first login</li>
                                    <li>Email will be automatically verified</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Actions -->
                    <div class="flex gap-3 pt-4">
                        <button type="button" @click="$emit('close')"
                            class="flex-1 px-4 py-3 bg-white dark:bg-abyss-700 border border-platinum-300 dark:border-abyss-600 rounded-lg text-sm font-medium text-abyss-700 dark:text-platinum-300 hover:bg-platinum-50 dark:hover:bg-abyss-600 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" :disabled="isLoading"
                            class="flex-1 px-4 py-3 bg-azure-blue-600 text-white font-semibold rounded-lg hover:bg-azure-blue-700 focus:ring-4 focus:ring-azure-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                            <span v-if="!isLoading">Create Account</span>
                            <span v-else class="flex items-center gap-2">
                                <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4" />
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Creating...
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from '@/utils/useToast';
import api from '@/utils/api';

const emit = defineEmits(['close', 'created']);
const toast = useToast();

const form = ref({
    name: '',
    email: '',
    role: 'educator'
});

const errors = ref({});
const isLoading = ref(false);

const handleSubmit = async () => {
    errors.value = {};
    isLoading.value = true;

    try {
        const { data } = await api.post('/api/v1/facilitators', form.value);

        toast.success(`Facilitator account created successfully! Welcome email sent to ${form.value.email}`);
        emit('created', data.facilitator);
    } catch (error) {
        const errorData = error.response?.data;

        if (errorData?.errors) {
            errors.value = errorData.errors;
        }

        toast.error(errorData?.message || 'Failed to create facilitator account');
    } finally {
        isLoading.value = false;
    }
};
</script>