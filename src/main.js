import Vue from "vue";
import Vuex from "vuex";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router/router.js";

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
  render: h => h(App)
}).$mount("#app");
