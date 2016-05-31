import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),

  actions: {
    authenticate() {
      this.get('session').authenticate('authenticator:devise-token',
          this.get('email'), this.get('password')).catch((reason) => {
        this.set('errorMessages', reason.errors);
      });;
    }
  }
});
