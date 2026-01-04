import axios from "axios";
import useAuthStore from "@/stores/auth";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        component: () => import("./components/main/Index.vue"),
        name: "main.index",
    },
    {
        path: "/furniture",
        component: () => import("./components/furniture/Index.vue"),
        name: "furniture.index",
        meta: { requiresAuth: true },
    },
    {
        path: "/login",
        component: () => import("./components/user/Login.vue"),
        name: "user.login",
        meta: { guestOnly: true },
    },
    {
        path: "/registration",
        component: () => import("./components/user/Registration.vue"),
        name: "user.registration",
        meta: { guestOnly: true },
    },
    {
        path: "/:pathMatch(.*)*",
        component: () => import("./components/main/Index.vue"),
        name: "404",
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const auth = useAuthStore();
    const requiresAuth = to.meta.requiresAuth;
    const guestOnly = to.meta.guestOnly;

    if (!requiresAuth && !guestOnly) {
        return next();
    }

    if (auth.isGuest && requiresAuth) {
        return next("/login");
    }

    if (auth.isAuthenticated && guestOnly) {
        return next("/");
    }

    return next();
});

export default router;
