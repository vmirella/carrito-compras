import Vue from "vue";
import Router from "vue-router";
import DetalleProducto from "@/views/DetalleProducto.vue";
import Products from "@/views/Products.vue";
import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";
import Cart from "@/views/Cart.vue";
// components
Vue.use(Router);

const router = new Router({
  mode: "history",
  base: "carrito-compras",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/products",
      name: "Products",
      component: Products
    },
    {
      path: "/detailproducts",
      name: "DetalleProducto",
      component: DetalleProducto
    },
    {
      path: "/cart",
      name: "Cart",
      component: Cart
    }
  ]
});

export default router;
