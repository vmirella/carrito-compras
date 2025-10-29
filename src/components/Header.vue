<template>
  <div>
    <v-app-bar app color="grey darken-3" dark elevate-on-scroll flat>
      <!-- Marca -->
      <v-toolbar-title class="text-h5  font-weight-black primary--text">
        <v-icon large dark color="primary">mdi-flag</v-icon>

        <router-link to="/" class=" text-decoration-none">
          Marca Perú
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- Menú principal - Desktop -->
      <div class="d-none d-sm-flex align-center">
        <!-- INICIO -->
        <router-link to="/" class="nav-link">
          Inicio
        </router-link>

        <!-- PRODUCTOS -->
        <router-link to="/products" class="nav-link">
          Productos
        </router-link>

        <!-- CATEGORÍAS -->
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              text
              v-bind="attrs"
              v-on="on"
              class="nav-link d-flex align-center"
            >
              <span>Categorías</span>
              <v-icon small color="white" class="ml-1">mdi-chevron-down</v-icon>
            </v-btn>
          </template>

          <v-list dense>
            <v-list-item
              v-for="(item, index) in categories"
              :key="index"
              class="hoverable-item text-capitalize"
            >
              <v-list-item-content>
                <router-link
                  class="link-item"
                  :to="{ path: '/products', query: { category: item.nombre } }"
                >
                  {{ item.nombre }}
                </router-link>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>

        <!-- CARRITO - Desktop -->
        <router-link to="/cart" class="nav-link cart-link ml-6">
          <v-badge
            v-if="hasItems"
            :content="countCart.toString()"
            color="primary"
            overlap
          >
            <v-icon large color="grey lighten-1">mdi-cart-outline</v-icon>
          </v-badge>

          <v-icon v-else large color="grey lighten-1">
            mdi-cart-outline
          </v-icon>
        </router-link>
      </div>

      <!-- Menú mobile -->
      <div class="d-flex d-sm-none align-center">
        <!-- Carrito en mobile -->
        <router-link to="/cart" class="mobile-cart mr-3">
          <v-badge
            v-if="hasItems"
            :content="countCart.toString()"
            color="primary"
            overlap
          >
            <v-icon color="white">mdi-cart-outline</v-icon>
          </v-badge>

          <v-icon v-else color="white">
            mdi-cart-outline
          </v-icon>
        </router-link>

        <!-- Botón menú hamburguesa -->
        <v-btn icon @click="drawer = true" class="ml-2">
          <v-icon color="white">mdi-menu</v-icon>
        </v-btn>
      </div>
    </v-app-bar>

    <!-- Drawer para mobile - FUERA del v-app-bar -->
    <v-navigation-drawer v-model="drawer" temporary fixed right width="300">
      <v-list class="py-0">
        <!-- Header del drawer -->
        <v-list-item class="px-2 primary" dark>
          <v-list-item-avatar>
            <v-icon large dark>mdi-flag</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="text-h6 font-weight-black white--text">
              Marca Perú
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon dark @click="drawer = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>

        <!-- Enlaces del menú mobile -->
        <v-list-item @click="navigateTo('/')" class="mobile-nav-item">
          <v-list-item-icon>
            <v-icon color="primary">mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="font-weight-medium"
              >Inicio</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item @click="navigateTo('/products')" class="mobile-nav-item">
          <v-list-item-icon>
            <v-icon color="primary">mdi-package-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="font-weight-medium"
              >Productos</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <!-- Categorías en mobile -->
        <v-list-group prepend-icon="mdi-shape-outline" color="primary">
          <template v-slot:activator>
            <v-list-item-title class="font-weight-medium"
              >Categorías</v-list-item-title
            >
          </template>

          <v-list-item
            v-for="(item, index) in categories"
            :key="index"
            @click="navigateToCategory(item.nombre)"
            class="mobile-subitem"
          >
            <v-list-item-content>
              <v-list-item-title class="text-capitalize">
                {{ item.nombre }}
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon small>mdi-chevron-right</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>

        <v-divider></v-divider>

        <!-- Carrito en mobile dentro del drawer -->
        <v-list-item @click="navigateTo('/cart')" class="mobile-nav-item">
          <v-list-item-icon>
            <v-badge
              v-if="hasItems"
              :content="countCart.toString()"
              color="primary"
              dot
            >
              <v-icon color="primary">mdi-cart-outline</v-icon>
            </v-badge>
            <v-icon v-else color="primary">mdi-cart-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="font-weight-medium">
              Carrito
              <span v-if="hasItems" class="primary--text ml-2">
                ({{ countCart }})
              </span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "App",
  props: {
    countCart: {
      type: Number,
      default: 0
    },
    categories: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      drawer: false
    };
  },
  computed: {
    hasItems() {
      return this.countCart > 0;
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
      this.drawer = false;
    },
    navigateToCategory(categoryName) {
      this.$router.push({
        path: "/products",
        query: { category: categoryName }
      });
      this.drawer = false;
    }
  }
};
</script>

<style scoped>
/* 🔹 Enlaces del navbar */
.nav-link {
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  padding: 0 16px;
  text-decoration: none;
  transition: color 0.25s ease, transform 0.2s ease;
  display: flex;
  align-items: center;
  height: 64px;
}

.nav-link:hover {
  color: var(--v-primary-base);
  transform: translateY(-1px);
}

/* 🔹 Enlace del carrito */
.cart-link {
  padding: 0 8px !important;
}

/* 🔹 Carrito mobile */
.mobile-cart {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
}

/* 🔹 Dropdown de categorías */
.hoverable-item {
  border-radius: 8px;
  transition: background-color 0.25s ease;
}
.hoverable-item:hover {
  background-color: var(--v-primary-lighten5, #ffccbc);
}
.link-item {
  display: block;
  width: 100%;
  padding: 8px 16px;
  color: var(--v-text-base, #2e2e2e);
  text-decoration: none;
}
.link-item:hover {
  color: var(--v-primary-base, #d84315);
}

/* 🔹 Estilos para el menú mobile */
.mobile-nav-item {
  border-radius: 8px;
  margin: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.mobile-nav-item:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.mobile-subitem {
  border-radius: 6px;
  margin: 4px 8px;
  min-height: 40px;
}

.mobile-subitem:hover {
  background-color: rgba(0, 0, 0, 0.08);
}

/* 🔹 Quita subrayado global de router-links */
a {
  text-decoration: none;
  color: inherit;
}

/* 🔹 Mejora la visualización del badge */
.v-badge__badge {
  font-size: 10px;
  height: 18px;
  min-width: 18px;
  font-weight: bold;
}

/* 🔹 Estilo para el título de la marca */
.v-toolbar__title a {
  color: var(--v-primary-base) !important;
}
</style>
