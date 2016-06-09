import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  flashMessages: Ember.inject.service(),

  actions: {
    authenticate() {
      const flashMessages = Ember.get(this, 'flashMessages');
      flashMessages.clearMessages();

      this.get('session').authenticate('authenticator:devise-token', {
        type: 'login',
        email: this.get('email'),
        password: this.get('password')
      }).then(() => {
        let identifier = this.get('session').currentUser.identifier;

        flashMessages.success(`Login successful - welcome back, ${identifier}!`, {
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
