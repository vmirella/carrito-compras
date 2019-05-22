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
    routes: [
        {
            path: "/carrito-compras/",
            name: "Home",
            component: Home,
        },
        {
            path: "/carrito-compras/login",
            name: "Login",
            component: Login,
        },
        {
            path: "/carrito-compras/products",
            name: "Products",
            component: Products,
        },
        {
            path: "/carrito-compras/detailproducts",
            name: "DetalleProducto",
            component: DetalleProducto,
        },
        {
            path: "/carrito-compras/cart",
            name: "Cart",
            component: Cart,
        },
        
    ]
});

export default router;