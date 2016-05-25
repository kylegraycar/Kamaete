import Ember from 'ember';

export default Ember.Controller.extend({
  loginFailed: false,
  actions: {
    login() {
      this.get('auth').manager.emailSignIn({
        email: this.get('email'),
        password: this.get('password')

      }).then(function() {
        // Login successful
        // Not too sure if this is the proper Ember way to do this
        this.transitionToRoute('performances');

      }.bind(this)).fail(function() {
        this.set('loginFailed', true);

      }.bind(this));
    }
  }
});
