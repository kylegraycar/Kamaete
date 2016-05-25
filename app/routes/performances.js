import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    this.get('auth').manager.validateToken().fail(function() {
      this.transitionTo('login');
    }.bind(this));
  },

  model() {
    return this.store.findAll('performance');
  },

  actions: {
    error(_error, transition) {
      debugger;
      if (_error) {
        // Do something; logging maybe?
      }
    }
  }
});
