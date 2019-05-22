<template>
  <v-content grid-list-md text-xs-center grey lighten-1 class="grey lighten-1 mt-4">
    <v-layout row wrap justify-center>
      <v-flex xs12 sm12 md10 lg8>
        <v-data-table
          :headers="headers"
          :items="cart"
          class="elevation-1"
          hide-actions
          disable-initial-sort
        >
          <template v-slot:items="props">
            <td class="text-xs-center">
              <v-img
                :src="`https://pruebas.co.pe/carrito/${props.item.image}`"
                width="100%"
                max-width="80px"
              >
                <v-container
                  fill-height
                  fluid
                  pa-2
                >
                </v-container>
              </v-img>
            </td>
            <td class="text-xs-center">{{ props.item.name }}</td>
            <td class="text-xs-center">{{ props.item.size }}</td>
            <td class="text-xs-center">{{ props.item.price }}</td>
            <td class="text-xs-center">{{ props.item.quantity }}</td>
            <td class="text-xs-center">{{ parseFloat(props.item.quantity * props.item.price).toFixed(2) }}</td>
          </template>
          <template v-slot:footer>
            <td :colspan="headers.length" class="text-xs-right">
              <h2><strong>Total: S/. {{ parseFloat(countCart).toFixed(2) }}</strong></h2>
            </td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
    
  </v-content>
  
</template>

<script>
export default {
  data () {
    return {
      headers: [
        { text: 'Producto', align: 'center', value: 'image', sortable:false },
        { text: 'Nombre', align: 'center', value: 'name', sortable:false },  
        { text: 'Talla', align: 'center', value: 'size', sortable:false },      
        { text: 'Precio Unitario', align: 'center', value: 'price', sortable:false },
        { text: 'Cantidad', align: 'center', value: 'quantity', sortable:false },
        { text: 'Subtotal', align: 'center', value: '', sortable:false },
        
      ],
      cart: []
    }
  },
  computed: {
    countCart: function () {
      return this.$store.state.total
    }
  },
  mounted() {
    this.cart = this.$store.state.cart
  }
}
</script>
