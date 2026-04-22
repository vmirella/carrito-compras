<template>
  <v-footer class="bg-surface d-flex justify-center footer">
    <v-sheet>
      Desarrollado por:
      <a
        href="https://virginiacontreras.vercel.app/"
        target="_blank"
        class="font-weight-bold text-secondary text-subtitle-2 text-no-wrap"
      >
        Virginia Contreras Villafuerte
      </a>
      - {{ new Date().getFullYear() }}
    </v-sheet>
  </v-footer>
</template>

<style>
  .footer {
    max-height: fit-content;
  }
</style>
