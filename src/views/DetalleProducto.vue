<template>
  <v-main class="lighten-1">
    <v-container class="py-4">
      <!-- BOTÓN VOLVER -->
      <v-row class="mb-2">
        <v-col cols="12">
          <v-btn variant="outlined" size="small" color="primary" @click="router.go(-1)">
            <v-icon icon="mdi-chevron-left" class="mr-1" />
            Volver
          </v-btn>
        </v-col>
      </v-row>

      <!-- CARD -->
      <v-card>
        <v-row class="pa-4" align="center">
          <!-- IMAGEN -->
          <v-col cols="12" md="6" lg="5">
            <v-img
              v-if="product?.imagen"
              :src="`https://josetello.com/cart/${product.imagen}`"
              aspect-ratio="1"
              cover
              class="rounded-lg"
            />
          </v-col>

          <!-- INFO -->
          <v-col cols="12" md="6" lg="5">
            <div class="d-flex flex-column ga-3">
              <!-- NOMBRE -->
              <div class="text-h5 text-capitalize">
                {{ product?.nombre }}
              </div>

              <!-- PRECIO -->
              <div class="text-h6 text-primary">S/. {{ product?.precio }}</div>

              <!-- DESCRIPCIÓN -->
              <p class="text-medium-emphasis">
                Todas las tallas disponibles
                <br />
                Enviamos a todo el Perú
                <br />
                Haz tu pedido ahora
              </p>

              <!-- TALLA -->
              <div>
                <div class="text-subtitle-2 mb-1">Talla</div>

                <v-select
                  v-model="size"
                  :items="sizes"
                  label="Elige tu talla"
                  variant="outlined"
                  density="comfortable"
                />
              </div>

              <!-- CANTIDAD -->
              <div>
                <div class="text-subtitle-2 mb-1">Cantidad</div>

                <v-text-field
                  v-model="quantity"
                  type="number"
                  min="1"
                  max="10"
                  variant="outlined"
                  density="comfortable"
                />
              </div>

              <!-- BOTÓN -->
              <v-btn size="large" color="primary" block class="mt-2" @click="add">
                <v-icon icon="mdi-cart" class="mr-2" />
                Añadir al carrito
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-container>

    <!-- DIALOG -->
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-text class="text-center">
          <v-icon icon="mdi-check-circle" size="80" color="success" />
          <h3 class="text-h6 mt-4">Su producto ha sido agregado al carrito.</h3>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="dialog = false">Seguir comprando</v-btn>
          <v-btn color="success" to="/cart">Ir al carrito</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-main>
</template>

<script setup>
  import { ref, onMounted, computed, watch } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { useCartStore } from '@/stores/cart'
  import { getProducts } from '@/services/apiService'

  // router
  const router = useRouter()
  const route = useRoute()

  // store (Pinia)
  const store = useCartStore()

  // state
  const product = ref(null)
  const size = ref('')
  const quantity = ref(1)
  const dialog = ref(false)

  // computed sizes (sin efectos en computed)
  const sizes = computed(() => {
    if (!product.value) return []
    if (product.value.id_categoria !== 3) {
      return ['XS', 'S', 'M', 'L', 'XL']
    }
    return ['6', '8', '10', '12', '13']
  })

  watch(
    () => product.value,
    p => {
      if (!p) return
      size.value = p.id_categoria !== 3 ? 'XS' : '6'
    },
    { immediate: true }
  )

  // methods
  const add = () => {
    store.addCart({
      id: product.value.id,
      name: product.value.nombre,
      price: product.value.precio,
      image: product.value.imagen,
      size: size.value,
      quantity: quantity.value
    })

    dialog.value = true
  }

  const getProduct = async () => {
    const raw = route.query.product
    const productName = Array.isArray(raw) ? raw[0] : raw

    if (!productName) {
      product.value = null
      return
    }

    const params = {
      type: 'detail',
      nombre: productName
    }

    const response = await getProducts(params)
    product.value = response?.[0] ?? null
  }
  onMounted(() => {
    getProduct()
  })
</script>
