const publicRoutes = [
    {
        path: "/",
        name: "home",
        component: () => import("@views/Landing.vue"),
    },

    // ===== Student Classroom Routes =====
    {
        path: "/classroom",
        name: "classroom.list",
        component: () => import("@views/classroom/ClassroomList.vue"),
    },

    {
        path: '/classroom/:id',
        component: () => import('@/views/classroom/Classroom.vue'),
        children: [
            {
                path: '',
                name: 'classroom.home',
                component: () => import('@/views/classroom/ClassroomHome.vue')
            },
            {
                path: 'channel/:channelId',
                name: 'classroom.channel',
                component: () => import('@/views/classroom/ClassroomChannel.vue'),
                props: true
            },
            {
                path: 'grades',
                name: 'classroom.grades',
                component: () => import('@/views/classroom/ClassroomGrade.vue')
            }
        ]
    },

    {
        path: "/classroom/analytics",
        name: "classroom.analytics",
        component: () => import("@views/classroom/ClassroomAnalytics.vue"),
    },

    // ===== Facilitator Classroom Management Routes =====
    // {
    //     path: "/facilitator/classrooms",
    //     name: "facilitator.classrooms",
    //     component: () => import("@views/facilitator/FacilitatorClassroomList.vue"),
    //     meta: { title: 'My Classrooms' }
    // },   

    // {
    //     path: "/facilitator/classroom/create",
    //     name: "classroom.create",
    //     component: () => import("@views/facilitator/CreateClassroom.vue"),
    //     meta: { title: 'Create Classroom' }
    // },

    // {
    //     path: '/facilitator/classroom/:id',
    //     component: () => import('@/views/facilitator/ClassroomDashboard.vue'),
    //     meta: { title: 'Manage Classroom' },
    //     children: [
    //         {
    //             path: '',
    //             name: 'classroom.dashboard',
    //             redirect: { name: 'classroom.manage.home' }
    //         },
            // {
            //     path: 'home',
            //     name: 'classroom.manage.home',
            //     component: () => import('@/views/classroom/ClassroomHome.vue')
            // },
            // {
            //     path: 'students',
            //     name: 'classroom.students',
            //     component: () => import('@/views/facilitator/StudentManagement.vue')
            // },
            // {
            //     path: 'grades',
            //     name: 'classroom.manage.grades',
            //     component: () => import('@/views/facilitator/GradesManagement.vue')
            // },
            // {
            //     path: 'analytics',
            //     name: 'classroom.manage.analytics',
            //     component: () => import('@/views/facilitator/ClassroomAnalytics.vue')
            // },
            // {
            //     path: 'leaderboard',
            //     name: 'classroom.leaderboard',
            //     component: () => import('@/views/facilitator/Leaderboard.vue')
            // },
            // {
            //     path: 'channel/:channelId',
            //     name: 'classroom.manage.channel',
            //     component: () => import('@/views/facilitator/ChannelManagement.vue'),
            //     props: true
            // }
    //     ]
    // },

    // ===== Account Routes =====
    {
        path: '/account',
        component: () => import("@layouts/BlankLayout.vue"),
        children: [
            { path: 'login', name: 'login', component: () => import('@views/auth/LoginNew.vue'), meta: { title: 'Login' }, alias: ['/login'] },
            { path: 'signup', name: 'signup', component: () => import('@views/auth/SignUpNew.vue'), meta: { title: 'Sign Up' }, alias: ['/signup'] },
            { path: 'forgot-password', name: 'forgotPassword', component: () => import('@views/auth/ForgotPassword.vue'), meta: { title: 'Forgot Password' }, alias: ['/forgot-password'] },
            { path: 'verify', name: 'verify-notice', component: () => import('@views/auth/VerifyNotice.vue'), meta: { guest: true } },
            { path: 'reset-password', name: 'resetPassword', component: () => import('@views/auth/ResetPassword.vue'), meta: { title: 'Reset Password' }, alias: ['/reset-password'] },
            {
                path: 'verify-email',
                name: 'verify-email',
                component: () => import('@views/auth/VerifyEmail.vue'),
                meta: { title: 'Verifying Email...' },
                alias: ['/verify-email']
            },
        ],
    },

    // ===== Facilitator Authentication Routes =====
    {
        path: '/facilitator',
        component: () => import("@layouts/BlankLayout.vue"),
        children: [
            {
                path: 'login',
                name: 'facilitator.login',
                component: () => import('@views/auth/FacilitatorLogin.vue'),
                meta: { title: 'Facilitator Login' },
                alias: ['/facilitator-login', '/educator/login']
            },
            {
                path: 'forgot-password',
                name: 'facilitator.forgotPassword',
                component: () => import('@views/auth/ForgotPassword.vue'),
                meta: { title: 'Facilitator - Forgot Password', isFacilitator: true }
            },
            {
                path: 'reset-password',
                name: 'facilitator.resetPassword',
                component: () => import('@views/auth/ResetPassword.vue'),
                meta: { title: 'Facilitator - Reset Password', isFacilitator: true }
            },
            {
                path: 'change-password',
                name: 'facilitator.changePassword',
                component: () => import('@views/auth/FacilitatorChangePassword.vue'),
                meta: { title: 'Set Your Password', requiresAuth: true, requiresRole: ['educator', 'moderator', 'admin'] }
            }
        ],
    },

    {
        path: '/oauth/callback',
        name: 'oauth.callback',
        component: () => import('@/views/auth/OAuthCallback.vue'),
        meta: { requiresAuth: false }
    },

    {
        path: '/auth/google/callback',
        name: 'auth.google.callback',
        component: () => import('@/views/auth/OAuthCallback.vue')
    }
]

export default publicRoutes