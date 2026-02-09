<!-- src/layouts/AdminDashboardLayout.vue -->
<template>
    <div class="min-h-screen bg-platinum-50 dark:bg-abyss-900">
        <AdminHeader @toggle-mobile-sidebar="mobileOpen = !mobileOpen" />

        <div class="pt-16">
            <AdminSidebar 
                @expanded-change="isFull = $event" 
                :is-mobile-open="mobileOpen"
                @close-mobile-sidebar="mobileOpen = false" 
            />

            <main :class="[
                'transition-all duration-500 ease-in-out px-6 py-6',
                // Restore original margin logic (20 icon vs 64 full)
                'md:ml-20',
                isFull && 'md:ml-64'
            ]">
                <router-view />
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import AdminHeader from '@/components/admin/AdminHeader.vue'
import AdminSidebar from '@/components/admin/AdminSidebar.vue'

const mobileOpen = ref(false)
const isFull = ref(false)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>