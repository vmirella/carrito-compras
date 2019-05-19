import Vue from "vue";
import Vuex from "vuex";
import './plugins/vuetify'
import App from "./App.vue";
import router from './router/router.js';

Vue.config.productionTip = false;
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    title: 'Hola',
    products: []
  }
});


new Vue({
  router,
  store: store,
  render: h => h(App)
}).$mount("#app");
