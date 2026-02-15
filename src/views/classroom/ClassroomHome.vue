<template>
    <div class="p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div
            class="bg-gradient-to-br from-calm-lavender-600 to-calm-lavender-800 rounded-3xl p-10 text-white shadow-xl">
            <h1 class="text-4xl font-black mb-4">Welcome to {{ classroom.name }}</h1>
            <p class="text-calm-lavender-50 text-lg opacity-90 leading-relaxed">{{ classroom.description }}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="p-6 bg-platinum-50 dark:bg-abyss-900 rounded-2xl border border-sun-100 dark:border-abyss-700">
                <h3 class="font-bold text-abyss-900 dark:text-platinum-50 mb-2 flex items-center gap-2">
                    <span>👨‍🏫</span> Your Instructor
                </h3>
                <p class="text-platinum-600 dark:text-platinum-300">{{ classroom.instructor }}</p>
            </div>

            <div class="p-6 bg-platinum-50 dark:bg-abyss-900 rounded-2xl border border-sun-100 dark:border-abyss-700">
                <h3 class="font-bold text-abyss-900 dark:text-platinum-50 mb-2 flex items-center gap-2">
                    <span>📅</span> Next Deadline
                </h3>
                <p class="text-platinum-600 dark:text-platinum-300">Cryptography Quiz - Friday, 6:00 PM</p>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps(['classroom'])
</script>