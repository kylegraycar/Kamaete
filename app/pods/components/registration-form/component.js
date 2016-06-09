import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  flashMessages: Ember.inject.service(),

  actions: {
    register() {
      const flashMessages = Ember.get(this, 'flashMessages');
      flashMessages.clearMessages();

      this.get('session').createNewAccount(this.get('email'), this.get('password'),
          this.get('password-confirmation')).then((tokenData) => {
        this.get('session').authenticate('authenticator:devise-token', {
          type: 'registration',
          tokenData
        }).then(() => {
          flashMessages.success('Account creation successful; welcome to Kamaete!', {
            timeout: 5000
          });
          this.sendAction();
        });

      },

      (reason) => {
        reason.errors.full_messages.forEach((error) => {
          flashMessages.danger(error, {
            sticky: true
          });
        });
      });
    }
  }
});
