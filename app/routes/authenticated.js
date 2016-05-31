// Routes that extend this class will check if a user is signed in upon page
// load, and redirect to the login page if not
import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    // debugger;
    this.get('auth').manager.validateToken().fail(() => {
      this.transitionTo('login');
    }.bind(this));
  }
});
