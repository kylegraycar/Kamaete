import Ember from 'ember';

export default Ember.Route.extend({
  user: this.get('auth').manager.user,

  actions: {
    logout() {
      this.transitionTo('login');
    }
  }
});
