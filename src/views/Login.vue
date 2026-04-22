<template>
  <v-container class="text-center">
    <v-row justify="center" align="center" style="min-height: 80vh">
      <v-col cols="12" sm="10" md="8" lg="6" xl="4">
        <!-- LOGO -->
        <v-img :src="logo" class="my-6" height="120" contain />

        <!-- CARD -->
        <v-card class="pa-6" elevation="4" rounded="lg">
          <v-card-title class="text-h5 text-center text-primary">Iniciar Sesión</v-card-title>

          <v-card-text>
            <v-form ref="form" v-model="valid" @submit.prevent="login">
              <!-- EMAIL -->
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                type="email"
                required
                variant="outlined"
                prepend-inner-icon="mdi-email"
                class="mb-4"
              />

              <!-- PASSWORD -->
              <v-text-field
                v-model="password"
                :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="showPassword ? 'text' : 'password'"
                label="Contraseña"
                hint="Ingresar al menos 4 caracteres."
                counter
                variant="outlined"
                prepend-inner-icon="mdi-lock"
                class="mb-2"
                @click:append-inner="togglePassword"
              />

              <!-- BUTTON -->
              <v-btn
                :disabled="!valid"
                color="primary"
                type="submit"
                size="large"
                block
                class="mt-4"
              >
                <v-icon icon="mdi-login" class="mr-2" />
                Ingresar
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'
  import logo from '../assets/logo.svg'

  // state
  const valid = ref(false)
  const showPassword = ref(false)
  const email = ref('')
  const password = ref('')

  // rules
  const rules = {
    required: value => !!value || 'Requerido.',
    min: v => v?.length >= 4 || 'Mínimo 4 caracteres'
  }

  const emailRules = [
    v => !!v || 'E-mail es requerido',
    v => /.+@.+/.test(v) || 'E-mail debe ser válido'
  ]

  // methods
  const togglePassword = () => {
    showPassword.value = !showPassword.value
  }

  const login = () => {
    // Placeholder: conectar con API de autenticación
  }
</script>
