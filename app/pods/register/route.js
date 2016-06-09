import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    register() {
      this.transitionTo('performances');
    }
  }
});
