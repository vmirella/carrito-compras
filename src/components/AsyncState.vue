<template>
  <v-container fluid>
    <v-row v-if="loading" class="py-8" justify="center">
      <v-progress-circular indeterminate color="primary" />
    </v-row>

    <v-row v-else-if="error" class="py-8" justify="center">
      <v-col cols="12" md="8" class="text-center">
        <v-icon icon="mdi-alert-circle-outline" size="48" color="error" class="mb-3" />
        <p class="text-body-1 mb-4">{{ errorMessage }}</p>
        <v-btn v-if="retryLabel" color="primary" @click="$emit('retry')">
          {{ retryLabel }}
        </v-btn>
      </v-col>
    </v-row>

    <slot v-else />
  </v-container>
</template>

<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    loading: { type: Boolean, default: false },
    error: { type: [Error, Object, String], default: null },
    retryLabel: { type: String, default: 'Reintentar' }
  })

  defineEmits(['retry'])

  const errorMessage = computed(() => {
    if (typeof props.error === 'string') return props.error
    return props.error?.message || 'No fue posible cargar la información.'
  })
</script>
