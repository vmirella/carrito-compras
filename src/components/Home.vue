<template>
  <v-content class="grey lighten-1">
    <v-carousel height="700" class="mb-3">
      <v-carousel-item
        v-for="slide in slider"
        :key="slide.orden"
        :src="`https://pruebas.co.pe/carrito/${slide.imagen}`"
      ></v-carousel-item>
    </v-carousel>

  <v-layout justify-center>
    <v-flex xs12 sm12 md12 lg8>
      <v-card class="grey darken-2">
        <h2 class="pt-4 pb-4" style="font-weight: 300; font-size: 26px; color: white; text-align: center; color: white;">NUESTRAS CATEGORÍAS</h2>
        <v-container fluid grid-list-md class="pt-1">
          <v-layout row wrap>
            <v-flex
              v-for="category in categories"
              :key="category.nombre"
              xs12 sm12 md4
            >
              <v-card>
                <router-link :to="{ path: '/products', query: { category: category.nombre }}">
                  <v-img
                    :src="`https://pruebas.co.pe/carrito/${category.imagen}`"
                    width="100%"
                  >
                    <v-container
                      fill-height
                      fluid
                      pa-2
                    >
                    </v-container>
                  </v-img>
                </router-link>

                <v-card-title primary-title>
                  <div>                    
                    <router-link :to="{ path: '/products', query: { category: category.nombre }}"><h3 class="headline mb-0">{{category.nombre}}</h3></router-link>
                  </div>
                </v-card-title>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>

      <!-- NUEVOS PRODUCTOS -->
      <v-card class="grey darken-2">
      <h2 class="pt-4 pb-4" style="font-weight: 300; font-size: 26px; text-align: center; color: white;">NUEVOS PRODUCTOS</h2>
      <v-container fluid grid-list-md class="pt-1">
        <v-layout row wrap>
          <v-flex
            v-for="product in products"
            :key="product.nombre"
            xs12 sm12 md3
          >
            <v-card>
              <router-link :to="{ path: '/detailproducts', query: { product: product.nombre }}">
                <v-img
                  :src="`https://pruebas.co.pe/carrito/${product.imagen}`"
                  width="100%"
                >
                  <v-container
                    fill-height
                    fluid
                    pa-2
                  >
                  </v-container>
                </v-img>
              </router-link>
              <v-card-title primary-title>
                <div>
                  <router-link :to="{ path: '/detailproducts', query: { product: product.nombre }}"><h3 class="headline mb-0">{{product.nombre}}</h3></router-link>
                  <h3 class="grey--text">S/. {{product.precio}}</h3>
                </div>
              </v-card-title>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    </v-flex>
  </v-layout>
</v-content>
</template>

<script>

import axios from "axios";

export default {
  name: 'Products',
  data () {
    return {
      categories: [],
      slider: [],
      products: [],
    }
  },
  mounted() {
    axios({ method: "GET", "url": "https://pruebas.co.pe/carrito/categorias.php" }).then(result => {
        this.categories = result.data;
        console.log(result.data)
    }, error => {
        console.error(error);
    });

    axios({ method: "GET", "url": "https://pruebas.co.pe/carrito/slider.php" }).then(result => {
        this.slider = result.data;
        console.log(result.data)
    }, error => {
        console.error(error);
    });

    let params = {
      type: 'home'
    }

    axios({ method: "GET", "url": "https://pruebas.co.pe/carrito/productos.php", params }).then(result => {
        this.products = result.data;
        console.log(result.data)
    }, error => {
        console.error(error);
    });
  },
}
</script>