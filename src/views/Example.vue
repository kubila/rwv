<template>
  <form @submit.prevent="submit">
    <input
      type="email"
      placeholder="What's your email"
      v-model="email"
      :class="{ error: $v.email.error }"
      @blur="$v.email.$touch()"
    />
    <!-- touch() is a vuelidate func, which controls the input 'touched' or not by user, sets true-false -->
    <div v-if="$v.email.$error">
      <p v-if="!$v.email.email" class="errorMessage">
        Please provide a valid email
      </p>
      <p v-if="!$v.email.required" class="errorMessage">Emal is required</p>
    </div>

    <button :disabled="$v.$invalid" type="submit">Submit</button>
    <p v-if="$v.$anyError" class="errorMessage">
      Please fill out the required fields
    </p>
  </form>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
export default {
  data() {
    return {
      email: null
    };
  },
  validations: {
    email: {
      required,
      email //verifies using regex to have a valid email
    }
  },
  methods: {
    submit() {
      this.$v.$touch(); // this will set the dirty flag to true on every single field
      if (!this.$v.$invalid) {
        // if the form is not invalid
        console.log('Form Submitted:', this.email);
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
