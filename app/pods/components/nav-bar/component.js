import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'nav',
  session: Ember.inject.service('session'),
  flashMessages: Ember.inject.service(),

  actions: {
    authenticate() {
      const flashMessages = Ember.get(this, 'flashMessages');
      flashMessages.clearMessages();

      this.get('session').authenticate('authenticator:devise-token',
          this.get('navbar-email'), this.get('navbar-password')).then(() => {
        flashMessages.success('Login successful; welcome back!', {
          timeout: 10000
        });
      },

      (reason) => {
        reason.errors.forEach((error) => {
          flashMessages.danger(error, {
            sticky: true
          });
          this.sendAction('loginFailed');
        });
      });
    },

    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
