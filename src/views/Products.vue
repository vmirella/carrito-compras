<template>
  <v-main style="width: 100%; max-width: 1268px; margin: 0 auto">
    <v-container fluid>
      <v-row justify="center" dense>
        <v-col
          v-for="product in products"
          :key="product.nombre"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          class="pa-3"
        >
          <v-card class="h-100">
            <router-link
              :to="{
                path: '/detailproducts',
                query: { product: product.nombre }
              }"
            >
              <v-img
                :src="`https://josetello.com/cart/${product.imagen}`"
                height="250px"
              >
                <v-container fill-height fluid class="pa-2"> </v-container>
              </v-img>
            </router-link>

            <v-card-title class="d-block">
              <router-link
                :to="{
                  path: '/detailproducts',
                  query: { product: product.nombre }
                }"
                class="text-decoration-none"
              >
                <h3
                  class="subtitle-2 mb-0 text--secondary text-center text-capitalize"
                >
                  {{ product.nombre }}
                </h3>
                <h3 class="text-h6 grey--text text-center">
                  S/. {{ product.precio }}
                </h3>
              </router-link>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { getProducts } from "@/services/apiService";

export default {
  name: "Products",
  data() {
    return {
      products: []
    };
  },
  async mounted() {
    const params = this.getCategoryParams();
    this.products = await getProducts(params);
  },
  methods: {
    getCategoryParams() {
      if (this.$route.query.category != undefined) {
        return { category: this.$route.query.category };
      }
      return {};
    }
  }
};
</script>
