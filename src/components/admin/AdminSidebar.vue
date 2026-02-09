<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { computePosition, flip, shift, offset } from '@floating-ui/dom'
import {
    LayoutDashboard, BookOpen, BrainCircuit, FileSearch,
    Bell, Database, ClipboardCheck, SearchCode,
    Users, ChevronLeft, ChevronRight
} from 'lucide-vue-next'
import AdminProfileDropdown from './AdminProfileDropdown.vue'

const route = useRoute()
const router = useRouter()

// State
const expanded = ref(false)
const profileMenuOpen = ref(false)
const profileDropdownRef = ref(null)
const profileTriggerWrapper = ref(null)
const width = ref(typeof window !== 'undefined' ? window.innerWidth : 1024)

// Logic
const isMobile = computed(() => width.value < 768)
const isIcon = computed(() => !expanded.value || isMobile.value)

const navigation = [
    { name: 'Main Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Resource Library', icon: BookOpen, path: '/resources' },
    { name: 'Class Analytics', icon: BrainCircuit, path: '/analytics' },
    { name: 'Student Progress', icon: FileSearch, path: '/student-logs' },
    { name: 'Early Alerts', icon: Bell, path: '/alerts', critical: true },
    { name: 'Add Facilitator', icon: Users, path: '/admin/facilitators' },
    { name: 'Content Approval', icon: ClipboardCheck, path: '/approvals' },
    { name: 'AI Config', icon: SearchCode, path: '/ai-settings' },
    { name: 'System Audit', icon: Database, path: '/audit-logs' },
]

const reposition = async () => {
    if (!profileMenuOpen.value || !profileDropdownRef.value || !profileTriggerWrapper.value) return;
    await nextTick();
    
    const trigger = profileTriggerWrapper.value;
    const dropdown = profileDropdownRef.value.$el; 

    const { x, y } = await computePosition(trigger, dropdown, {
        placement: 'right-end', 
        middleware: [offset(12), flip(), shift({ padding: 8 })],
    });
    
    Object.assign(dropdown.style, { 
        left: `${x}px`, 
        top: `${y}px` 
    });
};


const handleResize = () => { 
  width.value = window.innerWidth;
  if (profileMenuOpen.value) reposition();
}

onMounted(() => { window.addEventListener('resize', handleResize) })
onUnmounted(() => { window.removeEventListener('resize', handleResize) })

watch(profileMenuOpen, (val) => {
  if (val) reposition()
})

watch(() => route.path, () => { if (isMobile.value) expanded.value = false })

const isActive = (path) => route.path === path || route.path.startsWith(`${path}/`)
const emit = defineEmits(['expanded-change'])
watch(isIcon, (val) => emit('expanded-change', !val), { immediate: true })
</script>

<template>
    <aside :class="[
        'fixed top-16 left-0 bottom-0 z-40 flex flex-col',
        'bg-white/80 backdrop-blur-md text-abyss-900 border-r border-platinum-200',
        'dark:bg-abyss-900/90 dark:backdrop-blur-xl dark:text-platinum-300 dark:border-abyss-800',
        'transition-[width] duration-500 cubic-bezier(0.4, 0, 0.2, 1)',
        isIcon ? 'w-20' : 'w-64'
    ]">
        <div
            class="hidden md:flex items-center justify-between px-4 py-3 border-b border-platinum-100 dark:border-abyss-800">
            <span v-if="!isIcon" class="text-[10px] font-black uppercase tracking-[0.2em] text-platinum-400">
                Navigation
            </span>
            <button @click="expanded = !expanded"
                class="p-1.5 rounded-lg bg-platinum-50 dark:bg-abyss-800 hover:scale-110 transition-all text-kaitoke-green-600 border border-transparent hover:border-kaitoke-green-500/50">
                <ChevronLeft v-if="!isIcon" class="h-4 w-4" />
                <ChevronRight v-else class="h-4 w-4" />
            </button>
        </div>

        <nav class="flex-1 px-3 py-6 space-y-1 overflow-y-auto custom-scrollbar">
            <button v-for="item in navigation" :key="item.path" @click="router.push(item.path)" :class="[
                'group w-full rounded-xl transition-all duration-300 px-3 py-2.5 flex items-center gap-3 relative overflow-hidden',
                isActive(item.path)
                    ? 'bg-kaitoke-green-50 dark:bg-kaitoke-green-900/20 shadow-sm'
                    : 'hover:bg-kaitoke-green-50/50 dark:hover:bg-kaitoke-green-900/10'
            ]">
                <div v-if="isActive(item.path)"
                    class="absolute left-0 top-2 bottom-2 w-1 bg-kaitoke-green-500 rounded-r-full shadow-[0_0_10px_rgba(34,197,94,0.6)]">
                </div>

                <div :class="['p-2 rounded-lg transition-all duration-300 group-hover:scale-110 flex-shrink-0',
                    isActive(item.path) ? 'bg-kaitoke-green-100 dark:bg-kaitoke-green-900/30' : '']">
                    <component :is="item.icon" :class="[
                        'h-5 w-5 stroke-[1.75]',
                        isActive(item.path) ? 'text-kaitoke-green-600' : 'text-platinum-500 group-hover:text-kaitoke-green-600'
                    ]" />
                </div>

                <span v-if="!isIcon" :class="[
                    'truncate font-heading text-sm tracking-wide transition-colors',
                    isActive(item.path) ? 'font-bold text-kaitoke-green-700 dark:text-kaitoke-green-300' : 'font-medium'
                ]">
                    {{ item.name }}
                </span>

                <span v-if="item.critical && !isIcon"
                    class="ml-auto px-2 py-1 text-[10px] font-bold bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full">
                    New
                </span>
            </button>
        </nav>

        <div ref="profileTriggerWrapper" class="mt-auto flex flex-col">
            <AdminProfileDropdown v-model:open="profileMenuOpen" :is-collapsed="isIcon" :is-open="profileMenuOpen"
                @close="profileMenuOpen = false" ref="profileDropdownRef" />
        </div>
    </aside>
</template>

<style scoped>
@reference "@/style.css";

.custom-scrollbar::-webkit-scrollbar {
    width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    @apply bg-platinum-200 dark:bg-abyss-800 rounded-full;
}

.dark aside::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.3;
    background: linear-gradient(to bottom, transparent 50%, rgba(255, 255, 255, 0.02) 50%);
    background-size: 100% 4px;
}
</style>