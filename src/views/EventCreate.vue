<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect
        label="Select a category"
        :options="categories"
        v-model="event.category"
        class="field"
        :class="{ error: $v.event.category.$error }"
        @blur="$v.event.category.$touch()"
      />
      <template v-if="$v.event.category.$error">
        <p v-if="!$v.event.category.required" class="errorMessage">
          Category is required
        </p>
      </template>

      <h3>Name & describe your event</h3>
      <BaseInput
        type="text"
        placeholder="Title"
        label="Title"
        v-model="event.title"
        class="field"
        :class="{ error: $v.event.time.$error }"
        @blur="$v.event.title.$touch()"
      />
      <template v-if="$v.event.title.$error">
        <p v-if="!$v.event.title.required" class="errorMessage">
          Title is required
        </p>
      </template>

      <BaseInput
        type="text"
        placeholder="Description"
        label="Description"
        v-model="event.description"
        class="field"
        :class="{ error: $v.event.description.$error }"
        @blur="$v.event.description.$touch()"
      />
      <template v-if="$v.event.description.$error">
        <p v-if="!$v.event.description.required" class="errorMessage">
          Description is required
        </p>
      </template>

      <h3>Where is your event?</h3>
      <BaseInput
        type="text"
        placeholder="Location"
        label="Location"
        v-model="event.location"
        class="field"
        :class="{ error: $v.event.location.$error }"
        @blur="$v.event.location.$touch()"
      />
      <template v-if="$v.event.location.$error">
        <p v-if="!$v.event.location.required" class="errorMessage">
          Location is required
        </p>
      </template>

      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker
          v-model="event.date"
          placeholder="Select a date"
          :input-class="{ error: $v.event.date.$error }"
          @opened="$v.event.date.$touch()"
        />
      </div>
      <template v-if="$v.event.date.$error">
        <p v-if="!$v.event.date.required" class="errorMessage">
          Date is required
        </p>
      </template>

      <BaseSelect
        label="Select a time"
        :options="times"
        v-model="event.time"
        class="field"
        :class="{ error: $v.event.time.$error }"
        @blur="$v.event.time.$touch()"
      />
      <template v-if="$v.event.time.$error">
        <p v-if="!$v.event.time.required" class="errorMessage">
          Time is required
        </p>
      </template>

      <!-- <input type="submit" class="button -fill-gradient" value="Submit" /> -->
      <BaseButton
        buttonClass="-fill-gradient"
        type="submit"
        :disabled="$v.$anyError"
        >Submit</BaseButton
      >
      <p v-if="$v.$anyError" class="errorMessage">
        Please fill out the required field(s).
      </p>
    </form>
  </div>
</template>

<script>
import DatePicker from 'vuejs-datepicker';
import NProgress from 'nprogress';
//import BaseInput from ''; //we don't need to register component here, because there is auto-loading
//import BaseSelect from ''; //we don't need to register component here, because there is auto-loading
import { required } from 'vuelidate/lib/validators';

export default {
  components: {
    datepicker: DatePicker
  },
  data() {
    const times = [];
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00');
    }
    return {
      times,
      categories: this.$store.state.categories,
      event: this.createFreshEventObject()
    };
  },
  validations: {
    //add these fields to validate them up in the form. template part is for the @blur event. it makes sure the user won't see any error when came to page, but when an error occurrs.
    event: {
      category: { required: required },
      title: { required: required },
      description: { required: required },
      location: { required: required },
      date: { required: required },
      time: { required: required }
    }
  },
  methods: {
    createEvent() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        NProgress.start();
        this.$store
          .dispatch('event/createEvent', this.event)
          .then(() => {
            this.$router.push({
              name: 'event-show',
              params: { id: this.event.id }
            });
            this.event = this.createFreshEventObject(); //clear event object with new one when dispatch is completed, make sure to do this after route push
          })
          .catch(() => {
            NProgress.done();
          }); //this line makes sure the form will not be submitted when empty
      }
    },
    createFreshEventObject() {
      const user = this.$store.state.user.user;
      const id = Math.floor(Math.random() * 10000000);

      return {
        id: id,
        user: user,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      };
    }
  }
};
/* we could use this too
export default {
  computed: mapState({
    userName: state => state.user.name,
    userID: state => state.user.id,
    categories: state => state.categories
  })
};
 that one also works
export default {
  computed: mapState({
    user: 'user',
    categories: 'categories'
  })
};
*/
</script>

<style lang="scss" scoped>
.field {
  margin-bottom: 24px;
}
</style>
