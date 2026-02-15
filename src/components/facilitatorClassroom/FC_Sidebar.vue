<template>
    <aside 
        class="sticky top-0 h-[calc(100vh-4rem)] w-80 transition-all duration-300 z-30 shadow-inner flex flex-col bg-platinum-100 dark:bg-abyss-900 border-r border-sun-200 dark:border-abyss-700"
    >
        <div class="p-6">
            <div class="p-4 rounded-2xl bg-white dark:bg-abyss-800 shadow-sm border border-sun-100 dark:border-abyss-700">
                <div class="flex items-center gap-3 mb-2">
                    <div :class="getThemeColorClass(classroom.themeColor)" class="w-12 h-12 rounded-xl flex-shrink-0 shadow-sm"></div>
                    <div class="flex-1 min-w-0">
                        <h2 class="font-black text-abyss-900 dark:text-platinum-50 truncate text-sm leading-tight">
                            {{ classroom.name }}
                        </h2>
                        <span class="text-[9px] font-black text-kaitoke-green-600 dark:text-kaitoke-green-400 uppercase tracking-widest">
                            Class Manager
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <nav class="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
            <div class="space-y-1">
                <p class="px-3 mb-2 text-[10px] font-black text-platinum-400 uppercase tracking-widest">Administration</p>
                <SidebarNavItem :to="{ name: 'classroom.dashboard' }" title="Class Overview">
                    <template #icon><LayoutDashboardIcon class="h-6 w-6" /></template>
                </SidebarNavItem>
                <SidebarNavItem :to="{ name: 'classroom.students' }" title="Student Roster">
                    <template #icon><UsersIcon class="h-6 w-6" /></template>
                </SidebarNavItem>
            </div>

            <div class="space-y-1">
                <div class="px-3 mb-2">
                    <span class="text-[10px] font-black text-platinum-400 uppercase tracking-widest">Learning Channels</span>
                </div>

                <router-link 
                    v-for="channel in channels" 
                    :key="channel.id"
                    :to="{ name: 'classroom.manage.channel', params: { channelId: channel.id } }"
                    class="group flex items-center px-4 py-3 rounded-xl transition-all duration-200"
                    active-class="bg-white dark:bg-abyss-800 text-kaitoke-green-600 shadow-sm ring-1 ring-sun-100 dark:ring-abyss-700"
                >
                    <div class="flex flex-col min-w-0">
                        <span class="text-sm font-bold truncate group-hover:translate-x-1 transition-transform duration-200"
                              :class="[$route.params.channelId == channel.id ? 'text-kaitoke-green-600' : 'text-platinum-600 dark:text-platinum-400']">
                            {{ channel.name }}
                        </span>
                        <span class="text-[10px] opacity-50 truncate">
                            {{ channel.type || 'Discussion' }}
                        </span>
                    </div>
                </router-link>
            </div>
        </nav>
    </aside>
</template>

<script setup>
import { ref } from 'vue';
import { useSidebarStore } from '@/stores/stores';
import { LayoutDashboardIcon, UsersIcon } from 'lucide-vue-next';
import SidebarNavItem from '@/components/sidebar/user_sidebar_nav_item.vue';

const sidebarStore = useSidebarStore(); // Still kept for global context if needed
const classroom = ref({ name: 'Gender & Development 101', themeColor: 'lavender' });
const channels = ref([
    { id: 1, name: 'general discussion', type: 'Public' },
    { id: 2, name: 'module-1 basics', type: 'Coursework' },
    { id: 3, name: 'vawc prevention', type: 'Resources' }
]);

const getThemeColorClass = (color) => {
    const colorMap = {
        lavender: 'bg-calm-lavender-600',
        azure: 'bg-azure-blue-500',
        pink: 'bg-neon-pink-500'
    };
    return colorMap[color] || 'bg-calm-lavender-600';
};
</script>