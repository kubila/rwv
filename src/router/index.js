/* eslint-disable no-unused-vars */
import Vue from 'vue';
import VueRouter from 'vue-router';
import EventCreate from '../views/EventCreate.vue';
import EventList from '../views/EventList.vue';
import EventShow from '../views/EventShow.vue';
//import EventCard from '@/components/EventCard.vue';
import NProgress from 'nprogress';
import store from '@/store/index.js';
import NotFound from '@/views/NotFound.vue';
import NetworkIssue from '@/views/NetworkIssue.vue';
import Example from '@/views/Example.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventList,
      props: true //to send params in as props
    },
    {
      path: '/example',
      component: Example
    },
    {
      path: '/event/:id',
      name: 'event-show',
      component: EventShow,
      props: true,
      beforeEnter: (routeTo, routeFrom, next) => {
        store
          .dispatch('event/fetchEvent', routeTo.params.id)
          .then(event => {
            routeTo.params.event = event; /*we are passing the event to be showed by event-show via route! make sure fetchEvent returns three times. you should see vue-progress-bar30.png for more. check!*/
            next(); /*we have to make sure that our fetchEvent returns. when event is fetched, done progress bar, continue navigation by next(), this runs after the global beforeEach guard*/
          })
          .catch(error => {
            if (error.response && error.response.status == 404) {
              next({ name: '404', params: { resource: 'event' } });
            } else {
              next({ name: 'network-issue' });
            }
          }); /*we deleted the catch from event.js fetchEvent, instead give it here to catch and redirect errors, e.g. trying to get not existed event. Add props:true to 404 route, and params: {resource:'page'} to the * route. Last thing to do is adding props to NotFound.vue */
        /* In case of network errors, we are passing error to the catch and checking the error type, if it's 404 redirect with next() to the 404 route. if not redirect to the network-issue route. after this add timeout:10000 to the eventservice.js apiClient, this will wait for 10 seconds, and if there is no response then redirect to the network-issue route. */
      }
    },
    {
      path: '/event/create',
      name: 'event-create',
      component: EventCreate
    },
    {
      path: '/404',
      name: '404',
      component: NotFound,
      props: true
    },
    {
      path: '*',
      redirect: { name: '404', params: { resource: 'page' } }
    },
    {
      path: '/network-issue',
      name: 'network-issue',
      component: NetworkIssue
    }
  ]
});

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start();
  next();
});

router.afterEach((routeTo, routeFrom) => {
  NProgress.done();
});

export default router;

/*
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about-us',
    name: 'about',
    alias: '/about', //instead of defining second about part, we could use alias to redirect about routes
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(// webpackChunkName: "about" // '../views/About.vue')
  },
  {
    path: '/about',
    redirect: { name: 'about' } //we could use path-> "/about-us" here, preference
  },
  {
    path: '/event',
    name: 'event-card',
    component: EventCard,
    props: true
  },
  {
    path: '/event/:id',
    name: 'event-card',
    component: EventCard,
    props: true
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
*/
