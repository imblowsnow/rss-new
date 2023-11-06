import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path:'/',
        name: "home",
        children: [
            {
                path:'/',
                name: "home",
                component: () => import('../views/rss-view.vue'),
            },
            {
                path:'/rss-add',
                name: "rss-add",
                component: () => import('../views/rss-add.vue'),
            },
            {
                path:'/rss-sub-manage',
                name: "rss-sub-manage",
                component: () => import('../views/rss-sub-manage.vue'),
            },
            {
                path:'/rss-reader',
                name: "rss-reader",
                component: () => import('../views/rss-reader.vue'),
            },
            {
                path:'/setting',
                name: "setting",
                component: () => import('../views/setting.vue'),
            },
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
