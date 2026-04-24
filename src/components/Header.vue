<template>
  <v-app-bar
    :elevation="isScrolled ? 6 : 0"
    :class="['transition-all', isHidden ? 'app-bar-hidden' : '']"
    color="surface"
    height="70"
    class="px-2 px-md-6"
    app
  >
    <!-- LOGO -->
    <RouterLink
      to="/"
      class="d-flex align-center text-decoration-none text-primary"
      style="min-width: 140px"
    >
      <v-icon icon="mdi-flag" size="24" class="mr-1" />
      <span class="text-subtitle-1 font-weight-bold">Marca Perú</span>
    </RouterLink>

    <!-- 🔥 SEPARADOR SOLO MOBILE -->
    <v-spacer class="d-md-none" />

    <!-- SEARCH (desktop) -->
    <div class="d-none d-md-flex flex-grow-1 px-4">
      <v-text-field
        v-model="search"
        placeholder="Buscar productos..."
        variant="solo-filled"
        hide-details
        prepend-inner-icon="mdi-magnify"
        @keyup.enter="handleSearch"
      />
    </div>

    <!-- NAV DESKTOP -->
    <div class="d-none d-md-flex align-center ga-2">
      <v-btn variant="text" to="/">Inicio</v-btn>
      <v-btn variant="text" to="/products">Productos</v-btn>

      <!-- CATEGORÍAS -->
      <v-menu>
        <template #activator="{ props }">
          <v-btn v-bind="props" variant="text">
            Categorías
            <v-icon icon="mdi-chevron-down" size="small" class="ml-1" />
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="item in categories"
            :key="item.id || item.nombre"
            :to="{ path: '/products', query: { category: item.nombre } }"
          >
            <v-list-item-title class="text-capitalize">
              {{ item.nombre }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- CARRITO -->
      <v-btn icon to="/cart" aria-label="Carrito">
        <v-badge
          :content="displayCount"
          :model-value="countCart > 0"
          color="primary"
          transition="scale-transition"
        >
          <v-icon icon="mdi-cart-outline" />
        </v-badge>
      </v-btn>

      <!-- THEME -->
      <v-btn icon @click="toggle" aria-label="Tema">
        <v-icon :icon="theme.theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'" />
      </v-btn>
    </div>

    <!-- MOBILE -->
    <div class="d-flex d-md-none align-center ga-1">
      <v-btn icon size="small" @click="searchDialog = true">
        <v-icon icon="mdi-magnify" />
      </v-btn>

      <v-btn icon size="small" to="/cart">
        <v-badge :content="displayCount" :model-value="countCart > 0" color="primary">
          <v-icon icon="mdi-cart-outline" />
        </v-badge>
      </v-btn>

      <v-btn icon size="small" @click="drawer = true">
        <v-icon icon="mdi-menu" />
      </v-btn>
    </div>
  </v-app-bar>

  <!-- SEARCH MOBILE -->
  <v-dialog v-model="searchDialog" width="90%">
    <v-card class="pa-4">
      <v-text-field
        v-model="search"
        placeholder="Buscar productos..."
        autofocus
        append-inner-icon="mdi-magnify"
        @keyup.enter="handleSearch"
      />
    </v-card>
  </v-dialog>

  <!-- DRAWER -->
  <v-navigation-drawer v-model="drawer" location="right" temporary width="300">
    <v-list>
      <v-list-item class="bg-primary text-white">
        <v-list-item-title class="font-weight-black">Menú</v-list-item-title>
      </v-list-item>

      <v-list-item to="/" @click="drawer = false">Inicio</v-list-item>
      <v-list-item to="/products" @click="drawer = false">Productos</v-list-item>

      <v-divider />

      <v-list-group value="categorias">
        <template #activator="{ props }">
          <v-list-item v-bind="props">Categorías</v-list-item>
        </template>

        <v-list-item
          v-for="item in categories"
          :key="item.id || item.nombre"
          :to="{ path: '/products', query: { category: item.nombre } }"
          @click="drawer = false"
        >
          {{ item.nombre }}
        </v-list-item>
      </v-list-group>

      <v-list-item @click="toggle">
        <template #prepend>
          <v-icon :icon="theme.theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'" />
        </template>

        <v-list-item-title>
          {{ theme.theme === 'light' ? 'Modo claro' : 'Modo oscuro' }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAppTheme } from '@/composables/useAppTheme'

  const props = defineProps({
    countCart: { type: Number, default: 0 },
    categories: { type: Array, default: () => [] }
  })

  const router = useRouter()
  const { theme, toggle } = useAppTheme()

  const drawer = ref(false)
  const searchDialog = ref(false)
  const search = ref('')

  // búsqueda
  const handleSearch = () => {
    router.push({
      path: '/products',
      query: { nombre: search.value }
    })
    searchDialog.value = false
  }

  // contador UI
  const displayCount = computed(() => (props.countCart > 99 ? '99+' : props.countCart))

  // scroll behavior
  const lastScroll = ref(0)
  const isHidden = ref(false)
  const isScrolled = ref(false)

  const handleScroll = () => {
    const current = window.scrollY

    isScrolled.value = current > 10
    isHidden.value = current > lastScroll.value && current > 100

    lastScroll.value = current
  }

  onMounted(() => window.addEventListener('scroll', handleScroll))
  onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
  .app-bar-hidden {
    transform: translateY(-100%);
  }

  .transition-all {
    transition: all 0.3s ease;
  }
</style>
