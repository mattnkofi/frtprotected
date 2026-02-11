// src/router/modules/authenticated.js
import AdminDashboardLayout from '@/layouts/AdminDashboardLayout.vue';
import FacilitatorDashboardLayout from '@/layouts/FacilitatorDashboardLayout.vue';
import UserDashboardLayout from '@/layouts/UserDashboardLayout.vue';

import { learnerPages } from '../authenticatedPages/learner_pages';
import { facilitatorPages } from '../authenticatedPages/facilitator_pages';
import { adminPages } from '../authenticatedPages/admin_pages';


const authenticatedRoutes = [
    {
        path: '/dashboard',
        component: UserDashboardLayout,
        meta: { requiresAuth: true, requiresRole: ['player'] },
        children: learnerPages
    },

    // ===== Facilitator Routes =====
    {
        path: '/facilitator',
        component: FacilitatorDashboardLayout,
        meta: { requiresAuth: true, requiresRole: ['educator', 'moderator'] },
        children: facilitatorPages
    },


    // ===== Admin Routes =====
    {
        path: '/admin',
        component: AdminDashboardLayout,
        meta: { requiresAuth: true, requiresRole: ['admin'] },
        children: adminPages       
    }
]

export default authenticatedRoutes