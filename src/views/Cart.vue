<template>
  <v-main class="grey lighten-1 mt-3 text-center px-2">
    <v-data-table
      :headers="headers"
      :items="cart"
      class="elevation-1"
      hide-default-footer
      disable-sort
      hide-default-header
      :mobile-breakpoint="0"
      :no-data-text="noDataMessage"
    >
      <template v-slot:no-data>
        <div class="pa-6">
          <v-icon size="64" color="grey lighten-1" class="mb-4"
            >mdi-cart-off</v-icon
          >
          <div class="text-h6 grey--text text--darken-1">
            No hay productos en el carrito
          </div>
          <v-btn color="primary" class="mt-4" to="/products">
            <v-icon left>mdi-shopping</v-icon>
            Ir a comprar
          </v-btn>
        </div>
      </template>

      <template v-slot:item.image="{ item }">
        <v-img
          :src="`https://josetello.com/cart/${item.image}`"
          max-width="80px"
          max-height="80px"
          class="mx-auto"
          contain
        >
        </v-img>
      </template>

      <template v-slot:item.name="{ item }">
        <p class="text-capitalize ma-0">{{ item.name }}</p>
      </template>

      \
      <template v-slot:footer>
        <v-divider></v-divider>
        <div class="text-right pa-4">
          <h2 class="text-h6 ma-0">
            <strong>Total: S/. {{ parseFloat(countCart).toFixed(2) }}</strong>
          </h2>
        </div>
      </template>
    </v-data-table>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: "Producto", align: "center", value: "image", sortable: false },
        { text: "Nombre", align: "center", value: "name", sortable: false },
        { text: "Talla", align: "center", value: "size", sortable: false },
        {
          text: "Precio Unitario",
          align: "center",
          value: "price",
          sortable: false
        },
        {
          text: "Cantidad",
          align: "center",
          value: "quantity",
          sortable: false
        },
        { text: "Subtotal", align: "center", value: "", sortable: false }
      ],
      cart: []
    };
  },
  computed: {
    countCart: function() {
      return this.$store.state.total;
    },
    noDataMessage() {
      return this.cart.length === 0
        ? "No hay productos en el carrito"
        : "Cargando...";
    }
  },
  mounted() {
    this.cart = this.$store.state.cart;
  },
  watch: {
    "$store.state.cart": {
      handler(newCart) {
        this.cart = newCart;
      },
      deep: true
    }
  }
};
</script>

<style scoped>
.v-data-table {
  width: 100%;
}

::v-deep .v-data-table td {
  min-width: 80px;
  padding: 8px 4px;
}

::v-deep .v-data-table th {
  padding: 12px 4px;
  background-color: #f5f5f5;
}

/* Mejorar la visualización en mobile */
@media (max-width: 768px) {
  ::v-deep .v-data-table {
    font-size: 0.875rem;
  }

  ::v-deep .v-data-table td,
  ::v-deep .v-data-table th {
    padding: 6px 2px;
  }
}
</style>
