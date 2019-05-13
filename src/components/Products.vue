<template>
  <v-flex xs12 sm8>
    <!-- <v-card class="grey darken-3"> -->
      <h2 class="pt-2" style="font-weight: 300; font-size: 26px; color: white; text-align: center; color: white;">NUESTRAS CATEGORÍAS</h2>
      <v-container fluid grid-list-md class="pt-1">
        <v-layout row wrap>
          <v-flex
            v-for="product in products"
            :key="product.nombre"
            v-bind="{ [`xs4`]: true }"
          >
            <v-card>
              <v-img
                :src="`http://pruebas.co.pe/carrito/${product.imagen}`"
                height="400px"
              >
                <v-container
                  fill-height
                  fluid
                  pa-2
                >
                </v-container>
              </v-img>

              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">{{product.nombre}}</h3>
                </div>
              </v-card-title>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    <!-- </v-card> -->
  </v-flex>
</template>

<script>

import axios from "axios";

export default {
  name: 'Products',
  data () {
    return {
      //
      products: [],
    }
  },
  mounted() {
    axios({ method: "GET", "url": "http://pruebas.co.pe/carrito/productos.php" }).then(result => {
        this.products = result.data;
        console.log(result.data)
    }, error => {
        console.error(error);
    });
  },
}
</script>