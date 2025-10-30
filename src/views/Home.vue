<template>
  <v-main class="grey lighten-1">
    <v-carousel height="300" class="mb-3">
      <v-carousel-item
        v-for="(slide, index) in slider"
        :key="index"
        :src="`https://josetello.com/cart/${slide.imagen}`"
        cover
      >
      </v-carousel-item>
    </v-carousel>

    <v-row justify="center" class="mx-2">
      <v-col cols="12" lg="8">
        <v-card class="grey darken-2 mb-4">
          <v-card-text class="text-center pt-4 pb-1">
            <h2 class="text-h4 font-weight-light white--text">
              Nuestras Categorías
            </h2>
          </v-card-text>

          <v-container fluid>
            <v-row dense>
              <v-col
                v-for="category in categories"
                :key="category.nombre"
                cols="12"
                sm="6"
                md="4"
              >
                <v-card class="h-100" hover>
                  <router-link
                    :to="{
                      path: '/products',
                      query: { category: category.nombre }
                    }"
                    class="text-decoration-none"
                  >
                    <v-img
                      :src="`https://josetello.com/cart/${category.imagen}`"
                      height="200"
                      cover
                    >
                      <v-container fill-height fluid class="pa-2">
                      </v-container>
                    </v-img>

                    <v-card-title class="d-block text-center">
                      <h3 class="text-h6 text--text text-capitalize">
                        {{ category.nombre }}
                      </h3>
                    </v-card-title>
                  </router-link>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>

        <v-card class="grey darken-2">
          <v-card-text class="text-center pt-4 pb-1">
            <h2 class="text-h4 font-weight-light white--text">
              Nuevos Productos
            </h2>
          </v-card-text>

          <v-container fluid>
            <v-row dense>
              <v-col
                v-for="product in products"
                :key="product.nombre"
                cols="12"
                sm="6"
                md="3"
              >
                <v-card class="h-100" hover>
                  <router-link
                    :to="{
                      path: '/detailproducts',
                      query: { product: product.nombre }
                    }"
                    class="text-decoration-none"
                  >
                    <v-img
                      :src="`https://josetello.com/cart/${product.imagen}`"
                      height="250"
                      cover
                    >
                    </v-img>

                    <v-card-title class="d-block">
                      <h3
                        class="text-h6 secondary--text mb-2 text-capitalize text-center"
                      >
                        {{ product.nombre }}
                      </h3>
                      <h3 class="text-h6 grey--text text-center">
                        S/. {{ product.precio }}
                      </h3>
                    </v-card-title>
                  </router-link>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import { getSlider, getCategories, getProducts } from "@/services/apiService";

export default {
  name: "Products",
  data() {
    return {
      categories: [],
      slider: [],
      products: []
    };
  },
  async mounted() {
    this.getCategories();
    this.getSlider();
    this.getNewProducts();
  },
  methods: {
    async getSlider() {
      this.slider = await getSlider();
    },
    async getCategories() {
      this.categories = await getCategories();
    },
    async getNewProducts() {
      const params = {
        type: "home"
      };
      this.products = await getProducts(params);
    }
  }
};
</script>
