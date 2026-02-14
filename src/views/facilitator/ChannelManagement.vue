<template>
    <div class="flex flex-col h-full bg-platinum-50/30 dark:bg-abyss-900/10">
        <!-- Channel Header -->
        <div class="p-6 bg-white dark:bg-abyss-800 border-b border-sun-100 dark:border-abyss-700">
            <div class="flex items-start justify-between mb-4">
                <div class="flex items-center gap-3">
                    <Hash class="w-8 h-8 text-calm-lavender-600" />
                    <div>
                        <h2 class="text-2xl font-bold text-abyss-900 dark:text-platinum-50">{{ currentChannel.name }}
                        </h2>
                        <p class="text-sm text-platinum-500 mt-1">{{ currentChannel.description }}</p>
                    </div>
                </div>
                <button @click="showEditChannel = true"
                    class="flex items-center gap-2 px-4 py-2 bg-calm-lavender-600 hover:bg-calm-lavender-700 text-white font-medium rounded-lg transition">
                    <Settings class="w-4 h-4" />
                    Channel Settings
                </button>
            </div>

            <!-- Channel Stats -->
            <div class="grid grid-cols-4 gap-4">
                <div
                    class="p-3 bg-platinum-50 dark:bg-abyss-900 rounded-lg border border-sun-100 dark:border-abyss-700">
                    <p class="text-xs font-bold text-platinum-500 uppercase tracking-widest mb-1">Messages</p>
                    <p class="text-xl font-bold text-abyss-900 dark:text-platinum-50">{{ currentChannel.messageCount }}
                    </p>
                </div>
                <div
                    class="p-3 bg-platinum-50 dark:bg-abyss-900 rounded-lg border border-sun-100 dark:border-abyss-700">
                    <p class="text-xs font-bold text-platinum-500 uppercase tracking-widest mb-1">Active Users</p>
                    <p class="text-xl font-bold text-abyss-900 dark:text-platinum-50">{{ currentChannel.activeUsers
                        }}/45</p>
                </div>
                <div
                    class="p-3 bg-platinum-50 dark:bg-abyss-900 rounded-lg border border-sun-100 dark:border-abyss-700">
                    <p class="text-xs font-bold text-platinum-500 uppercase tracking-widest mb-1">Posts</p>
                    <p class="text-xl font-bold text-abyss-900 dark:text-platinum-50">{{ currentChannel.posts.length }}
                    </p>
                </div>
                <div
                    class="p-3 bg-platinum-50 dark:bg-abyss-900 rounded-lg border border-sun-100 dark:border-abyss-700">
                    <p class="text-xs font-bold text-platinum-500 uppercase tracking-widest mb-1">Module</p>
                    <p class="text-xl font-bold text-abyss-900 dark:text-platinum-50">
                        {{ currentChannel.module ? currentChannel.module.name : 'None' }}
                    </p>
                </div>
            </div>
        </div>

        <!-- Main Content Area -->
        <div class="flex-1 flex overflow-hidden">
            <!-- Posts & Chat -->
            <div class="flex-1 flex flex-col border-r border-sun-100 dark:border-abyss-700 bg-white dark:bg-abyss-800">
                <!-- Tab Navigation -->
                <div class="px-6 border-b border-sun-100 dark:border-abyss-700">
                    <div class="flex gap-6">
                        <button @click="activeTab = 'posts'" :class="[
                            'py-3 px-1 border-b-2 text-sm font-bold transition',
                            activeTab === 'posts'
                                ? 'border-calm-lavender-600 text-calm-lavender-600'
                                : 'border-transparent text-platinum-500 hover:text-abyss-900 dark:hover:text-platinum-100'
                        ]">
                            Posts & Instructions
                        </button>
                        <button @click="activeTab = 'chat'" :class="[
                            'py-3 px-1 border-b-2 text-sm font-bold transition',
                            activeTab === 'chat'
                                ? 'border-calm-lavender-600 text-calm-lavender-600'
                                : 'border-transparent text-platinum-500 hover:text-abyss-900 dark:hover:text-platinum-100'
                        ]">
                            Chat ({{ messages.length }})
                        </button>
                    </div>
                </div>

                <!-- Posts Tab -->
                <div v-if="activeTab === 'posts'" class="flex-1 overflow-y-auto p-6 space-y-4">
                    <!-- Create Post Button -->
                    <button @click="showCreatePost = true"
                        class="w-full p-4 bg-platinum-50 dark:bg-abyss-900 border-2 border-dashed border-sun-200 dark:border-abyss-700 rounded-xl hover:border-calm-lavender-500 hover:bg-calm-lavender-50 dark:hover:bg-calm-lavender-900/10 transition flex items-center justify-center gap-2 text-calm-lavender-600 font-bold">
                        <Plus class="w-5 h-5" />
                        Create New Post
                    </button>

                    <!-- Posts List -->
                    <div v-for="post in currentChannel.posts" :key="post.id"
                        class="bg-white dark:bg-abyss-800 border border-sun-200 dark:border-abyss-700 rounded-xl p-5 space-y-3">
                        <div class="flex items-start justify-between">
                            <div class="flex items-start gap-3">
                                <div
                                    class="w-10 h-10 rounded-full bg-gradient-to-br from-calm-lavender-400 to-calm-lavender-600 flex items-center justify-center text-white font-bold">
                                    {{post.author.split(' ').map(n => n[0]).join('')}}
                                </div>
                                <div>
                                    <p class="font-bold text-abyss-900 dark:text-platinum-50">{{ post.author }}</p>
                                    <p class="text-xs text-platinum-500">{{ post.timestamp }}</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-2">
                                <button @click="editPost(post)"
                                    class="p-2 hover:bg-platinum-50 dark:hover:bg-abyss-700 rounded-lg transition">
                                    <Edit2 class="w-4 h-4 text-platinum-500" />
                                </button>
                                <button @click="deletePost(post)"
                                    class="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition">
                                    <Trash2 class="w-4 h-4 text-red-500" />
                                </button>
                            </div>
                        </div>

                        <div v-if="post.type === 'announcement'"
                            class="flex items-center gap-2 px-3 py-1.5 bg-azure-blue-50 dark:bg-azure-blue-900/20 rounded-lg w-fit">
                            <Megaphone class="w-4 h-4 text-azure-blue-600" />
                            <span class="text-xs font-bold text-azure-blue-600 uppercase">Announcement</span>
                        </div>

                        <div class="text-platinum-600 dark:text-platinum-300 leading-relaxed">
                            {{ post.content }}
                        </div>

                        <div v-if="post.module"
                            class="p-4 bg-calm-lavender-50 dark:bg-calm-lavender-900/10 border border-calm-lavender-200 dark:border-calm-lavender-800 rounded-lg flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <BookOpen class="w-5 h-5 text-calm-lavender-600" />
                                <div>
                                    <p class="font-bold text-abyss-900 dark:text-platinum-50">{{ post.module.name }}</p>
                                    <p class="text-xs text-platinum-500">Assigned Module</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-2">
                                <span v-if="post.module.hasQuiz"
                                    class="px-3 py-1 bg-neon-pink-100 dark:bg-neon-pink-900/30 text-neon-pink-700 dark:text-neon-pink-400 rounded-full text-xs font-bold">
                                    Has Quiz
                                </span>
                            </div>
                        </div>

                        <div class="flex items-center gap-4 text-sm text-platinum-500">
                            <span>{{ post.views }} views</span>
                            <span>•</span>
                            <span>{{ post.reactions }} reactions</span>
                        </div>
                    </div>

                    <!-- Empty State -->
                    <div v-if="currentChannel.posts.length === 0" class="text-center py-12">
                        <FileText class="w-16 h-16 mx-auto text-platinum-300 mb-4" />
                        <h3 class="text-lg font-bold text-abyss-900 dark:text-platinum-50 mb-2">No posts yet</h3>
                        <p class="text-platinum-600 dark:text-platinum-300 mb-4">Create your first post to share
                            instructions or announcements</p>
                        <button @click="showCreatePost = true"
                            class="inline-flex items-center gap-2 px-6 py-3 bg-calm-lavender-600 hover:bg-calm-lavender-700 text-white font-bold rounded-xl transition">
                            <Plus class="w-5 h-5" />
                            Create First Post
                        </button>
                    </div>
                </div>

                <!-- Chat Tab -->
                <div v-else-if="activeTab === 'chat'" class="flex-1 flex flex-col">
                    <div class="flex-1 overflow-y-auto p-6 space-y-4">
                        <div v-for="msg in messages" :key="msg.id" class="flex gap-3">
                            <div
                                class="w-8 h-8 rounded-full bg-gradient-to-br from-azure-blue-400 to-azure-blue-600 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
                                {{msg.user.split(' ').map(n => n[0]).join('')}}
                            </div>
                            <div>
                                <p class="text-xs font-bold text-abyss-900 dark:text-platinum-100">
                                    {{ msg.user }}
                                    <span class="text-[10px] text-platinum-400 font-normal ml-2">{{ msg.time }}</span>
                                </p>
                                <p class="text-sm text-platinum-600 dark:text-platinum-300 mt-1">{{ msg.text }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Chat Input -->
                    <div class="p-4 bg-platinum-50 dark:bg-abyss-900 border-t border-sun-100 dark:border-abyss-700">
                        <div
                            class="flex gap-2 p-2 bg-white dark:bg-abyss-800 rounded-xl border border-sun-200 dark:border-abyss-700">
                            <input type="text" placeholder="Message students..."
                                class="flex-1 bg-transparent border-none focus:ring-0 text-sm dark:text-white px-2 outline-none" />
                            <button
                                class="px-4 py-2 bg-calm-lavender-600 hover:bg-calm-lavender-700 text-white rounded-lg text-xs font-bold transition">
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sidebar - Module Assignment -->
            <aside class="w-80 bg-white dark:bg-abyss-800 p-6 space-y-6 overflow-y-auto">
                <div>
                    <h3 class="text-sm font-bold text-platinum-500 uppercase tracking-widest mb-3">Assigned Module</h3>
                    <div v-if="currentChannel.module"
                        class="p-4 bg-platinum-50 dark:bg-abyss-900 rounded-xl border border-sun-100 dark:border-abyss-700">
                        <p class="font-bold text-abyss-900 dark:text-platinum-50 mb-2">{{ currentChannel.module.name }}
                        </p>
                        <div class="space-y-2 text-sm text-platinum-600 dark:text-platinum-400 mb-4">
                            <div class="flex justify-between">
                                <span>Completion:</span>
                                <span class="font-bold">{{ currentChannel.module.completion }}%</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Avg Score:</span>
                                <span class="font-bold">{{ currentChannel.module.avgScore }}%</span>
                            </div>
                        </div>
                        <button @click="changeModule"
                            class="w-full py-2 text-sm font-medium text-calm-lavender-600 hover:bg-calm-lavender-50 dark:hover:bg-calm-lavender-900/20 rounded-lg transition">
                            Change Module
                        </button>
                    </div>
                    <button v-else @click="assignModule"
                        class="w-full p-4 bg-platinum-50 dark:bg-abyss-900 border-2 border-dashed border-sun-200 dark:border-abyss-700 rounded-xl hover:border-calm-lavender-500 transition flex items-center justify-center gap-2 text-calm-lavender-600 font-bold">
                        <Plus class="w-5 h-5" />
                        Assign Module
                    </button>
                </div>

                <div>
                    <h3 class="text-sm font-bold text-platinum-500 uppercase tracking-widest mb-3">Quick Actions</h3>
                    <div class="space-y-2">
                        <button @click="showCreatePost = true"
                            class="w-full flex items-center gap-3 px-4 py-3 bg-platinum-50 dark:bg-abyss-900 hover:bg-platinum-100 dark:hover:bg-abyss-700 rounded-lg transition text-left">
                            <Plus class="w-5 h-5 text-calm-lavender-600" />
                            <span class="font-medium text-abyss-900 dark:text-platinum-50">New Post</span>
                        </button>
                        <button @click="showBulkMessage = true"
                            class="w-full flex items-center gap-3 px-4 py-3 bg-platinum-50 dark:bg-abyss-900 hover:bg-platinum-100 dark:hover:bg-abyss-700 rounded-lg transition text-left">
                            <MessageCircle class="w-5 h-5 text-azure-blue-600" />
                            <span class="font-medium text-abyss-900 dark:text-platinum-50">Message All</span>
                        </button>
                    </div>
                </div>
            </aside>
        </div>

        <!-- Create Post Modal -->
        <Transition name="modal-fade">
            <div v-if="showCreatePost"
                class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-abyss-900/60 backdrop-blur-sm">
                <div @click.stop
                    class="bg-white dark:bg-abyss-800 rounded-2xl w-full max-w-2xl overflow-hidden border border-sun-200 dark:border-abyss-700 shadow-2xl">
                    <div class="p-6 border-b border-sun-100 dark:border-abyss-700 flex justify-between items-center">
                        <h2 class="text-xl font-bold text-abyss-900 dark:text-platinum-50">Create Post</h2>
                        <button @click="showCreatePost = false"
                            class="p-2 hover:bg-platinum-50 dark:hover:bg-abyss-700 rounded-lg transition">
                            <X class="w-5 h-5 text-platinum-500" />
                        </button>
                    </div>
                    <form @submit.prevent="createPost" class="p-6 space-y-4">
                        <div>
                            <label class="text-xs font-bold text-platinum-500 uppercase tracking-widest mb-2 block">Post
                                Type</label>
                            <select v-model="newPost.type"
                                class="w-full px-3 py-2 bg-platinum-50 dark:bg-abyss-900 border border-sun-200 dark:border-abyss-700 rounded-lg text-sm dark:text-white outline-none focus:ring-2 focus:ring-calm-lavender-500">
                                <option value="normal">Regular Post</option>
                                <option value="announcement">Announcement</option>
                            </select>
                        </div>
                        <div>
                            <label
                                class="text-xs font-bold text-platinum-500 uppercase tracking-widest mb-2 block">Content</label>
                            <textarea v-model="newPost.content" rows="6" placeholder="Write your post content..."
                                class="w-full px-3 py-2 bg-platinum-50 dark:bg-abyss-900 border border-sun-200 dark:border-abyss-700 rounded-lg text-sm dark:text-white outline-none focus:ring-2 focus:ring-calm-lavender-500 resize-none"></textarea>
                        </div>
                        <div class="flex items-center gap-3">
                            <input type="checkbox" v-model="newPost.assignModule" id="assign-module"
                                class="w-4 h-4 text-calm-lavender-600 rounded focus:ring-2 focus:ring-calm-lavender-500" />
                            <label for="assign-module" class="text-sm font-medium text-abyss-900 dark:text-platinum-50">
                                Attach a module to this post
                            </label>
                        </div>
                        <div class="flex gap-3">
                            <button type="button" @click="showCreatePost = false"
                                class="flex-1 px-4 py-2 text-sm font-medium text-platinum-600 dark:text-platinum-400 hover:bg-platinum-50 dark:hover:bg-abyss-700 rounded-lg transition">
                                Cancel
                            </button>
                            <button type="submit"
                                class="flex-1 px-4 py-2 bg-calm-lavender-600 hover:bg-calm-lavender-700 text-white text-sm font-medium rounded-lg transition">
                                Post
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import {
    Hash, Settings, Plus, Edit2, Trash2, Megaphone, BookOpen, FileText,
    MessageCircle, X
} from 'lucide-vue-next'

const activeTab = ref('posts')
const showCreatePost = ref(false)
const showEditChannel = ref(false)
const showBulkMessage = ref(false)

const currentChannel = ref({
    id: 1,
    name: 'module-1',
    description: 'Introduction to Gender Equality and GAD principles',
    messageCount: 234,
    activeUsers: 42,
    module: {
        name: 'Module 1: GAD Basics',
        completion: 87,
        avgScore: 85,
        hasQuiz: true
    },
    posts: [
        {
            id: 1,
            type: 'announcement',
            author: 'You (Facilitator)',
            timestamp: '2 hours ago',
            content: 'Welcome to Module 1! Please complete the assigned reading before attempting the quiz. The quiz will be available until Friday at 11:59 PM.',
            module: {
                name: 'Module 1: GAD Basics',
                hasQuiz: true
            },
            views: 42,
            reactions: 15
        },
        {
            id: 2,
            type: 'normal',
            author: 'You (Facilitator)',
            timestamp: 'Yesterday at 3:30 PM',
            content: 'Great work on the discussions this week! I\'ve noticed excellent engagement from many of you. Remember to review the key concepts before the quiz.',
            views: 38,
            reactions: 12
        }
    ]
})

const messages = ref([
    { id: 1, user: 'Sarah Johnson', text: 'When is the quiz due?', time: '10:15 AM' },
    { id: 2, user: 'You', text: 'The quiz is due this Friday at 11:59 PM.', time: '10:18 AM' },
    { id: 3, user: 'Michael Chen', text: 'Thank you!', time: '10:20 AM' }
])

const newPost = ref({
    type: 'normal',
    content: '',
    assignModule: false
})

const createPost = () => {
    console.log('Creating post:', newPost.value)
    showCreatePost.value = false
    newPost.value = { type: 'normal', content: '', assignModule: false }
}

const editPost = (post) => {
    console.log('Editing post:', post.id)
}

const deletePost = (post) => {
    if (confirm('Delete this post?')) {
        console.log('Deleting post:', post.id)
    }
}

const assignModule = () => {
    console.log('Assigning module...')
}

const changeModule = () => {
    console.log('Changing module...')
}
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
}
</style>