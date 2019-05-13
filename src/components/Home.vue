<template>
  <v-content>
    <v-carousel height="700" class="mb-3">
      <v-carousel-item
        v-for="slide in slider"
        :key="slide.orden"
        :src="`http://pruebas.co.pe/carrito/${slide.imagen}`"
      ></v-carousel-item>
    </v-carousel>

  <v-layout justify-center>
    <v-flex xs12 sm8>
      <v-card class="grey darken-3">
        <h2 class="pt-2" style="font-weight: 300; font-size: 26px; color: white; text-align: center; color: white;">NUESTRAS CATEGORÍAS</h2>
        <v-container fluid grid-list-md class="pt-1">
          <v-layout row wrap>
            <v-flex
              v-for="category in categories"
              :key="category.nombre"
              v-bind="{ [`xs4`]: true }"
            >
              <v-card>
                <v-img
                  :src="`http://pruebas.co.pe/carrito/${category.imagen}`"
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
                    <router-link :to="{ path: '/products', query: { category: category.nombre }}"><h3 class="headline mb-0">{{category.nombre}}</h3></router-link>
                  </div>
                </v-card-title>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <!-- NUEVOS PRODUCTOS -->
      <v-card class="grey darken-3">
      <h2 class="pt-2" style="font-weight: 300; font-size: 26px; color: white; text-align: center; color: white;">NUEVOS PRODUCTOS</h2>
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
    </v-card>

    </v-flex>
  </v-layout>

  <!-- <v-flex xs12 sm8>
    <v-card class="grey darken-3">
      <h2 class="pt-2" style="font-weight: 300; font-size: 26px; color: white; text-align: center; color: white;">NUEVOS PRODUCTOS</h2>
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
    </v-card>
  </v-flex> -->

</v-content>
</template>

<script>

import axios from "axios";

export default {
  name: 'Products',
  data () {
    return {
      items: [
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
        }
      ],
      cards: [
        { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 3 },
        { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 3 },
        { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 3 },
        { title: 'Pre-fab homes2', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 3 },
      ],
      //
      categories: [],
      slider: [],
      products: [],
    }
  },
  mounted() {
    axios({ method: "GET", "url": "http://pruebas.co.pe/carrito/categorias.php" }).then(result => {
        this.categories = result.data;
        console.log(result.data)
    }, error => {
        console.error(error);
    });

    axios({ method: "GET", "url": "http://pruebas.co.pe/carrito/slider.php" }).then(result => {
        this.slider = result.data;
        console.log(result.data)
    }, error => {
        console.error(error);
    });

    let params = {
      type: 'home'
    }

    axios({ method: "GET", "url": "http://pruebas.co.pe/carrito/productos.php", params }).then(result => {
        this.products = result.data;
        console.log(result.data)
    }, error => {
        console.error(error);
    });
  },
}
</script>