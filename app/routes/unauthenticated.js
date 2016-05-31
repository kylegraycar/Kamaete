// Routes that extend this class will check if a user is signed in upon page
// load, and redirect away from the page if so
import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    this.get('auth').manager.validateToken().then(() => {
      this.transitionTo('performances');
    }.bind(this));
  }
});
