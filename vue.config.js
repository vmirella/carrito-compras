module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/carrito-compras/" : "/",
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    resolve: {
      alias: {
        vue$: "vue/dist/vue.esm.js"
      }
    }
  }
};
