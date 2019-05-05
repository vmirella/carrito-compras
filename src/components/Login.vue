<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap justify-center border>

      <v-flex xs12>
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="100"
        ></v-img>
      </v-flex>

      <v-flex xs12 sm12 mb8 lg6>

        <v-card class="pa-3">
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>

            <v-text-field
              v-model="password"
              :append-icon="show1 ? 'visibility' : 'visibility_off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Contraseña"
              hint="Ingresar al menos 4 caracteres."
              counter
              @click:append="show1 = !show1"
            ></v-text-field>

            <v-btn
              :disabled="!valid"
              color="success"
              @click="login"
            >
              Ingresar
            </v-btn>

          </v-form>
        </v-card>
        
      </v-flex>

      
      
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
    return {
      show1: false,
      password: '',
      rules: {
        required: value => !!value || 'Requiredo.',
        min: v => v.length >= 4 || 'Min 4 characters',
        emailMatch: () => ('El correo o la contraseña no son correctos.')
      }
    }
  }
  }
</script>

<style>

</style>
