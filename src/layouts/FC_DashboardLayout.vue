<template>
    <div class="flex h-full min-h-[calc(100vh-4rem)] overflow-hidden">
        
        <FC_Sidebar />

        <main class="flex-1 overflow-y-auto bg-white dark:bg-abyss-950 transition-all duration-300">
            <div class="max-w-full px-6 py-8">
                <router-view v-slot="{ Component }">
                    <Transition name="fade-slide" mode="out-in">
                        <component :is="Component" />
                    </Transition>
                </router-view>
            </div>
        </main>
    </div>
</template>

<script setup>
import { useSidebarStore } from '@/stores/stores';
import FC_Sidebar from '@/components/facilitatorClassroom/FC_Sidebar.vue';

const sidebarStore = useSidebarStore();
</script>