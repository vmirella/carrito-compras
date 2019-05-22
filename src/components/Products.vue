<template>
  <!-- <v-card class="grey darken-3"> -->
    <v-content grid-list-md justify-center class="mt-5 mb-5" style="width: 100%; max-width: 1268px; margin: 0 auto">
      <v-layout row wrap justify-center>
        <v-flex
          v-for="product in products"
          :key="product.nombre"
          xs12 sm12 md3
          class="pa-3"
        >
          <v-card>
            <router-link :to="{ path: '/detailproducts', query: { product: product.nombre }}">
              <v-img
                :src="`https://pruebas.co.pe/carrito/${product.imagen}`"
                height="400px"
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
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-content>
  <!-- </v-card> -->
</template>

<script>

import axios from "axios";
import { cpus } from 'os';

export default {
  name: 'Products',
  data () {
    return {
      products: []
    }
  },
  mounted() {

    let category = ''

    //si categorias existe en el url
    if(this.$route.query.category != undefined){
      category = this.$route.query.category
    }

    let params = {
      category: category
    }
    
    axios({ method: "GET", "url": "https://pruebas.co.pe/carrito/productos.php", params }).then(result => {
        this.products = result.data;
        console.log(result.data)
    }, error => {
        console.error(error);
    });
  }
}
</script>