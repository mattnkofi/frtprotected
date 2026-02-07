<!-- src/components/facilitator/FacilitatorSidebar.vue -->
<template>
    <aside class="fixed top-0 left-0 z-50 h-screen transition-all duration-300 ease-in-out" :class="[
        sidebarStore.isExpanded ? 'w-64' : 'w-20',
        sidebarStore.isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    ]">
        <div
            class="h-full flex flex-col bg-white dark:bg-abyss-900 border-r border-gray-200 dark:border-abyss-800 shadow-lg">
            <!-- Logo Section -->
            <div
                class="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-abyss-800 flex-shrink-0">
                <router-link to="/facilitator/dashboard" class="flex items-center gap-3 overflow-hidden">
                    <div class="flex-shrink-0">
                        <GraduationCapIcon class="h-8 w-8 text-electric-lime-600" />
                    </div>
                    <transition name="fade">
                        <div v-if="sidebarStore.isExpanded" class="flex flex-col">
                            <span class="font-bold text-lg text-abyss-900 dark:text-white">ProtectEd</span>
                            <span class="text-xs text-platinum-600 dark:text-platinum-400">Facilitator Portal</span>
                        </div>
                    </transition>
                </router-link>

                <!-- Desktop Toggle -->
                <button @click="sidebarStore.toggleExpanded"
                    class="hidden lg:block p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-abyss-800 transition-colors">
                    <ChevronsLeftIcon v-if="sidebarStore.isExpanded" class="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    <ChevronsRightIcon v-else class="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </button>
            </div>

            <!-- Navigation -->
            <nav
                class="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-abyss-700">
                <!-- Dashboard -->
                <SidebarNavItem to="/facilitator/dashboard" :exact="true" title="Dashboard">
                    <template #icon>
                        <LayoutDashboardIcon class="h-5 w-5" />
                    </template>
                </SidebarNavItem>

                <!-- My Students -->
                <SidebarNavItem to="/facilitator/students" title="My Students">
                    <template #icon>
                        <UsersIcon class="h-5 w-5" />
                    </template>
                </SidebarNavItem>

                <!-- Modules -->
                <SidebarNavDropdown label="Modules" :match-paths="['/facilitator/modules']">
                    <template #icon>
                        <BookOpenIcon class="h-5 w-5" />
                    </template>
                    <SidebarNavItem to="/facilitator/modules" title="All Modules" />
                    <SidebarNavItem to="/facilitator/modules/create" title="Create Module" />
                </SidebarNavDropdown>

                <!-- Analytics -->
                <SidebarNavItem to="/facilitator/analytics" title="Analytics">
                    <template #icon>
                        <LineChartIcon class="h-5 w-5" />
                    </template>
                </SidebarNavItem>

                <!-- Reviews -->
                <SidebarNavItem to="/facilitator/reviews" title="Pending Reviews">
                    <template #icon>
                        <ClipboardCheckIcon class="h-5 w-5" />
                    </template>
                    <template #badge>
                        <span v-if="pendingReviews > 0">{{ pendingReviews }}</span>
                    </template>
                </SidebarNavItem>

                <!-- Resources -->
                <SidebarNavItem to="/facilitator/resources" title="Teaching Resources">
                    <template #icon>
                        <FolderIcon class="h-5 w-5" />
                    </template>
                </SidebarNavItem>
            </nav>

            <!-- User Profile Section -->
            <div class="border-t border-gray-200 dark:border-abyss-800 p-3 flex-shrink-0">
                <FacilitatorProfileDropdown :expanded="sidebarStore.isExpanded" />
            </div>
        </div>
    </aside>
</template>

<script setup>
import { ref } from 'vue';
import { useSidebarStore } from '@/stores/stores';
import {
    GraduationCapIcon,
    ChevronsLeftIcon,
    ChevronsRightIcon,
    LayoutDashboardIcon,
    UsersIcon,
    BookOpenIcon,
    LineChartIcon,
    ClipboardCheckIcon,
    FolderIcon
} from 'lucide-vue-next';
import SidebarNavItem from '@/components/sidebar/user_sidebar_nav_item.vue';
import SidebarNavDropdown from '@/components/sidebar/user_sidebar_nav_dropdown.vue';
import FacilitatorProfileDropdown from './FacilitatorProfileDropdown.vue';

const sidebarStore = useSidebarStore();
const pendingReviews = ref(3); // This should come from a store
</script>