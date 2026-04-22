<template>
  <v-main>
    <!-- CAROUSEL -->
    <v-carousel v-if="slider?.length" height="300" class="mb-4" show-arrows="hover" cycle>
      <v-carousel-item
        v-for="(slide, i) in slider"
        :key="i"
        :src="`https://josetello.com/cart/${slide.imagen}`"
        cover
      />
    </v-carousel>

    <v-row justify="center" class="mx-2">
      <v-col cols="12" lg="8">
        <!-- CATEGORÍAS -->
        <v-card-text class="text-center mt-5 pb-1">
          <h2 class="text-h5 font-weight-semi-bold text-main">Nuestras Categorías</h2>
        </v-card-text>

        <v-container fluid>
          <v-row dense>
            <v-col v-for="category in categories" :key="category.nombre" cols="12" sm="6" md="4">
              <v-card
                :to="{
                  path: '/products',
                  query: { category: category.nombre }
                }"
                class="h-100 transition-card"
                hover
                color="surface"
              >
                <v-img
                  :src="`https://josetello.com/cart/${category.imagen}`"
                  height="200"
                  cover
                  class="align-end justify-center"
                >
                  <v-card-title
                    class="text-capitalize text-subtitle"
                    :class="theme === 'light' ? 'gradient-light' : 'gradient-dark'"
                  >
                    {{ category.nombre }}
                  </v-card-title>
                </v-img>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <!-- PRODUCTOS -->
        <v-card-text class="text-center mt-5 pb-1">
          <h2 class="text-h5 font-weight-semi-bold text-main">Nuevos Productos</h2>
        </v-card-text>

        <v-container fluid class="mb-5">
          <v-row dense>
            <v-col v-for="product in products" :key="product.nombre" cols="12" sm="6" md="3">
              <v-card
                class="h-100 transition-card"
                color="surface"
                hover
                :to="{
                  path: '/detailproducts',
                  query: { product: product.nombre }
                }"
              >
                <v-img :src="`https://josetello.com/cart/${product.imagen}`" height="250" cover />

                <v-card-title class="text-center">
                  <!-- NOMBRE -->
                  <div class="text-capitalize text-subtitle-1">
                    {{ product.nombre }}
                  </div>
                </v-card-title>
                <!-- PRECIO -->
                <div class="mb-2 text-body-large text-center">S/. {{ product.precio }}</div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-main>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { getSlider, getCategories, getProducts } from '@/services/apiService'
  import { useAppTheme } from '@/composables/useAppTheme'
  // state
  const categories = ref([])
  const slider = ref([])
  const products = ref([])
  const { theme } = useAppTheme()
  // methods
  const fetchSlider = async () => {
    slider.value = await getSlider()
  }

  const fetchCategories = async () => {
    categories.value = await getCategories()
  }

  const fetchProducts = async () => {
    const params = { type: 'home' }
    products.value = await getProducts(params)
  }

  // lifecycle
  onMounted(() => {
    fetchSlider()
    fetchCategories()
    fetchProducts()
  })
</script>

<style scoped>
  .gradient-light {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1));
  }

  .gradient-dark {
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.15));
  }
</style>
