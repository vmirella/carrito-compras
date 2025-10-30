<template>
  <v-container class="text-center">
    <v-row justify="center" align="center" style="min-height: 80vh;">
      <v-col cols="12" sm="10" md="8" lg="6" xl="4">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-6"
          contain
          height="120"
        ></v-img>

        <v-card class="pa-6" elevation="4" rounded="lg">
          <v-card-title class="text-h5 justify-center primary--text">
            Iniciar Sesión
          </v-card-title>

          <v-card-text>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              @submit.prevent="login"
            >
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                type="email"
                required
                outlined
                prepend-inner-icon="mdi-email"
                class="mb-4"
              ></v-text-field>

              <v-text-field
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                label="Contraseña"
                hint="Ingresar al menos 4 caracteres."
                counter
                @click:append="show1 = !show1"
                outlined
                prepend-inner-icon="mdi-lock"
                class="mb-2"
              ></v-text-field>

              <v-btn
                :disabled="!valid"
                color="primary"
                type="submit"
                large
                block
                class="mt-4"
              >
                <v-icon left>mdi-login</v-icon>
                Ingresar
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      show1: false,
      password: "",
      rules: {
        required: value => !!value || "Requiredo.",
        min: v => v.length >= 4 || "Min 4 characters",
        emailMatch: () => "El correo o la contraseña no son correctos."
      },
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  methods: {
    login() {}
  }
};
</script>
