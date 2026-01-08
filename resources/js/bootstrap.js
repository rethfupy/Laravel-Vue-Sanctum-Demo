import "bootstrap";
import router from "./router";

import axios from "axios";
window.axios = axios;

window.axios.defaults.withCredentials = true;
window.axios.defaults.withXSRFToken = true;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

window.axios.interceptors.response.use({}, (error) => {
    if (
        (error.response.status === 401 || error.response.status === 419) &&
        router.currentRoute.value.meta.requiresAuth
    ) {
        router.push({ name: "user.login" });
    }

    return Promise.reject(error);
});
