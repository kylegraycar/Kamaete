import Ember from 'ember';
import DS from 'ember-data';
import Session from 'ember-simple-auth/services/session';

export default Session.extend({

  store: Ember.inject.service(),

  currentUser: {},

  createNewAccount(email, password, passwordConfirmation) {
  }

});
