<!-- src/components/modules/DocumentViewer.vue -->
<template>
    <div class="document-viewer">
        <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
                <div class="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <div>
                    <h3 class="font-semibold text-gray-900 dark:text-white">{{ fileName || 'Document' }}</h3>
                    <p class="text-sm text-gray-500 dark:text-gray-400">{{ formatFileType(fileType) }}</p>
                </div>
            </div>

            <div class="flex items-center gap-2">
                <!-- View mode toggle (PDF only) -->
                <button v-if="canPreview && isPDF" @click="viewMode = viewMode === 'preview' ? 'download' : 'preview'"
                    class="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-abyss-700 rounded-lg transition-colors"
                    :title="viewMode === 'preview' ? 'Switch to download mode' : 'Switch to preview mode'">
                    <svg v-if="viewMode === 'preview'" class="w-5 h-5" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                </button>

                <!-- Download button -->
                <a :href="fileUrl" :download="fileName" target="_blank"
                    class="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>Download</span>
                </a>
            </div>
        </div>

        <!-- Preview area -->
        <div class="border dark:border-abyss-600 rounded-lg overflow-hidden bg-gray-50 dark:bg-abyss-900">
            <!-- PDF Preview -->
            <div v-if="canPreview && isPDF && viewMode === 'preview'" class="relative">
                <iframe :src="fileUrl + '#toolbar=1'" class="w-full h-[600px] md:h-[800px]" frameborder="0"
                    @load="previewLoaded = true" @error="previewError = true"></iframe>

                <!-- Loading overlay -->
                <div v-if="!previewLoaded && !previewError"
                    class="absolute inset-0 flex items-center justify-center bg-white dark:bg-abyss-900">
                    <div class="text-center">
                        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4">
                        </div>
                        <p class="text-gray-600 dark:text-gray-400">Loading preview...</p>
                    </div>
                </div>

                <!-- Error overlay -->
                <div v-if="previewError"
                    class="absolute inset-0 flex items-center justify-center bg-white dark:bg-abyss-900">
                    <div class="text-center p-6">
                        <svg class="w-16 h-16 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p class="text-gray-900 dark:text-white font-semibold mb-2">Preview not available</p>
                        <p class="text-gray-600 dark:text-gray-400 mb-4">Please download the file to view it</p>
                        <button @click="viewMode = 'download'"
                            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                            Switch to Download Mode
                        </button>
                    </div>
                </div>
            </div>

            <!-- Google Docs Viewer (Word documents) -->
            <div v-else-if="canPreview && isWord && viewMode === 'preview'" class="relative">
                <iframe :src="getGoogleDocsViewerUrl()" class="w-full h-[600px] md:h-[800px]" frameborder="0"
                    @load="previewLoaded = true" @error="previewError = true"></iframe>

                <!-- Loading overlay -->
                <div v-if="!previewLoaded && !previewError"
                    class="absolute inset-0 flex items-center justify-center bg-white dark:bg-abyss-900">
                    <div class="text-center">
                        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4">
                        </div>
                        <p class="text-gray-600 dark:text-gray-400">Loading preview...</p>
                    </div>
                </div>

                <!-- Error overlay -->
                <div v-if="previewError"
                    class="absolute inset-0 flex items-center justify-center bg-white dark:bg-abyss-900">
                    <div class="text-center p-6">
                        <svg class="w-16 h-16 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p class="text-gray-900 dark:text-white font-semibold mb-2">Preview not available</p>
                        <p class="text-gray-600 dark:text-gray-400 mb-4">Please download the file to view it</p>
                    </div>
                </div>
            </div>

            <!-- Download-only view (Word documents or when preview fails) -->
            <div v-else class="text-center py-20">
                <div
                    class="p-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-lg inline-block">
                    <svg class="w-20 h-20 mx-auto text-blue-600 dark:text-blue-400 mb-4" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{ fileName }}</h3>
                    <p class="text-gray-600 dark:text-gray-400 mb-6">{{ formatFileType(fileType) }}</p>
                    <a :href="fileUrl" :download="fileName" target="_blank"
                        class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span>Download File</span>
                    </a>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-4">
                        {{ isWord ? 'Word documents must be downloaded to view' :
                        'Preview not available for this file type' }}
                    </p>
                </div>
            </div>
        </div>

        <!-- File info -->
        <div class="mt-4 text-sm text-gray-500 dark:text-gray-400">
            <p v-if="!canPreview || viewMode === 'download'" class="flex items-center gap-2">
                <Lightbulb class="h-4 w-4 text-sun-500 shrink-0" />
                <span>Tip: Download the file to your device for the best viewing experience</span>
            </p>

            <p v-else-if="isPDF" class="flex items-center gap-2">
                <Lightbulb class="h-4 w-4 text-sun-500 shrink-0" />
                <span>Tip: You can zoom, navigate pages, and use other PDF controls in the viewer above</span>
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Lightbulb } from 'lucide-vue-next';

const props = defineProps({
    fileUrl: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        default: 'Document'
    },
    fileType: {
        type: String,
        default: 'application/pdf'
    }
});

const viewMode = ref('preview'); // 'preview' or 'download'
const previewLoaded = ref(false);
const previewError = ref(false);

const isPDF = computed(() => {
    return props.fileType === 'application/pdf' || props.fileName?.toLowerCase().endsWith('.pdf');
});

const isWord = computed(() => {
    return props.fileType === 'application/msword' ||
        props.fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        props.fileName?.toLowerCase().match(/\.(doc|docx)$/);
});

const canPreview = computed(() => {
    return isPDF.value || isWord.value;
});

const formatFileType = (type) => {
    const map = {
        'application/pdf': 'PDF Document',
        'application/msword': 'Word Document (.doc)',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'Word Document (.docx)'
    };
    return map[type] || type;
};

const getGoogleDocsViewerUrl = () => {
    // Google Docs Viewer for Word documents
    return `https://docs.google.com/viewer?url=${encodeURIComponent(props.fileUrl)}&embedded=true`;
};
</script>
