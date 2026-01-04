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

// router.beforeEach((to, from, next) => {
//     const token = localStorage.getItem("access_token");

//     if (to.meta.requiresAuth && !token) {
//         next({ name: "user.login" });
//         return;
//     }

//     if (to.meta.guestOnly && token) {
//         next({ name: "main.index" });
//         return;
//     }

//     next();
// });

export default router;
