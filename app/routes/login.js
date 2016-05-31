import Ember from 'ember';
import UnauthenticatedRoute from 'transitions/routes/unauthenticated';

export default UnauthenticatedRoute.extend({
  actions: {
    loginSucceeded() {
      this.transitionTo('performances');
    }
  }
});
