// protectEdFrontend\src\router\authenticatedPages\facilitator_classrooms.js
export const FacilitatorClassrooms = [

    {
        path: '',
        name: 'classroom.dashboard',
        component: () => import('@/views/facilitator/ClassroomDashboard.vue'),
        meta: { title: 'Manage Classroom' },
    },
    {
        path: 'home',
        name: 'classroom.manage.home',
        component: () => import('@/views/classroom/ClassroomHome.vue')
    },
    {
        path: 'students',
        name: 'classroom.students',
        component: () => import('@/views/facilitator/StudentManagement.vue')
    },
    {
        path: 'settings',
        name: 'classroom.settings',
        component: () => import('@/views/facilitator/StudentManagement.vue')
    },
    {
        path: 'analytics',
        name: 'classroom.analytics',
        component: () => import('@/views/facilitator/ClassroomAnalytics.vue')
    },
    {
        path: 'leaderboard',
        name: 'classroom.leaderboard',
        component: () => import('@/views/facilitator/Leaderboard.vue')
    },
    {
        path: 'channel/:channelId',
        name: 'classroom.manage.channel',
        component: () => import('@/views/facilitator/ChannelManagement.vue'),
        props: true
    }

]