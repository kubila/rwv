<template>
  <div>
    <div class="event-card -shadow">
      <router-link
        class="event-link"
        :to="{ name: 'event-show', params: { id: $attrs.event.id } }"
      >
        <span class="eyebrow"
          >@{{ $attrs.event.time }} on {{ $attrs.event.date }} ></span
        >
        <h4 class="title">{{ $attrs.event.title }}</h4>
        <BaseIcon name="users"> attending</BaseIcon>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.event-card {
  padding: 20px;
  margin-bottom: 24px;
  transition: all 0.2s linear;
  cursor: pointer;
}
.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}
.event-card > .title {
  margin: 0;
}
.event-link {
  color: black;
  text-decoration: none;
  font-weight: 100;
}
</style>
