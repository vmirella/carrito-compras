<template>
  <v-content
    grid-list-md
    text-xs-center
    grey
    lighten-1
    class="grey lighten-1 mt-4"
  >
    <v-layout row wrap justify-center>
      <v-flex xs12>
        <v-btn color="blue-grey" class="white--text" @click="$router.go(-1)">
          Volver
          <v-icon right dark>keyboard_arrow_left</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>

    <v-layout row wrap justify-center>
      <v-flex xs12 sm12 md6 lg4>
        <div class="grey darken-2 mr-3">
          <v-img
            v-if="product.imagen !== undefined"
            :src="`https://josetello.com/cart/${product.imagen}`"
            aspect-ratio="1"
          ></v-img>
        </div>
      </v-flex>
      <v-flex xs12 sm12 md6 lg4>
        <div class="grey darken-2" style="padding: 32px; color: white">
          <div
            class="grey darken-1 pt-2 pb-2 pl-4 title"
            style="text-aling: center"
          >
            <h3>{{ product.nombre }}</h3>
          </div>
          <div class="pt-4 subheading">
            <h3>Precio: S/. {{ product.precio }}</h3>
          </div>
          <div class="pt-4 subheading">
            <p>
              Tallas disponibles desde la "S" a la "XL"<v-spacer
              ></v-spacer> Enviamos a todo el Perú<v-spacer></v-spacer>
              Haz tu pedido ahora
            </p>
          </div>
          <div class="pt-4 subheading">
            <h3>Talla</h3>
            <v-flex xs12 sm6 d-flex>
              <v-select
                v-model="size"
                :items="setSizes(product.id_categoria)"
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
                v-model="quantity"
                min="1"
                max="10"
                solo
              ></v-text-field>
            </v-flex>
          </div>

          <v-btn
            large
            color="deep-orange accent-4"
            class="white--text mt-4 mb-4"
            @click="add(product.nombre, product.precio, product.imagen)"
          >
            Añadir
            <v-icon right dark>add_shopping_cart</v-icon>
          </v-btn>
        </div>
      </v-flex>
    </v-layout>

    <v-dialog v-model="dialog" max-width="350">
      <v-card>
        <v-card-text>
          <v-content class="pt-0">
            <v-layout row wrap>
              <v-flex xs12 class="text-xs-center">
                <v-icon size="60" color="green darken-2">check_circle</v-icon>
                <h3>Su producto ha sido agregado al carrito.</h3>
              </v-flex>
            </v-layout>
          </v-content>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" flat="flat" @click="dialog = false">
            Seguir comprando
          </v-btn>

          <router-link
            to="/cart"
            class="body-2 font-weight-bold green darken-1 white--text v-btn v-btn--flat"
            flat
            >Ir al carrito</router-link
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-content>
</template>

<script>
import { getProducts } from "@/services/apiService";

export default {
  name: "Products",
  data() {
    return {
      product: [],
      size: "M",
      quantity: 1,
      tallas: [],
      dialog: false
    };
  },
  mounted() {
    this.getProduct();
    this.tallas = this.setSizes();
  },
  methods: {
    setSizes(idCategoria) {
      if (idCategoria !== 3) {
        return ["XS", "S", "M", "L", "XL"];
      } else {
        return ["6", "8", "10", "12", "13"];
      }
    },
    add: function(name, price, image) {
      this.$store.commit("addCart", {
        name: name,
        price: price,
        image: image,
        size: this.size,
        quantity: this.quantity
      });

      this.dialog = true;
    },
    async getProduct() {
      const params = {
        type: "detail",
        nombre: this.$route.query.product
      };
      const productResponse = await getProducts(params);
      this.product = productResponse[0];
    }
  }
};
</script>
