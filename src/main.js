import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import router from "./router/router.js";
import vuetify from "./plugins/vuetify";
import "@mdi/font/css/materialdesignicons.css";

Vue.config.productionTip = false;
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    cart: [],
    count: 0,
    total: 0
  },
  mutations: {
    addCart(state, product) {
      state.cart.push(product); //añadir producto al array cart
      state.count = state.cart.length; //actualizar el conteo de elementos en cart
      state.total += product.price * product.quantity;
    }
  }
});

new Vue({
  router,
  store: store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
