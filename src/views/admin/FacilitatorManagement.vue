<template>
    <div class="facilitator-management">
        <!-- Header -->
        <div class="flex items-center justify-between mb-8">
            <div>
                <h1 class="text-3xl font-heading font-bold text-abyss-900 dark:text-platinum-50">
                    Facilitator Management
                </h1>
                <p class="text-platinum-600 dark:text-platinum-400 mt-2">
                    Create and manage educator accounts
                </p>
            </div>
            <button @click="showCreateModal = true"
                class="px-6 py-3 bg-azure-blue-600 text-white font-semibold rounded-lg hover:bg-azure-blue-700 focus:ring-4 focus:ring-azure-blue-500/30 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Add Facilitator
            </button>
        </div>

        <!-- Filters -->
        <div class="bg-white dark:bg-abyss-700 rounded-lg shadow p-4 mb-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label class="block text-sm font-medium text-abyss-900 dark:text-platinum-100 mb-2">
                        Role
                    </label>
                    <select v-model="filters.role" @change="fetchFacilitators"
                        class="w-full px-4 py-2 rounded-lg border border-platinum-300 dark:border-abyss-400 bg-platinum-50 dark:bg-abyss-700/50 text-abyss-900 dark:text-platinum-50">
                        <option value="">All Roles</option>
                        <option value="educator">Educator</option>
                        <option value="moderator">Moderator</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-abyss-900 dark:text-platinum-100 mb-2">
                        Status
                    </label>
                    <select v-model="filters.status" @change="fetchFacilitators"
                        class="w-full px-4 py-2 rounded-lg border border-platinum-300 dark:border-abyss-400 bg-platinum-50 dark:bg-abyss-700/50 text-abyss-900 dark:text-platinum-50">
                        <option value="">All Status</option>
                        <option value="active">Active</option>
                        <option value="deactivated">Deactivated</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-abyss-900 dark:text-platinum-100 mb-2">
                        Search
                    </label>
                    <input v-model="searchQuery" @input="debouncedSearch" type="text"
                        placeholder="Search by name or email..."
                        class="w-full px-4 py-2 rounded-lg border border-platinum-300 dark:border-abyss-400 bg-platinum-50 dark:bg-abyss-700/50 text-abyss-900 dark:text-platinum-50">
                </div>
            </div>
        </div>

        <!-- Facilitators Table -->
        <div class="bg-white dark:bg-abyss-700 rounded-lg shadow overflow-hidden">
            <div v-if="isLoading" class="p-8 text-center">
                <div
                    class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-azure-blue-500 border-t-transparent">
                </div>
                <p class="mt-4 text-platinum-600 dark:text-platinum-400">Loading facilitators...</p>
            </div>

            <div v-else-if="facilitators.length === 0" class="p-8 text-center">
                <svg class="w-16 h-16 mx-auto text-platinum-400 dark:text-platinum-600 mb-4" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p class="text-platinum-600 dark:text-platinum-400">No facilitators found</p>
                <button @click="showCreateModal = true"
                    class="mt-4 px-6 py-2 bg-azure-blue-600 text-white rounded-lg hover:bg-azure-blue-700 transition-colors">
                    Create First Facilitator
                </button>
            </div>

            <table v-else class="w-full">
                <thead class="bg-platinum-100 dark:bg-abyss-600">
                    <tr>
                        <th
                            class="px-6 py-3 text-left text-xs font-medium text-abyss-700 dark:text-platinum-300 uppercase tracking-wider">
                            Facilitator
                        </th>
                        <th
                            class="px-6 py-3 text-left text-xs font-medium text-abyss-700 dark:text-platinum-300 uppercase tracking-wider">
                            Role
                        </th>
                        <th
                            class="px-6 py-3 text-left text-xs font-medium text-abyss-700 dark:text-platinum-300 uppercase tracking-wider">
                            Status
                        </th>
                        <th
                            class="px-6 py-3 text-left text-xs font-medium text-abyss-700 dark:text-platinum-300 uppercase tracking-wider">
                            Last Login
                        </th>
                        <th
                            class="px-6 py-3 text-left text-xs font-medium text-abyss-700 dark:text-platinum-300 uppercase tracking-wider">
                            Created
                        </th>
                        <th
                            class="px-6 py-3 text-right text-xs font-medium text-abyss-700 dark:text-platinum-300 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-platinum-200 dark:divide-abyss-600">
                    <tr v-for="facilitator in facilitators" :key="facilitator.id"
                        class="hover:bg-platinum-50 dark:hover:bg-abyss-600 transition-colors">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 h-10 w-10">
                                    <img class="h-10 w-10 rounded-full"
                                        :src="facilitator.avatar_url || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(facilitator.name)"
                                        :alt="facilitator.name">
                                </div>
                                <div class="ml-4">
                                    <div class="text-sm font-medium text-abyss-900 dark:text-platinum-100">
                                        {{ facilitator.name }}
                                    </div>
                                    <div class="text-sm text-platinum-500 dark:text-platinum-400">
                                        {{ facilitator.email }}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                                :class="getRoleBadgeClass(facilitator.role)">
                                {{ facilitator.role }}
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                                :class="getStatusBadgeClass(facilitator.account_status)">
                                {{ facilitator.account_status }}
                            </span>
                            <span v-if="facilitator.requires_password_change"
                                class="ml-2 text-xs text-yellow-600 dark:text-yellow-400">
                                (Pending Setup)
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-platinum-600 dark:text-platinum-400">
                            {{ facilitator.last_login_at ? formatDate(facilitator.last_login_at) : 'Never' }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-platinum-600 dark:text-platinum-400">
                            {{ formatDate(facilitator.created_at) }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div class="flex items-center justify-end gap-2">
                                <button @click="resendWelcome(facilitator)"
                                    :title="facilitator.requires_password_change ? 'Resend Welcome Email' : 'Send New Temporary Password'"
                                    class="text-azure-blue-600 hover:text-azure-blue-900 dark:text-azure-blue-400 dark:hover:text-azure-blue-300">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </button>
                                <button @click="editFacilitator(facilitator)" title="Edit Facilitator"
                                    class="text-calm-lavender-600 hover:text-calm-lavender-900 dark:text-calm-lavender-400 dark:hover:text-calm-lavender-300">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </button>
                                <button @click="confirmDelete(facilitator)" title="Delete Facilitator"
                                    class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div v-if="pagination.totalPages > 1" class="flex items-center justify-between mt-6">
            <div class="text-sm text-platinum-600 dark:text-platinum-400">
                Showing {{ ((pagination.page - 1) * pagination.limit) + 1 }} to {{ Math.min(pagination.page *
                    pagination.limit, pagination.total) }} of {{ pagination.total }} facilitators
            </div>
            <div class="flex gap-2">
                <button @click="changePage(pagination.page - 1)" :disabled="pagination.page === 1"
                    class="px-4 py-2 bg-white dark:bg-abyss-700 border border-platinum-300 dark:border-abyss-600 rounded-lg text-sm font-medium text-abyss-700 dark:text-platinum-300 hover:bg-platinum-50 dark:hover:bg-abyss-600 disabled:opacity-50 disabled:cursor-not-allowed">
                    Previous
                </button>
                <button @click="changePage(pagination.page + 1)" :disabled="pagination.page === pagination.totalPages"
                    class="px-4 py-2 bg-white dark:bg-abyss-700 border border-platinum-300 dark:border-abyss-600 rounded-lg text-sm font-medium text-abyss-700 dark:text-platinum-300 hover:bg-platinum-50 dark:hover:bg-abyss-600 disabled:opacity-50 disabled:cursor-not-allowed">
                    Next
                </button>
            </div>
        </div>

        <!-- Create Facilitator Modal -->
        <CreateFacilitatorModal v-if="showCreateModal" @close="showCreateModal = false"
            @created="handleFacilitatorCreated" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from '@/utils/useToast';
import api from '@/utils/api';
import CreateFacilitatorModal from './CreateFacilitatorModal.vue';

const toast = useToast();

const facilitators = ref([]);
const isLoading = ref(false);
const showCreateModal = ref(false);
const searchQuery = ref('');
const filters = ref({
    role: '',
    status: ''
});
const pagination = ref({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0
});

const fetchFacilitators = async () => {
    isLoading.value = true;
    try {
        const params = {
            page: pagination.value.page,
            limit: pagination.value.limit,
            ...filters.value
        };

        const { data } = await api.get('/api/v1/facilitators', { params });
        facilitators.value = data.facilitators;
        pagination.value = data.pagination;
    } catch (error) {
        toast.error('Failed to load facilitators');
    } finally {
        isLoading.value = false;
    }
};

const resendWelcome = async (facilitator) => {
    try {
        await api.post(`/api/v1/facilitators/${facilitator.id}/resend-welcome`);
        toast.success(`Welcome email sent to ${facilitator.email}`);
    } catch (error) {
        toast.error('Failed to resend email');
    }
};

const editFacilitator = (facilitator) => {
    // Implement edit modal
    toast.info('Edit functionality coming soon');
};

const confirmDelete = async (facilitator) => {
    if (confirm(`Are you sure you want to delete ${facilitator.name}? This action cannot be undone.`)) {
        try {
            await api.delete(`/api/v1/facilitators/${facilitator.id}`);
            toast.success('Facilitator deleted successfully');
            fetchFacilitators();
        } catch (error) {
            toast.error('Failed to delete facilitator');
        }
    }
};

const changePage = (page) => {
    pagination.value.page = page;
    fetchFacilitators();
};

const handleFacilitatorCreated = () => {
    showCreateModal.value = false;
    fetchFacilitators();
};

const getRoleBadgeClass = (role) => {
    return role === 'educator'
        ? 'bg-azure-blue-100 text-azure-blue-800 dark:bg-azure-blue-900/30 dark:text-azure-blue-300'
        : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
};

const getStatusBadgeClass = (status) => {
    return status === 'active'
        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
        : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
};

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

let searchTimeout;
const debouncedSearch = () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        fetchFacilitators();
    }, 500);
};

onMounted(() => {
    fetchFacilitators();
});
</script>