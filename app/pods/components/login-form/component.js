import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  flashMessages: Ember.inject.service(),

  actions: {
    authenticate() {
      const flashMessages = Ember.get(this, 'flashMessages');
      flashMessages.clearMessages();

      this.get('session').authenticate('authenticator:devise-token',
          this.get('email'), this.get('password')).then(() => {
        flashMessages.success('Login successful; welcome back!', {
          timeout: 10000
        });
      },

      (reason) => {
        reason.errors.forEach((error) => {
          flashMessages.danger(error, {
            sticky: true
          });
        });
      });
    }
  }
});
