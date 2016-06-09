import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'nav',
  session: Ember.inject.service('session'),
  flashMessages: Ember.inject.service(),

  actions: {
    authenticate() {
      const flashMessages = Ember.get(this, 'flashMessages');
      flashMessages.clearMessages();

      this.get('session').authenticate('authenticator:devise-token', {
        type: 'login',
        email: this.get('navbar-email'),
        password: this.get('navbar-password')
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

          // Send user to login page, where they can reset password if needed
          this.sendAction('loginFailed');
        });
      });
    },

    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
