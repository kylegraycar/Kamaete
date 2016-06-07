import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    viewPerformance(performance) {
      // TODO: transition to show route for performance
      this.transitionTo('performances');
    }
  }
});
