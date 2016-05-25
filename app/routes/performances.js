import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('performance');
  },

  actions: {
    error(_error, transition) {
      debugger;
      if (_error) {
        return this.transitionTo('login');
      }
    }
  }
});
