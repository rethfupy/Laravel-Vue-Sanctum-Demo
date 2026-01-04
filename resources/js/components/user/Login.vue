<template>
    <div>
        <h1>Login</h1>
        <div class="d-flex flex-column gap-2 mt-2 w-25">
            <template v-for="type in this.errors">
                <template v-for="error in type">
                    <p class="text-danger mb-0">{{ error }}</p>
                </template>
            </template>
            <input v-model="email" type="email" class="form-control" placeholder="Enter email" />
            <input v-model="password" type="password" class="form-control" placeholder="Enter password" />
            <button
                @click.prevent="login"
                class="btn btn-primary"
                :disabled="this.email === '' && this.password === ''"
            >
                Sign in
            </button>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "pinia";
import useAuthStore from "@/stores/auth";

export default {
    name: "Login",
    data() {
        return {
            email: "",
            password: "",
            errors: null,
        };
    },
    methods: {
        ...mapActions(useAuthStore, ["fetchUser"]),
        async login() {
            try {
                await axios.get("/sanctum/csrf-cookie");

                await axios.post("/login", {
                    email: this.email,
                    password: this.password,
                });

                await this.fetchUser(true);

                this.$router.push({ name: "main.index" });
            } catch (error) {
                this.errors = error.response?.data?.errors ?? null;
            }
        },
    },
};
</script>

<style lang="scss" scoped></style>
