import Ember from 'ember';

export default Ember.Component.extend({
  loginFailed: false,

  actions: {
    attemptLogin() {
      var email = this.get('email');
      var password = this.get('password');

      this.get('auth').manager.emailSignIn({
        email: email,
        password: password

      }).then(function() {
        // Login successful
        this.set('loginFailed', false);
        this.sendAction();

      }.bind(this), function() {
        this.set('loginFailed', true);

      }.bind(this));
    }
  }
});
