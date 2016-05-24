import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('performance');
  },

  actions: {
    error(error, transition) {
      if (error) {
        return this.transitionTo('login');
      }
    }
  }
});
