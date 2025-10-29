import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi"
  },
  theme: {
    themes: {
      light: {
        primary: "#D84315", // tono más suave del original
        secondary: "#5D4037", // marrón grisáceo para equilibrio
        accent: "#FF8A65", // naranja pastel para resaltar botones o íconos
        error: "#E64A19", // cálido pero controlado
        info: "#1976D2", // azul equilibrado
        success: "#388E3C", // verde profundo profesional
        warning: "#F9A825", // amarillo cálido
        background: "#FFF8F5", // blanco con leve tinte cálido
        text: "#2E2E2E"
      }
    }
  }
});
