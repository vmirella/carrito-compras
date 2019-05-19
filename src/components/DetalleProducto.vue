<template>
  <v-content grid-list-md text-xs-center class="grey lighten-1">
    <v-layout row wrap justify-center style="padding-top:100px">
      <v-flex xs12 sm4>
        <div class="grey darken-2 mr-3">
          <v-img src="http://republica1821.com/images/2018/04/I-WANT-YOU-FOR-INCA-ARMY.png" aspect-ratio="1"></v-img>
        </div>
      </v-flex>  
      <v-flex xs12 sm4>
        <div class="grey darken-2" style="padding: 32px; color: white;">
          <div class="grey darken-1 pt-2 pb-2 pl-4 title" style="text-aling: center;">
            <h3>Inca Army</h3>
          </div>
          <div class="pt-4 subheading"> 
            <h3>Precio: S/. 59</h3>
          </div>
          <div class="pt-4 subheading">
            <h3>Talla</h3>
            <v-flex xs12 sm6 d-flex>              
              <v-select
                v-model="value"
                :items="tallas"                
                label="Elije tu talla"
                solo
              ></v-select>
            </v-flex>
                </div>
          <div class="pt-4 subheading">
            <h3>Cantidad</h3>
            <v-flex xs12 sm6 md3>
            <v-text-field
                placeholder=""
                type="number"
                value="1"
                min="1"
                max="10"
                solo
              ></v-text-field>
            </v-flex>
          </div>

          <v-btn
            color="deep-orange accent-4"
            class="white--text"
            @click="loader = 'loading3'"
          >
            Añadir {{ number }}
            <v-icon right dark>add_shopping_cart</v-icon>
          </v-btn>
        </div>      
      </v-flex>
    </v-layout>
  </v-content>
  
</template>

<script>

import axios from "axios";
import { mapState } from 'vuex';

export default {
  name: 'Products',
  computed: {
    ...mapState([
      'title',
      'number'
    ])
  },
  data () {
    return {
      products: [],
      value: 'M',
      tallas: ['XS', 'S', 'M', 'L', 'XL']
    }
  },
  mounted() {
    let params = {
      type: 'detail'
    }
    axios({ method: "GET", "url": "http://pruebas.co.pe/carrito/productos.php", params }).then(result => {
        this.products = result.data;
        console.log(result.data)
    }, error => {
        console.error(error);
    });
  },
}
</script>

<style>
  
</style>

