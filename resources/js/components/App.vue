<template>
    <div>
        <nav class="d-flex direction-column gap-2 mb-2">
            <router-link :to="{ name: 'main.index' }">Home</router-link>
            <router-link :to="{ name: 'furniture.index' }">Furniture</router-link>
            <router-link :to="{ name: 'user.login' }">Login</router-link>
            <router-link :to="{ name: 'user.registration' }">Registration</router-link>
            <a href="#" @click.prevent="logout">Log out</a>
        </nav>

        <router-view />
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "App",
    methods: {
        logout() {
            axios.post("/logout").then((res) => {
                this.$router.push({ name: "user.login" });
            });
        },
    },
};
</script>

<style lang="scss" scoped></style>
