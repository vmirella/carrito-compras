<template>
  <!-- <v-card class="grey darken-3"> -->
  <v-content
    grid-list-md
    justify-center
    class="mt-5 mb-5"
    style="width: 100%; max-width: 1268px; margin: 0 auto"
  >
    <v-layout row wrap justify-center>
      <v-flex
        v-for="product in products"
        :key="product.nombre"
        xs12
        sm12
        md3
        class="pa-3"
      >
        <v-card>
          <router-link
            :to="{
              path: '/detailproducts',
              query: { product: product.nombre }
            }"
          >
            <v-img
              :src="`https://josetello.com/cart/${product.imagen}`"
              height="400px"
            >
              <v-container fill-height fluid pa-2> </v-container>
            </v-img>
          </router-link>

          <v-card-title primary-title>
            <div>
              <router-link
                :to="{
                  path: '/detailproducts',
                  query: { product: product.nombre }
                }"
                ><h3 class="headline mb-0">
                  {{ product.nombre }}
                </h3></router-link
              >
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-content>
  <!-- </v-card> -->
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
