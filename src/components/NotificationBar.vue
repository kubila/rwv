<template>
  <div class="notification-bar" :class="notificationTypeClass">
    <p>{{ notification.message }}</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      timeout: null,
    };
  },
  mounted() {
    this.timeout = setTimeout(() => this.remove(this.notification), 5000);
  },
  beforeDestroy() {
    clearTimeout(this.timeout); //we are unsetting the timeout before destroy, avoid memory leaks
  },
  computed: {
    notificationTypeClass() {
      return `-text-${this.notification.type}`; //this for the type of notification, success or error
    },
  },
  methods: mapActions('notification', ['remove']),
};
</script>

<style scoped>
.notification-bar {
  margin: 1em 0 1em;
}
</style>
