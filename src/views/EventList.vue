<template>
  <div>
    <h1>Events for {{ user.user.name }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <template v-if="page != 1">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        style="padding-right: 5px;"
        >Previous Page</router-link
      >
    </template>

    <router-link
      :to="{ name: 'event-list', query: { page: page + 1 } }"
      rel="next"
      >Next Page</router-link
    >
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue';
import { mapState } from 'vuex';
import store from '@/store/index.js';

function getPageEvents(routeTo, next) {
  const currentPage = parseInt(routeTo.query.page) || 1; //we are calculating page that we need for paginate
  store
    .dispatch('event/fetchEvents', {
      page: currentPage
    })
    .then(() => {
      routeTo.params.page = currentPage;
      next();
    });
}

export default {
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  components: {
    EventCard
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next);
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next);
  },
  computed: {
    hasNextPage() {
      return this.event.eventsTotal > this.page * this.event.perPage;
    },
    ...mapState(['event', 'user']) //we get access to state by calling mapState helper, printing out each item in this array via EventCard, here, not in EventCard.
  }
};
/* deleted due to third pagination method, that was second
created() {
    this.$store.dispatch('event/fetchEvents', {
      perPage: 3,
      page: this.page
    }); //we call our action
  },
*/
</script>
