import Vue from "vue";
import Router from "vue-router";
import DetalleProducto from "../components/DetalleProducto.vue";
import Products from "../components/Products.vue";
import Login from "../components/Login.vue";
import Home from "../components/Home.vue";
import Cart from "../components/Cart.vue";

Vue.use(Router)

const router = new Router({
    mode: "history",
    base: '/carrito-compras/',
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
        {
            path: "/detailproducts",
            name: "DetalleProducto",
            component: DetalleProducto,
        },
        {
            path: "/cart",
            name: "Cart",
            component: Cart,
        },
        
    ]
});

export default router;