<template>
  <v-app>
    <v-toolbar app class="grey darken-3">
      <v-toolbar-title class="headline text-uppercase">
        <span style="color:#DD2C00; font-weight: 700">marca perú</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <router-link to="/">Inicio</router-link>
      <router-link to="/login">Ingresar</router-link>

      <v-btn
        flat
        href="#"
        color="deep-orange accent-4"
      >
        <span class="mr-2">ver carrito</span>
      </v-btn>
    </v-toolbar>

    <router-view></router-view>
  </v-app>
</template>

<script>


export default {
  name: 'App',
  data () {
    return {
      
      //
    }
  }
}
</script>
