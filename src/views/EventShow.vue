<template>
  <div>
    <div>
      <div class="event-header">
        <span class="eyebrow">@{{ event.time }} on {{ event.date }}</span>
        <h1 class="title">{{ event.title }}</h1>
        <h5>Organized by {{ event.organizer ? event.organizer.name : '' }}</h5>
        <h5>Category: {{ event.category }}</h5>
      </div>

      <BaseIcon name="map">
        <h2>Location</h2>
      </BaseIcon>
      <address>{{ event.location }}</address>

      <h2>Event details</h2>
      <p>{{ event.description }}</p>

      <h2>
        Attendees
        <span class="badge -fill-gradient">
          {{ event.attendees ? event.attendees : '' }}</span
        >
      </h2>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    event: {
      type: Object,
      required: true
    }
  }
};
/* //this works too, without mapAction
export default {
  props: ['id'],

  created() {
    this.$store.dispatch('event/fetchEvent', this.id);
  },
  computed: mapState({
    event: state => state.event.event //this event.event is because of using module system in store.js
  })
};
*/
</script>
<style scoped>
.location {
  margin-bottom: 0;
}
.location > .icon {
  margin-left: 10px;
}
.event-header > .title {
  margin: 0;
}
.list-group {
  margin: 0;
  padding: 0;
  list-style: none;
}
.list-group > .list-item {
  padding: 1em 0;
  border-bottom: solid 1px #e5e5e5;
}
</style>
