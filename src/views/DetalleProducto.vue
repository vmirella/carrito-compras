<template>
  <v-main class="grey lighten-1">
    <v-container class="white my-3 rounded">
      <v-row>
        <v-col
          cols="12"
          sm="10"
          md="6"
          lg="4"
          class="d-flex justify-sm-start justify-md-start justify-lg-start my-0"
        >
          <v-btn
            color="primary light"
            class="white--text "
            elevation="2"
            small
            outlined
            @click="$router.go(-1)"
          >
            <v-icon left dark>mdi-chevron-left</v-icon>

            Volver
          </v-btn>
        </v-col>
      </v-row>
      <v-row justify="center" align="start" class="mt-0">
        <v-col cols="12" sm="10" md="6" lg="5">
          <v-img
            v-if="product.imagen !== undefined"
            :src="`https://josetello.com/cart/${product.imagen}`"
            aspect-ratio="1"
            cover
          >
          </v-img>
        </v-col>

        <v-col cols="12" sm="10" md="6" lg="5">
          <v-container fluid>
            <h5 class="overflow-x-hidden text-capitalize gray--text text-h5">
              {{ product.nombre }}
            </h5>

            <div class="pt-2">
              <h6 class="text-h6 accent--text">
                Precio: S/. {{ product.precio }}
              </h6>
            </div>

            <div class="pt-2">
              <p class="text-body-1">
                Todas las tallas disponibles<br />
                Enviamos a todo el Perú<br />
                Haz tu pedido ahora
              </p>
            </div>

            <v-row>
              <v-col class="v-flex align-content-center py-0" cols="12"
                ><p class="mb-0">Talla</p></v-col
              >

              <v-col class="d-flex" cols="12" sm="6">
                <v-select
                  v-model="size"
                  :items="setSizes(product.id_categoria)"
                  label="Elije tu talla"
                  solo
                  outlined
                ></v-select>
              </v-col>
            </v-row>

            <v-row class="mt-0">
              <v-col class="v-flex align-content-center py-0" cols="12"
                ><p class="mb-0">Cantidad</p></v-col
              >

              <v-col class="d-flex" cols="12" sm="6">
                <v-text-field
                  v-model="quantity"
                  min="1"
                  max="10"
                  label="First Name"
                  type="number"
                  solo
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>

            <v-btn
              large
              color="primary"
              class="white--text"
              block
              @click="add(product.nombre, product.precio, product.imagen)"
            >
              <v-icon left dark>add_shopping_cart</v-icon>
              Añadir al carrito
            </v-btn>
          </v-container>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-text class="pt-6">
          <v-row justify="center">
            <v-col cols="12" class="text-center">
              <v-icon size="80" color="success">check_circle</v-icon>
              <h3 class="text-h6 mt-4">
                Su producto ha sido agregado al carrito.
              </h3>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="pb-4 px-2">
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="dialog = false">
            Seguir comprando
          </v-btn>
          <v-btn color="success" to="/cart" class="white--text">
            Ir al carrito
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-main>
</template>

<script>
import { getProducts } from "@/services/apiService";

export default {
  name: "Products",
  data() {
    return {
      product: [],
      size: "",
      quantity: 1,
      dialog: false
    };
  },
  mounted() {
    this.getProduct();
  },
  methods: {
    setSizes(idCategoria) {
      if (idCategoria !== 3) {
        this.size = "XS";
        return ["XS", "S", "M", "L", "XL"];
      } else {
        this.size = "6";
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
