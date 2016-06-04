import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  flashMessages: Ember.inject.service(),

  actions: {
    register() {
      const flashMessages = Ember.get(this, 'flashMessages');
      flashMessages.clearMessages();

      this.get('session').createNewAccount(this.get('email'), this.get('password'),
          this.get('password-confirmation')).then((response) => {
        this.sendAction('register', response.data);
      },

      (reason) => {
        reason.errors.full_messages.forEach((error) => {
          flashMessages.danger(error);
        });
      });
    }
  }
});
