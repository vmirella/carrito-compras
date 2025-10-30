<template>
  <v-app>
    <Header :categories="categories" :countCart="countCart" />
    <router-view :key="$route.fullPath"></router-view>
    <Footer />
  </v-app>
</template>

<script>
import { getCategories } from "@/services/apiService";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default {
  name: "App",
  components: {
    Header,
    Footer
  },
  data() {
    return {
      categories: []
    };
  },
  computed: {
    countCart: function() {
      return this.$store.state.count;
    }
  },
  mounted() {
    this.getCategories();
  },
  methods: {
    async getCategories() {
      this.categories = await getCategories();
    }
  }
};
</script>

<style>
a {
  text-decoration: none;
}
</style>
