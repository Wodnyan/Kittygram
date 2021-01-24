<template>
  <v-form class="form" @submit.prevent="onSubmit">
    <v-text-field
      :error-messages="showError('username')"
      v-model="username"
      label="Username"
      required
    ></v-text-field>
    <v-text-field
      :error-messages="showError('fullName')"
      v-model="fullName"
      label="Full Name"
      required
    ></v-text-field>
    <v-text-field
      :error-messages="showError('email')"
      v-model="email"
      label="Email"
      required
    ></v-text-field>
    <v-text-field
      label="Password"
      :append-icon="displayPassword ? 'mdi-eye-off' : 'mdi-eye'"
      @click:append="displayPassword = !displayPassword"
      required
      v-model="password"
      :error-messages="showError('password')"
      :type="displayPassword ? 'text' : 'password'"
    ></v-text-field>
    <div class="d-flex align-center">
      <div>
        <router-link to="/login">Create an account</router-link>
      </div>
      <v-btn class="ml-auto" color="primary" type="submit">Sign Up</v-btn>
    </div>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";
import { createUser } from "@/lib/api/auth";

type Inputs = "username" | "email" | "fullName" | "password";

interface Error {
  message: string;
  context: {
    key: string;
  };
}

export default Vue.extend({
  data() {
    return {
      username: "",
      email: "",
      fullName: "",
      password: "",
      displayPassword: false,
      errors: [] as Error[],
    };
  },
  methods: {
    showError(input: Inputs) {
      let tempError = "";
      if (this.errors.length < 0) return "";
      for (const error of this.errors) {
        if (input === error?.context.key) {
          tempError = error?.message;
        }
      }
      return tempError;
    },
    async onSubmit() {
      const userInfo = {
        username: this.username,
        email: this.email,
        fullName: this.fullName,
        password: this.password,
      };
      try {
        const { accessToken } = await createUser(userInfo);
        localStorage.setItem("accessToken", accessToken);
        this.$router.push("/");
      } catch (error) {
        const { errors, message } = error.response.data;
        this.errors = [];
        if (errors?.length > 0) {
          this.errors = [...this.errors, ...errors];
        } else {
          console.log(error.response.data);
          const temp: Error = {
            message,
            context: {
              key: "email",
            },
          };
          console.log([temp]);
          this.errors = [temp];
        }
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/abstracts/screen-sizes";
.form {
  max-width: $md;
  width: 100%;
  margin: 0 auto;
}
</style>
