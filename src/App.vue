<template>
  <v-app>
    <Header :categories="categories" :count-cart="countCart" />

    <RouterView :key="route.fullPath" class="bg-background" />

    <Footere />
  </v-app>
</template>

<script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { getCategories } from '@/services/apiService'
  import { useTheme } from 'vuetify'
  import { useThemeStore } from '@/stores/theme'
  import { useCartStore } from '@/stores/cart'
  import Header from '@/components/Header.vue'
  import Footere from '@/components/Footer.vue'

  // router
  const route = useRoute()

  // store (Pinia)
  const store = useCartStore()

  // state
  const categories = ref([])

  // computed
  const countCart = computed(() => {
    return store.count
  })

  // methods
  const fetchCategories = async () => {
    categories.value = await getCategories()
  }

  const themeStore = useThemeStore()
  const vuetifyTheme = useTheme()

  vuetifyTheme.global.name.value = themeStore.theme

  // lifecycle
  onMounted(() => {
    fetchCategories()
  })
</script>

<style>
  a {
    text-decoration: none;
  }
</style>
