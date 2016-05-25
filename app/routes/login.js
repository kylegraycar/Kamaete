import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    this.get('auth').manager.validateToken().then(function() {
      this.transitionTo('performances');
    }.bind(this));
  },

  actions: {
    loginSucceeded() {
      this.transitionTo('performances');
    }
  }
});
