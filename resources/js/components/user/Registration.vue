<template>
    <div>
        <h1>Registration</h1>
        <div class="d-flex flex-column gap-2 w-25">
            <template v-for="type in this.errors">
                <template v-for="error in type">
                    <p class="text-danger mb-0">{{ error }}</p>
                </template>
            </template>
            <input v-model="name" type="text" class="form-control" placeholder="Username" />
            <input v-model="email" type="email" class="form-control" placeholder="Email" />
            <input v-model="password" type="password" class="form-control" placeholder="Password" />
            <input
                v-model="password_confirmation"
                type="password"
                class="form-control"
                placeholder="Confirm password"
            />
            <button
                class="btn btn-primary"
                :disabled="
                    this.name === '' || this.email === '' || this.password === '' || this.password_confirmation === ''
                "
                @click.prevent="store"
            >
                Sign up
            </button>
        </div>
    </div>
</template>

<script>
import axios, { AxiosError } from "axios";
import { mapActions } from "pinia";
import useAuthStore from "@/stores/auth";

export default {
    name: "Registration",
    data() {
        return {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            errors: null,
        };
    },
    methods: {
        ...mapActions(useAuthStore, ["register"]),
        async store() {
            try {
                await this.register({
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.password_confirmation,
                });

                this.$router.push({ name: "main.index" });
            } catch (error) {
                this.errors = error.response?.data?.errors ?? null;
            }
        },
    },
};
</script>

<style lang="scss" scoped></style>
