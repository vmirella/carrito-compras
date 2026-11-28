<template>
  <v-main>
    <v-container fluid>
      <v-expansion-panels class="d-md-none mb-3">
        <v-expansion-panel>
          <v-expansion-panel-title>
            <v-icon icon="mdi-tune" class="mr-2" />
            Filtros y orden
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="minPrice"
                  label="Precio mínimo"
                  type="number"
                  min="0"
                  variant="outlined"
                  clearable
                  hide-details
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="maxPrice"
                  label="Precio máximo"
                  type="number"
                  min="0"
                  variant="outlined"
                  clearable
                  hide-details
                />
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="sort"
                  :items="sortItems"
                  label="Ordenar por"
                  variant="outlined"
                  hide-details
                />
              </v-col>
            </v-row>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-row class="d-none d-md-flex mb-2">
        <v-col cols="6" md="3">
          <v-text-field
            v-model="minPrice"
            label="Precio mínimo"
            type="number"
            min="0"
            variant="outlined"
            clearable
            hide-details
          />
        </v-col>
        <v-col cols="6" md="3">
          <v-text-field
            v-model="maxPrice"
            label="Precio máximo"
            type="number"
            min="0"
            variant="outlined"
            clearable
            hide-details
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            v-model="sort"
            :items="sortItems"
            label="Ordenar por"
            variant="outlined"
            hide-details
          />
        </v-col>
      </v-row>

      <div class="d-flex align-center justify-space-between mb-2">
        <span class="text-body-2 text-medium-emphasis">
          {{ products.length }} {{ products.length === 1 ? 'resultado' : 'resultados' }}
        </span>
        <v-btn
          v-if="hasActiveFilters"
          variant="text"
          color="primary"
          size="small"
          @click="clearFilters"
        >
          Limpiar filtros
        </v-btn>
      </div>
    </v-container>

    <AsyncState
      :loading="productsRequest.isLoading.value"
      :error="productsRequest.error.value"
      @retry="fetchProducts"
    >
      <v-container fluid v-if="hasProducts">
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
              <v-img :src="getAssetUrl(product.imagen)" aspect-ratio="1" cover>
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
      <v-container fluid v-else class="fill-height">
        <v-row class="fill-height" align="center" justify="center">
          <v-col cols="12" md="8" lg="6" class="text-center">
            <v-icon size="64" class="mb-4" color="grey-darken-1">mdi-ghost-off</v-icon>
            <p class="text-h5 text-grey-darken-1 mb-0">
              Lo sentimos, no encontramos resultados para "{{ nameProductSearch }}"
            </p>
          </v-col>
        </v-row>
      </v-container>
    </AsyncState>
  </v-main>
</template>

<script setup>
  import { onMounted, computed, ref, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import { getAssetUrl, getProducts as fetchProductsApi } from '@/services/apiService'
  import { useAsyncData } from '@/composables/useAsyncData'
  import { filterAndSortProducts } from '@/utils/catalogFilters'
  import AsyncState from '@/components/AsyncState.vue'

  // router
  const route = useRoute()

  // state
  const productsRequest = useAsyncData(fetchProductsApi)
  const responseProducts = computed(() => productsRequest.data.value || [])
  const search = ref(typeof route.query.nombre === 'string' ? route.query.nombre : '')
  const minPrice = ref(null)
  const maxPrice = ref(null)
  const sort = ref('default')
  const sortItems = [
    { title: 'Predeterminado', value: 'default' },
    { title: 'Nombre A-Z', value: 'name-asc' },
    { title: 'Precio: menor a mayor', value: 'price-asc' },
    { title: 'Precio: mayor a menor', value: 'price-desc' }
  ]

  const products = computed(() =>
    filterAndSortProducts(responseProducts.value, {
      search: search.value,
      minPrice: minPrice.value,
      maxPrice: maxPrice.value,
      sort: sort.value
    })
  )

  const productSearch = computed(() => {
    return Object.keys(route.query).length > 0 ? route.query : getCategoryParams()
  })

  const nameProductSearch = computed(() => {
    const values = Object.values(productSearch.value)
    return values[0] ?? ''
  })

  const hasProducts = computed(() => products.value.length > 0)
  const hasActiveFilters = computed(() =>
    Boolean(minPrice.value !== null || maxPrice.value !== null || sort.value !== 'default')
  )

  const clearFilters = () => {
    minPrice.value = null
    maxPrice.value = null
    sort.value = 'default'
  }

  watch(
    () => route.query.nombre,
    value => {
      search.value = typeof value === 'string' ? value : ''
    }
  )

  // obtener params
  const getCategoryParams = () => {
    if (route.query.category !== undefined) {
      return { category: route.query.category }
    }
    return {}
  }

  const fetchProducts = () => productsRequest.execute(productSearch.value)

  watch(
    () => [route.query.category, route.query.nombre],
    ([category, nombre], [previousCategory, previousNombre]) => {
      if (category !== previousCategory || nombre !== previousNombre) fetchProducts()
    }
  )

  onMounted(() => {
    fetchProducts()
  })
</script>
