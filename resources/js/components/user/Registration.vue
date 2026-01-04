<template>
    <div>
        <h1>Registration</h1>
        <div class="d-flex flex-column gap-2 w-25">
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
import axios from "axios";

export default {
    name: "Registration",
    data() {
        return {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
        };
    },
    methods: {
        store() {
            axios.get("/sanctum/csrf-cookie").then((response) => {
                axios
                    .post("/register", {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        password_confirmation: this.password_confirmation,
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
