<template>
    <AuthShellSvg page-title="Set Your Password" :hero-image="hero" :artist="artist">
        <div class="w-full max-w-md mx-auto">
            <!-- Header Section -->
            <div class="mb-8 text-center sm:text-left">
                <div class="flex items-center gap-2 mb-3">
                    <svg class="w-8 h-8 text-azure-blue-600 dark:text-azure-blue-400" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <h1 class="text-3xl font-heading font-bold text-abyss-900 dark:text-platinum-50">
                        {{ isFirstLogin ? 'Create Your Password' : 'Change Password' }}
                    </h1>
                </div>
                <p class="text-platinum-600 dark:text-platinum-400">
                    {{ isFirstLogin
                        ? 'Welcome! Please create a secure password for your account.'
                        : 'Update your account password for enhanced security.'
                    }}
                </p>
            </div>

            <!-- Security Info Banner (First Login Only) -->
            <div v-if="isFirstLogin"
                class="mb-6 p-4 rounded-lg bg-azure-blue-50 dark:bg-azure-blue-900/20 border border-azure-blue-200 dark:border-azure-blue-800">
                <div class="flex gap-3">
                    <svg class="w-5 h-5 text-azure-blue-600 dark:text-azure-blue-400 flex-shrink-0 mt-0.5" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <div class="flex-1">
                        <h3 class="text-sm font-semibold text-azure-blue-900 dark:text-azure-blue-100 mb-1">
                            Security First
                        </h3>
                        <p class="text-xs text-azure-blue-700 dark:text-azure-blue-300">
                            Choose a strong password to protect student data and maintain platform security. We
                            recommend using a password manager.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Main Form Card -->
            <div class="bg-platinum-50 dark:bg-abyss-700 rounded-2xl shadow-xl p-8">
                <form @submit.prevent="handleSubmit" class="space-y-5">

                    <!-- Current Password (Only for regular password change) -->
                    <div v-if="!isFirstLogin" class="space-y-1.5">
                        <label for="current-password"
                            class="block text-sm font-medium text-abyss-900 dark:text-platinum-100">
                            Current Password
                        </label>
                        <input id="current-password" v-model="form.currentPassword" type="password"
                            placeholder="••••••••" required autocomplete="current-password" class="w-full px-4 py-3 rounded-lg border border-platinum-300 dark:border-abyss-400 
                                   bg-platinum-50 dark:bg-abyss-700/50 text-abyss-900 dark:text-platinum-50
                                   placeholder-platinum-400 dark:placeholder-platinum-500
                                   focus:outline-none focus:ring-2 focus:ring-azure-blue-500/50 focus:border-azure-blue-500
                                   transition-all duration-200"
                            :class="{ 'border-red-500 focus:ring-red-500/50 focus:border-red-500': errors.currentPassword }" />
                        <p v-if="errors.currentPassword" class="text-xs text-red-500 mt-1">{{ errors.currentPassword }}
                        </p>
                    </div>

                    <!-- New Password -->
                    <div class="space-y-1.5">
                        <label for="new-password"
                            class="block text-sm font-medium text-abyss-900 dark:text-platinum-100">
                            {{ isFirstLogin ? 'New Password' : 'New Password' }}
                        </label>
                        <input id="new-password" v-model="form.newPassword" type="password" placeholder="••••••••"
                            required autocomplete="new-password" @input="validatePassword" class="w-full px-4 py-3 rounded-lg border border-platinum-300 dark:border-abyss-400 
                                   bg-platinum-50 dark:bg-abyss-700/50 text-abyss-900 dark:text-platinum-50
                                   placeholder-platinum-400 dark:placeholder-platinum-500
                                   focus:outline-none focus:ring-2 focus:ring-azure-blue-500/50 focus:border-azure-blue-500
                                   transition-all duration-200"
                            :class="{ 'border-red-500 focus:ring-red-500/50 focus:border-red-500': errors.newPassword }" />
                        <p v-if="errors.newPassword" class="text-xs text-red-500 mt-1">{{ errors.newPassword }}</p>
                    </div>

                    <!-- Password Strength Indicator -->
                    <div v-if="form.newPassword" class="space-y-2">
                        <div class="flex items-center justify-between text-xs">
                            <span class="text-platinum-600 dark:text-platinum-400">Password Strength:</span>
                            <span :class="strengthColor" class="font-semibold">{{ strengthLabel }}</span>
                        </div>
                        <div class="w-full bg-platinum-200 dark:bg-abyss-600 rounded-full h-2">
                            <div :class="strengthColor" class="h-2 rounded-full transition-all duration-300"
                                :style="{ width: strengthWidth }"></div>
                        </div>

                        <!-- Password Requirements Checklist -->
                        <div class="mt-3 space-y-1">
                            <div class="flex items-center gap-2 text-xs"
                                :class="passwordChecks.length ? 'text-green-600 dark:text-green-400' : 'text-platinum-500'">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        :d="passwordChecks.length ? 'M5 13l4 4L19 7' : 'M6 18L18 6M6 6l12 12'" />
                                </svg>
                                <span>At least 8 characters</span>
                            </div>
                            <div class="flex items-center gap-2 text-xs"
                                :class="passwordChecks.uppercase ? 'text-green-600 dark:text-green-400' : 'text-platinum-500'">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        :d="passwordChecks.uppercase ? 'M5 13l4 4L19 7' : 'M6 18L18 6M6 6l12 12'" />
                                </svg>
                                <span>One uppercase letter</span>
                            </div>
                            <div class="flex items-center gap-2 text-xs"
                                :class="passwordChecks.number ? 'text-green-600 dark:text-green-400' : 'text-platinum-500'">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        :d="passwordChecks.number ? 'M5 13l4 4L19 7' : 'M6 18L18 6M6 6l12 12'" />
                                </svg>
                                <span>One number</span>
                            </div>
                        </div>
                    </div>

                    <!-- Confirm Password -->
                    <div class="space-y-1.5">
                        <label for="confirm-password"
                            class="block text-sm font-medium text-abyss-900 dark:text-platinum-100">
                            Confirm New Password
                        </label>
                        <input id="confirm-password" v-model="form.confirmPassword" type="password"
                            placeholder="••••••••" required autocomplete="new-password" class="w-full px-4 py-3 rounded-lg border border-platinum-300 dark:border-abyss-400 
                                   bg-platinum-50 dark:bg-abyss-700/50 text-abyss-900 dark:text-platinum-50
                                   placeholder-platinum-400 dark:placeholder-platinum-500
                                   focus:outline-none focus:ring-2 focus:ring-azure-blue-500/50 focus:border-azure-blue-500
                                   transition-all duration-200"
                            :class="{ 'border-red-500 focus:ring-red-500/50 focus:border-red-500': errors.confirmPassword }" />
                        <p v-if="errors.confirmPassword" class="text-xs text-red-500 mt-1">{{ errors.confirmPassword }}
                        </p>
                    </div>

                    <!-- Submit Button -->
                    <button type="submit" :disabled="isLoading || !isPasswordValid"
                        class="w-full py-3 px-4 bg-azure-blue-600 text-white font-semibold rounded-lg 
                               hover:bg-azure-blue-700 focus:ring-4 focus:ring-azure-blue-500/30
                               disabled:opacity-50 disabled:cursor-not-allowed
                               transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                        <span v-if="!isLoading">{{ isFirstLogin ? 'Create Password & Continue' : 'Update Password'
                            }}</span>
                        <span v-else class="flex items-center gap-2">
                            <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4" />
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Processing...
                        </span>
                    </button>
                </form>
            </div>
        </div>
    </AuthShellSvg>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useToast } from '@/utils/useToast';
import AuthShellSvg from "@components/ui/auth_animated_bg.vue";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const toast = useToast();

const isFirstLogin = computed(() => route.query.firstLogin === 'true');

const form = ref({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
});

const errors = ref({});
const isLoading = ref(false);
const hero = ref('/images/security-hero.svg');
const artist = ref({ name: 'Security Team', url: '#' });

// Password validation
const passwordChecks = computed(() => ({
    length: form.value.newPassword.length >= 8,
    uppercase: /[A-Z]/.test(form.value.newPassword),
    number: /[0-9]/.test(form.value.newPassword)
}));

const passwordStrength = computed(() => {
    const checks = Object.values(passwordChecks.value).filter(Boolean).length;
    if (checks === 0) return 0;
    if (checks === 1) return 1;
    if (checks === 2) return 2;
    return 3;
});

const strengthLabel = computed(() => {
    const labels = ['Weak', 'Fair', 'Good', 'Strong'];
    return labels[passwordStrength.value] || 'Weak';
});

const strengthColor = computed(() => {
    const colors = [
        'text-red-600 bg-red-500',
        'text-yellow-600 bg-yellow-500',
        'text-blue-600 bg-blue-500',
        'text-green-600 bg-green-500'
    ];
    return colors[passwordStrength.value] || colors[0];
});

const strengthWidth = computed(() => {
    const widths = ['25%', '50%', '75%', '100%'];
    return widths[passwordStrength.value] || '0%';
});

const isPasswordValid = computed(() => {
    return Object.values(passwordChecks.value).every(Boolean) &&
        form.value.newPassword === form.value.confirmPassword;
});

const validatePassword = () => {
    errors.value.newPassword = '';
    if (form.value.newPassword && form.value.newPassword.length < 8) {
        errors.value.newPassword = 'Password must be at least 8 characters';
    }
};

const handleSubmit = async () => {
    errors.value = {};

    // Validation
    if (!isFirstLogin.value && !form.value.currentPassword) {
        errors.value.currentPassword = 'Current password is required';
        return;
    }

    if (form.value.newPassword.length < 8) {
        errors.value.newPassword = 'Password must be at least 8 characters';
        return;
    }

    if (!Object.values(passwordChecks.value).every(Boolean)) {
        errors.value.newPassword = 'Password does not meet all requirements';
        return;
    }

    if (form.value.newPassword !== form.value.confirmPassword) {
        errors.value.confirmPassword = 'Passwords do not match';
        return;
    }

    isLoading.value = true;

    try {
        const payload = {
            password: form.value.newPassword,
            password_confirmation: form.value.confirmPassword
        };

        if (!isFirstLogin.value) {
            payload.current_password = form.value.currentPassword;
        }

        const result = await authStore.changePassword(payload);

        if (result.ok) {
            toast.success(isFirstLogin.value
                ? 'Password created successfully! Welcome to ProtectEd.'
                : 'Password updated successfully!'
            );

            // Redirect to dashboard
            router.push({ name: 'facilitator.dashboard' });
        }
    } catch (error) {
        toast.error(error.message || 'Failed to update password');
        if (error.message.includes('Current password')) {
            errors.value.currentPassword = error.message;
        } else {
            errors.value.newPassword = error.message;
        }
    } finally {
        isLoading.value = false;
    }
};
</script>

<style scoped>
/* Additional styling if needed */
</style>