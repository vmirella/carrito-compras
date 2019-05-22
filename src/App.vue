<template>
  <v-app>
    <v-toolbar app class="grey darken-3">
      <v-toolbar-title class="headline text-uppercase">
        <router-link to="/" style="color:#DD2C00; font-weight: 700">marca perú</router-link>
        <!-- <span style="color:#DD2C00; font-weight: 700">marca perú</span> -->
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <router-link to="/" class="body-2 font-weight-bold white--text v-btn v-btn--flat theme--light" flat>INICIO</router-link>
        <router-link to="/products" class="body-2 font-weight-bold white--text v-btn v-btn--flat theme--light" flat>PRODUCTOS</router-link>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn              
              flat
              v-on="on"
            >
              <span class="body-2 font-weight-bold white--text">CATEGORIAS </span>    
              <v-icon class="body-2 font-weight-bold white--text">arrow_drop_down</v-icon>          
            </v-btn>
          </template>
          <v-list>
            <v-list-tile
              v-for="(item, index) in categories"
              :key="index"
            >
              <v-list-tile-title>
                <router-link :to="{ path: '/products', query: { category: item.nombre }}">{{item.nombre}}</router-link>
              </v-list-tile-title>
              <!-- <v-list-tile-title>{{ item.nombre }}</v-list-tile-title> -->
            </v-list-tile>
          </v-list>
        </v-menu>
        
        <router-link to="/cart" class="body-2 font-weight-bold white--text v-btn v-btn--flat theme--light" flat> 
          <v-badge right>
            <template v-slot:badge>
              <span v-if="countCart > 0">{{ countCart }}</span>
            </template>
            <v-icon
              large
              color="grey lighten-1"
            >
              shopping_cart
            </v-icon>
          </v-badge>
        </router-link>
        

      </v-toolbar-items>
      
    </v-toolbar>

    <router-view class="main-container" :key="$route.fullPath"></router-view>

    <v-footer
      dark
      fixed
      height="auto"
    >
      <v-flex
        secondary
        lighten-2
        py-3
        text-xs-center
        white--text
        xs12
      >
        Desarrollado por: <a href="httpss://vmirella.github.io/" target="_blank" class="font-weight-bold white--text">Virginia Contreras Villafuerte</a> - 2019
      </v-flex>
     </v-footer>
  </v-app>
  
</template>

<script>
import axios from "axios";

export default {
  name: 'App',
  data () {
    return {
      categories: []
    }
  },
  computed: {
    countCart: function () {
      return this.$store.state.count
    }
  },
  mounted() {
    axios({ method: "GET", "url": "https://pruebas.co.pe/carrito/categorias.php" }).then(result => {
        this.categories = result.data;
        console.log(result.data)
    }, error => {
        console.error(error);
    });
  }

}
</script>

<style>
  a {
    text-decoration: none;
  }

  .main-container {
    padding-top: 64px !important;
    padding-bottom: 53px !important;
  }
</style>

