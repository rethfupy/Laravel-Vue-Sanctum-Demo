<template>
    <div>
        <nav class="d-flex direction-column gap-2 mb-2">
            <router-link :to="{ name: 'main.index' }">Home</router-link>
            <router-link v-if="auth.isAuthenticated" :to="{ name: 'furniture.index' }">Furniture</router-link>
            <router-link v-if="auth.isGuest" :to="{ name: 'user.login' }">Login</router-link>
            <router-link v-if="auth.isGuest" :to="{ name: 'user.registration' }">Registration</router-link>
            <a href="#" v-if="auth.isAuthenticated" @click.prevent="logout">Log out</a>
        </nav>

        <router-view />
    </div>
</template>

<script>
import { mapActions } from "pinia";
import useAuthStore from "@/stores/auth";

export default {
    name: "App",
    computed: {
        auth() {
            return useAuthStore();
        },
    },
    methods: {
        ...mapActions(useAuthStore, ["logout"]),
        ...mapActions(useAuthStore, ["fetchUser"]),
    },
    mounted() {
        this.fetchUser();
    },
};
</script>

<style lang="scss" scoped></style>
