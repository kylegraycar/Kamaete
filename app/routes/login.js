import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    loginSucceeded() {
      this.transitionTo('performances');
    }
  }
});
