<template>
  <v-main class="bg-grey-lighten-1 mt-3 text-center px-2">
    <v-data-table
      :items="cartStore.cart"
      :headers="headers"
      item-value="key"
      class="elevation-1"
      :no-data-text="noDataMessage"
      density="compact"
    >
      <!-- NO DATA -->
      <template #no-data>
        <div class="pa-6">
          <v-icon size="64" class="mb-4">mdi-cart-off</v-icon>

          <div class="text-h6 text-grey-darken-1">No hay productos en el carrito</div>

          <v-btn color="primary" class="mt-4" to="/products">
            <v-icon icon="mdi-shopping" class="mr-2" />
            Ir a comprar
          </v-btn>
        </div>
      </template>

      <!-- IMAGE -->
      <template #[`item.image`]="{ item }">
        <v-img :src="`https://josetello.com/cart/${item.image}`" max-width="80" class="mx-auto" />
      </template>

      <!-- NAME -->
      <template #[`item.name`]="{ item }">
        <p class="text-capitalize ma-0">
          {{ item.name }}
        </p>
      </template>

      <template #[`item.quantity`]="{ item }">
        <div class="d-flex align-center justify-center">
          <v-btn icon="mdi-minus" size="small" @click="cartStore.decreaseQty(item.key)" />

          <span class="mx-2">{{ item.quantity }}</span>

          <v-btn icon="mdi-plus" size="small" @click="cartStore.increaseQty(item.key)" />
        </div>
      </template>

      <template #[`item.subtotal`]="{ item }">
        S/. {{ (item.price * item.quantity).toFixed(2) }}
      </template>

      <template #[`item.actions`]="{ item }">
        <v-btn
          icon="mdi-delete"
          color="error"
          size="small"
          @click="cartStore.removeProduct(item.key)"
        />
      </template>

      <!-- FOOTER -->
      <template #bottom>
        <v-divider />
        <div class="text-right pa-4">
          <h2 class="text-h6 ma-0">
            <strong>Total: S/. {{ cartStore.total.toFixed(2) }}</strong>
          </h2>
        </div>
      </template>
    </v-data-table>
  </v-main>
</template>

<script setup>
  import { computed } from 'vue'
  import { useCartStore } from '@/stores/cart'

  const cartStore = useCartStore()
  const headers = [
    { title: 'Producto', key: 'image', align: 'center' },
    { title: 'Nombre', key: 'name', align: 'center' },
    { title: 'Talla', key: 'size', align: 'center' },
    { title: 'Precio', key: 'price', align: 'center' },
    { title: 'Cantidad', key: 'quantity', align: 'center' },
    { title: 'Subtotal', key: 'subtotal', align: 'center' },
    { title: 'Acciones', key: 'actions', align: 'center' }
  ]

  const noDataMessage = computed(() => {
    return cartStore?.cart.length === 0 ? 'No hay productos en el carrito' : 'Cargando...'
  })
</script>
