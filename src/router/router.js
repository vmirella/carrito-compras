import Vue from "vue";
import Router from "vue-router";
import Products from "../components/Products.vue";
import Login from "../components/Login.vue";
import Home from "../components/Home.vue";

Vue.use(Router)

const router = new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home,
        },
        {
            path: "/login",
            name: "Login",
            component: Login,
        },
        {
            path: "/products",
            name: "Products",
            component: Products,
        },
    ]
});

export default router;