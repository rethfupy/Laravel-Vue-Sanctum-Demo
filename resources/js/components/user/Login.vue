<template>
    <div>
        <h1>Login</h1>
        <div class="d-flex flex-column gap-2 mt-2 w-25">
            <input
                v-model="email"
                type="email"
                class="form-control"
                placeholder="Enter email"
            />
            <input
                v-model="password"
                type="password"
                class="form-control"
                placeholder="Enter password"
            />
            <button @click.prevent="login" class="btn btn-primary">
                Sign in
            </button>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Login",
    data() {
        return {
            email: "",
            password: "",
        };
    },
    methods: {
        login() {
            axios.get("/sanctum/csrf-cookie").then((response) => {
                axios
                    .post("/login", {
                        email: this.email,
                        password: this.password,
                    })
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((error) => {
                        console.log(error.response);
                    });
            });
        },
    },
};
</script>

<style lang="scss" scoped></style>
