import EventService from '@/services/EventService.js';

export const namespaced = true;
/*after this we need to change our actions. add event to every one of them, eg. event/fetchEvent */

export const state = {
  eventsTotal: 0,
  events: [],
  event: {},
  perPage: 3
};
export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event);
  },
  SET_EVENTS(state, events) {
    state.events = events;
  },
  SET_EVENT(state, event) {
    state.event = event;
  }
};
export const actions = {
  createEvent({ commit, dispatch }, event) {
    return EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event);
        const notification = {
          type: 'success',
          message: 'Your event has been created!'
        };
        dispatch('notification/add', notification, { root: true });
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem creating your event: ' + error.message
        };
        dispatch('notification/add', notification, { root: true });
        throw error;
      });
  },
  fetchEvents({ commit, dispatch, state }, { page }) {
    //take a look on vuex-mutations-actions5.png
    return EventService.getEvents(state.perPage, page)
      .then(response => {
        commit('SET_EVENTS', response.data);
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching events: ' + error.message
        };
        dispatch('notification/add', notification, { root: true });
      });
  },
  fetchEvent({ commit, getters }, id) {
    //if we got the event, don't make another api call again, instead find and use it
    var event = getters.getEventById(id);
    if (event) {
      commit('SET_EVENT', event);
      return event; //check router event-show and vue-progress-bar30.png
    } else {
      return EventService.getEvent(id).then(response => {
        commit('SET_EVENT', response.data);
        return response.data; //check router event-show and vue-progress-bar30.png
      });
    }
  }
};
export const getters = {
  catLength: state => {
    return state.categories.length;
  },
  doneTodos: state => {
    return state.todos.filter(todo => todo.done);
  },
  activeTodosCount: state => {
    //return state.todos.length - getters.doneTodos.length;//pass "getters" to function
    return state.todos.filter(todo => !todo.done).length;
  },
  getEventById: state => id => {
    return state.events.find(event => event.id === id);
  }
};
