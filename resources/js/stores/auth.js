import axios from "axios";
import router from "../router";
import { defineStore } from "pinia";

export default defineStore("auth", {
    state: () => ({
        userLoggedIn: false,
        checked: false,
    }),
    getters: {
        isAuthenticated: (state) => !!state.userLoggedIn,
        isGuest: (state) => !state.userLoggedIn,
    },
    actions: {
        async fetchUser(refresh = false) {
            if (this.checked && !refresh) {
                return this.userLoggedIn;
            }

            try {
                await axios.get("/api/user").then((res) => {
                    this.userLoggedIn = true;
                });
            } catch {
                this.userLoggedIn = false;
            } finally {
                this.checked = true;
            }

            return this.userLoggedIn;
        },
        async register(payload) {
            await axios.get("/sanctum/csrf-cookie");
            await axios.post("/register", payload);
            await this.fetchUser(true);
        },
        async authorize(payload) {
            await axios.get("/sanctum/csrf-cookie");
            await axios.post("/login", payload);
            await this.fetchUser(true);
        },
        async logout() {
            await axios.post("/logout").then((res) => {
                this.checked = false;
                this.userLoggedIn = false;
                router.push({ name: "user.login" });
            });
        },
    },
});
