// src/router/guards/roleGuard.js

import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/utils/useToast'

/**
 * Navigation guard for role-based access control
 * Use this in your router configuration
 */
export const roleGuard = async (to, from, next) => {
    const authStore = useAuthStore()
    const toast = useToast()

    // Routes that require authentication
    if (to.meta.requiresAuth) {
        // Attempt session restore
        if (!authStore.isAuthenticated) {
            await authStore.restoreSession()
        }

        // Still not authenticated
        if (!authStore.isAuthenticated) {
            toast.warning('Please log in to access this page')
            return next({
                name: 'login',
                query: { redirect: to.fullPath }
            })
        }

        // Role-based access check
        if (to.meta.requiresRole) {
            const requiredRoles = Array.isArray(to.meta.requiresRole)
                ? to.meta.requiresRole
                : [to.meta.requiresRole]

            const userRole = authStore.user?.role

            if (!requiredRoles.includes(userRole)) {
                toast.error('You do not have permission to access this page')

                const redirectMap = {
                    admin: { name: 'admin.dashboard' },
                    educator: { name: 'facilitator.dashboard' },
                    moderator: { name: 'facilitator.dashboard' },
                    player: { name: 'dashboard' }
                }

                return next(redirectMap[userRole] || { name: 'home' })
            }
        }
    }

    // Guest-only routes (e.g., login, register)
    if (to.meta.guest && authStore.isAuthenticated) {
        const userRole = authStore.user?.role

        const redirectMap = {
            admin: { name: 'admin.dashboard' },
            educator: { name: 'facilitator.dashboard' },
            moderator: { name: 'facilitator.dashboard' },
            player: { name: 'dashboard' }
        }

        return next(redirectMap[userRole] || { name: 'home' })
    }

    // Update page title
    if (to.meta.title) {
        document.title = `${to.meta.title} | ProtectEd`
    }

    next()
}

/**
 * Helper function to redirect user to their appropriate dashboard
 */
export const redirectToDashboard = (userRole) => {
    const dashboardMap = {
        admin: '/admin/dashboard',
        educator: '/facilitator/dashboard',
        moderator: '/facilitator/dashboard',
        player: '/dashboard'
    }

    return dashboardMap[userRole] || '/'
}
