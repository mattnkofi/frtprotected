<!-- src/components/admin/AdminSidebar.vue -->
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
                <router-link to="/admin/dashboard" class="flex items-center gap-3 overflow-hidden">
                    <div class="flex-shrink-0">
                        <ShieldCheckIcon class="h-8 w-8 text-kaitoke-green-600" />
                    </div>
                    <transition name="fade">
                        <div v-if="sidebarStore.isExpanded" class="flex flex-col">
                            <span class="font-bold text-lg text-abyss-900 dark:text-white">ProtectEd</span>
                            <span class="text-xs text-platinum-600 dark:text-platinum-400">Admin Panel</span>
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
                <SidebarNavItem to="/admin/dashboard" :exact="true" title="Dashboard">
                    <template #icon>
                        <LayoutDashboardIcon class="h-5 w-5" />
                    </template>
                </SidebarNavItem>

                <!-- User Management -->
                <SidebarNavItem to="/admin/users" title="User Management">
                    <template #icon>
                        <UsersIcon class="h-5 w-5" />
                    </template>
                </SidebarNavItem>

                <!-- Facilitator Management -->
                <SidebarNavItem to="/admin/facilitators" title="Facilitators">
                    <template #icon>
                        <UserCogIcon class="h-5 w-5" />
                    </template>
                </SidebarNavItem>

                <!-- Content Management -->
                <SidebarNavDropdown label="Content" :match-paths="['/admin/content']">
                    <template #icon>
                        <FileTextIcon class="h-5 w-5" />
                    </template>
                    <SidebarNavItem to="/admin/content" title="Content Library" />
                    <SidebarNavItem to="/admin/content/modules" title="Modules" />
                    <SidebarNavItem to="/admin/content/categories" title="Categories" />
                </SidebarNavDropdown>

                <!-- Analytics & Reports -->
                <SidebarNavItem to="/admin/reports" title="Analytics & Reports">
                    <template #icon>
                        <BarChartIcon class="h-5 w-5" />
                    </template>
                </SidebarNavItem>

                <!-- Activity Log -->
                <SidebarNavItem to="/admin/activity" title="Activity Log">
                    <template #icon>
                        <ActivityIcon class="h-5 w-5" />
                    </template>
                </SidebarNavItem>

                <!-- Settings -->
                <SidebarNavDropdown label="Settings" :match-paths="['/admin/settings']">
                    <template #icon>
                        <SettingsIcon class="h-5 w-5" />
                    </template>
                    <SidebarNavItem to="/admin/settings" title="Platform Settings" />
                    <SidebarNavItem to="/admin/settings/security" title="Security" />
                    <SidebarNavItem to="/admin/settings/notifications" title="Notifications" />
                </SidebarNavDropdown>
            </nav>

            <!-- User Profile Section -->
            <div class="border-t border-gray-200 dark:border-abyss-800 p-3 flex-shrink-0">
                <AdminProfileDropdown :expanded="sidebarStore.isExpanded" />
            </div>
        </div>
    </aside>
</template>

<script setup>
import { useSidebarStore } from '@/stores/stores';
import {
    ShieldCheckIcon,
    ChevronsLeftIcon,
    ChevronsRightIcon,
    LayoutDashboardIcon,
    UsersIcon,
    UserCogIcon,
    FileTextIcon,
    BarChartIcon,
    ActivityIcon,
    SettingsIcon
} from 'lucide-vue-next';
import SidebarNavItem from '@/components/sidebar/user_sidebar_nav_item.vue';
import SidebarNavDropdown from '@/components/sidebar/user_sidebar_nav_dropdown.vue';
import AdminProfileDropdown from './AdminProfileDropdown.vue';

const sidebarStore = useSidebarStore();
</script>