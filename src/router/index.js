// src/router/index.js
import { createRouter, createWebHistory } from "vue-router"
import { useAuthStore } from "@stores/auth"

import publicRoutes from "@router/modules/public"
import authenticatedRoutes from "@/router/modules/authenticated"

import { roleGuard } from "./guards/roleGuard"
// import { permissionGuard } from "./guards/permissionGuard"

const routes = [
    ...publicRoutes,
    ...authenticatedRoutes,
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () => import("@views/NotFound.vue"),
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) return savedPosition
        if (to.hash) return { el: to.hash, behavior: "smooth" }
        return { top: 0 }
    },
})

/**
 * AUTH + GUEST GUARD
 * - restores session once
 * - handles login/signup redirects
 */
router.beforeEach(async (to, from, next) => {
    const auth = useAuthStore()

    const requiresAuth = to.matched.some(r => r.meta.requiresAuth)

    // Restore session once
    if (!auth.user && !auth.isLoading) {
        try {
            await auth.restoreSession()
        } catch (err) {
            console.error("[router] Failed to restore session:", err)
            auth.user = null
        }
    }

    const isAuthenticated = !!auth.user

    // Needs authentication
    if (requiresAuth && !isAuthenticated) {
        return next({
            name: "login",
            query: { redirect: to.fullPath },
        })
    }

    // Logged-in user visiting auth pages
    if (
        (to.name === "login" || to.name === "signup") &&
        isAuthenticated
    ) {
        const userRole = authStore.user?.role;

        // Redirect to appropriate dashboard based on role
        const redirectMap = {
            'admin': { name: 'admin.dashboard' },
            'educator': { name: 'facilitator.dashboard' },
            'moderator': { name: 'facilitator.dashboard' },
            'player': { name: 'dashboard' }
        };

        // return next({ name: "user.dashboard" })
        return next(redirectMap[userRole] || { name: 'home' });
    }

    next()
})

/**
 * ROLE-BASED GUARD
 * (unchanged, reused as-is)
 */
router.beforeEach(roleGuard)

/**
 * ORG PERMISSION GUARD
 * (member/admin/permission per org)
 */
// router.beforeEach(permissionGuard)

// Optional global error handler
router.onError(error => {
    console.error("Router error:", error)
})

export default router
