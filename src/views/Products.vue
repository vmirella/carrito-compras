<template>
  <v-main>
    <v-container fluid>
      <v-row>
        <v-col
          v-for="product in products"
          :key="product.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          class="pa-2"
        >
          <v-card
            class="h-100 d-flex flex-column"
            :to="{
              path: '/detailproducts',
              query: { product: product.nombre }
            }"
          >
            <!-- IMAGE -->
            <v-img :src="`https://josetello.com/cart/${product.imagen}`" aspect-ratio="1" cover>
              <template #placeholder>
                <v-row class="fill-height align-center justify-center">
                  <v-progress-circular indeterminate />
                </v-row>
              </template>
            </v-img>

            <!-- INFO -->
            <v-card-title class="text-center py-2">
              <div class="text-capitalize text-subtitle-1 text-truncate">
                {{ product.nombre }}
              </div>
            </v-card-title>

            <!-- PRECIO -->
            <v-card-text class="text-center py-0">
              <div class="text-body-1 font-weight-medium">S/. {{ product.precio }}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { getProducts as fetchProductsApi } from '@/services/apiService'

  // router
  const route = useRoute()

  // state
  const products = ref([])

  // obtener params
  const getCategoryParams = () => {
    if (route.query.category !== undefined) {
      return { category: route.query.category }
    }
    return {}
  }

  // fetch
  const getProducts = async params => {
    products.value = await fetchProductsApi(params)
  }
  const fetchProducts = () => {
    let params = ''
    if (route.query) {
      params = route.query
    } else {
      params = getCategoryParams()
    }
    getProducts(params)
  }

  onMounted(() => {
    fetchProducts()
  })
</script>
