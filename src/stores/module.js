// src/stores/module.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import api from '@/utils/api';

export const useModuleStore = defineStore('module', () => {
    // ===== State =====
    const modules = ref([]);
    const featuredModules = ref([]);
    const currentModule = ref(null);
    const stats = ref(null);
    const pagination = ref({
        total: 0,
        page: 1,
        limit: 12,
        totalPages: 0
    });
    const filters = ref({
        category: null,
        type: null,
        difficulty_level: null,
        search: '',
        is_featured: null
    });
    const loading = ref(false);
    const error = ref(null);

    // ===== Getters =====
    const modulesByCategory = computed(() => (category) => {
        return modules.value.filter(m => m.category === category);
    });

    const modulesByType = computed(() => (type) => {
        return modules.value.filter(m => m.type === type);
    });

    const hasMorePages = computed(() => {
        return pagination.value.page < pagination.value.totalPages;
    });

    // ===== Actions =====
    
    /**
     * Fetch modules with filters
     */
    async function fetchModules(params = {}) {
        loading.value = true;
        error.value = null;

        try {
            const response = await api.get('/api/modules', {
                params: {
                    ...filters.value,
                    page: pagination.value.page,
                    limit: pagination.value.limit,
                    ...params
                }
            });

            modules.value = response.data.modules;
            pagination.value = response.data.pagination;

            return response.data;
        } catch (err) {
            error.value = err.response?.data?.message || 'Failed to fetch modules';
            throw err;
        } finally {
            loading.value = false;
        }
    }

    /**
     * Fetch featured modules
     */
    async function fetchFeaturedModules(limit = 6) {
        try {
            const response = await api.get('/api/modules/featured', {
                params: { limit }
            });
            featuredModules.value = response.data.modules;
            return response.data;
        } catch (err) {
            error.value = err.response?.data?.message || 'Failed to fetch featured modules';
            throw err;
        }
    }

    /**
     * Fetch module statistics
     */
    async function fetchStats() {
        try {
            const response = await api.get('/api/modules/stats');
            stats.value = response.data.stats;
            return response.data;
        } catch (err) {
            error.value = err.response?.data?.message || 'Failed to fetch statistics';
            throw err;
        }
    }

    /**
     * Fetch single module by ID
     */
    async function fetchModuleById(id) {
        loading.value = true;
        error.value = null;

        try {
            const response = await api.get(`/api/modules/${id}`);
            currentModule.value = response.data.module;
            return response.data;
        } catch (err) {
            error.value = err.response?.data?.message || 'Module not found';
            throw err;
        } finally {
            loading.value = false;
        }
    }

    /**
     * Create new module
     */
    async function createModule(data, files = null) {
        loading.value = true;
        error.value = null;

        try {
            let response;

            if (files && (files.moduleFile || files.thumbnail)) {
                const formData = new FormData();
                
                // Add files
                if (files.moduleFile) {
                    formData.append('module_file', files.moduleFile);
                }
                if (files.thumbnail) {
                    formData.append('thumbnail', files.thumbnail);
                }

                // Add text data
                Object.keys(data).forEach(key => {
                    if (data[key] !== null && data[key] !== undefined) {
                        if (typeof data[key] === 'object') {
                            formData.append(key, JSON.stringify(data[key]));
                        } else {
                            formData.append(key, data[key]);
                        }
                    }
                });

                response = await api.post('/api/modules/with-files', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                response = await api.post('/api/modules', data);
            }

            // Add to modules list
            modules.value.unshift(response.data.module);

            return response.data;
        } catch (err) {
            error.value = err.response?.data?.message || 'Failed to create module';
            throw err;
        } finally {
            loading.value = false;
        }
    }

    /**
     * Update module metadata
     */
    async function updateModule(id, data) {
        loading.value = true;
        error.value = null;

        try {
            const response = await api.put(`/api/modules/${id}`, data);

            // Update in list
            const index = modules.value.findIndex(m => m.id === id);
            if (index !== -1) {
                modules.value[index] = response.data.module;
            }

            // Update current module
            if (currentModule.value?.id === id) {
                currentModule.value = response.data.module;
            }

            return response.data;
        } catch (err) {
            error.value = err.response?.data?.message || 'Failed to update module';
            throw err;
        } finally {
            loading.value = false;
        }
    }

    /**
     * Upload module file
     */
    async function uploadModuleFile(id, file) {
        try {
            const formData = new FormData();
            formData.append('module_file', file);

            const response = await api.post(`/api/modules/${id}/file`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            // Refresh module data
            await fetchModuleById(id);

            return response.data;
        } catch (err) {
            error.value = err.response?.data?.message || 'Failed to upload file';
            throw err;
        }
    }

    /**
     * Upload thumbnail
     */
    async function uploadThumbnail(id, file) {
        try {
            const formData = new FormData();
            formData.append('thumbnail', file);

            const response = await api.post(`/api/modules/${id}/thumbnail`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            // Refresh module data
            await fetchModuleById(id);

            return response.data;
        } catch (err) {
            error.value = err.response?.data?.message || 'Failed to upload thumbnail';
            throw err;
        }
    }

    /**
     * Delete module
     */
    async function deleteModule(id) {
        try {
            await api.delete(`/api/modules/${id}`);

            // Remove from list
            modules.value = modules.value.filter(m => m.id !== id);

            return true;
        } catch (err) {
            error.value = err.response?.data?.message || 'Failed to delete module';
            throw err;
        }
    }

    /**
     * Mark module as complete
     */
    async function markComplete(id) {
        try {
            await api.post(`/api/modules/${id}/complete`);
            return true;
        } catch (err) {
            error.value = err.response?.data?.message || 'Failed to mark as complete';
            throw err;
        }
    }

    /**
     * Toggle publish status
     */
    async function togglePublish(id) {
        try {
            const response = await api.patch(`/api/modules/${id}/publish`);

            // Update in list
            const module = modules.value.find(m => m.id === id);
            if (module) {
                module.is_published = response.data.is_published;
            }

            return response.data;
        } catch (err) {
            error.value = err.response?.data?.message || 'Failed to toggle publish';
            throw err;
        }
    }

    /**
     * Toggle featured status
     */
    async function toggleFeatured(id) {
        try {
            const response = await api.patch(`/api/modules/${id}/featured`);

            // Update in list
            const module = modules.value.find(m => m.id === id);
            if (module) {
                module.is_featured = response.data.is_featured;
            }

            return response.data;
        } catch (err) {
            error.value = err.response?.data?.message || 'Failed to toggle featured';
            throw err;
        }
    }

    /**
     * Update filters and fetch
     */
    async function setFilters(newFilters) {
        filters.value = { ...filters.value, ...newFilters };
        pagination.value.page = 1;
        await fetchModules();
    }

    /**
     * Load next page
     */
    async function loadNextPage() {
        if (hasMorePages.value) {
            pagination.value.page += 1;
            const response = await fetchModules();
            modules.value = [...modules.value, ...response.modules];
        }
    }

    /**
     * Reset filters
     */
    function resetFilters() {
        filters.value = {
            category: null,
            type: null,
            difficulty_level: null,
            search: '',
            is_featured: null
        };
        pagination.value.page = 1;
    }

    return {
        // State
        modules,
        featuredModules,
        currentModule,
        stats,
        pagination,
        filters,
        loading,
        error,

        // Getters
        modulesByCategory,
        modulesByType,
        hasMorePages,

        // Actions
        fetchModules,
        fetchFeaturedModules,
        fetchStats,
        fetchModuleById,
        createModule,
        updateModule,
        uploadModuleFile,
        uploadThumbnail,
        deleteModule,
        markComplete,
        togglePublish,
        toggleFeatured,
        setFilters,
        loadNextPage,
        resetFilters
    };
});
