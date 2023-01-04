import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';

import {useAuthStore} from '../stores/auth.store';

import Home from '../views/Home.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {layout: 'Main'},
    },
    {
        path: '/feed',
        name: 'yourFeed',
        component: () => import('../views/YourFeed.vue'),
        meta: {layout: 'Main', auth: true},
    },
    {
        path: '/tags/:slug?',
        name: 'tag',
        component: () => import('../views/TagFeed.vue'),
        meta: {layout: 'Main', auth: true},
        props: true,
    },
    {
        path: '/articles/new',
        name: 'createArticle',
        component: () => import('../views/CreateArticle.vue'),
        meta: {layout: 'Main', auth: true},
    },
    {
        path: '/articles/:slug',
        name: 'article',
        component: () => import('../views/Article.vue'),
        meta: {layout: 'Main', auth: true},
        props: true,
    },
    {
        path: '/articles/:slug/edit',
        name: 'editArticle',
        component: () => import('../views/EditArticle.vue'),
        meta: {layout: 'Main', auth: true},
        props: true,
    },
    {
        path: '/settings',
        name: 'settings',
        component: () => import('../views/Setting.vue'),
        meta: {layout: 'Main', auth: true},
    },
    {
        path: '/profile/:slug',
        name: 'userProfile',
        component: () => import('../views/UserProfile.vue'),
        meta: {layout: 'Main', auth: true},
        props: true,
    },
    {
        path: '/profile/:slug/favorites',
        name: 'userProfileFavorites',
        component: () => import('../views/UserProfile.vue'),
        meta: {layout: 'Main', auth: true},
        props: true,
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/Register.vue'),
        meta: {layout: 'Auth'},
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue'),
        meta: {layout: 'Auth'},
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
});

router.beforeEach(async (to, from) => {
    const auth = to.meta.auth;
    const store = useAuthStore();

    try {
        await store.getCurrentUserAuth();
    } catch (error) {
        if (auth) {
            return {
                name: 'login',
            };
        }
    }

    /*
    try {
        await store.getCurrentUserAuth();
    } catch (error) {
    } finally {
        if (auth && !store.getIsLoggedIn) {
            return {
                name: 'login',
            };
        }
    }
    */
});

export default router;
