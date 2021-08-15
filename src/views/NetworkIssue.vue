<template>
  <div>
    <h1>Uh-oh!</h1>
    <h3>
      It looks like you're experiencing some network issues, please go back and
      try again.
    </h3>
    <router-link :to="{ name: 'event-list' }"
      >Or go to the home page</router-link
    >
  </div>
</template>
